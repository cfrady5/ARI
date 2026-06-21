// Public contact-form handler for theari.us.
// Saves every submission to public.contact_messages (primary, never lost) and
// best-effort emails it via Resend. Returns 200 if the message was captured.
//
// Deployed to the Supabase project (function name: send-contact, verify_jwt: false).
// Configure these Edge Function secrets in the Supabase dashboard to enable email:
//   RESEND_API_KEY   – your Resend API key (required to send email)
//   CONTACT_TO       – recipient (defaults to Caleb.frady@theari.us)
//   CONTACT_FROM     – verified sender, e.g. "ARI Website <contact@theari.us>"
//                      (defaults to "ARI Website <onboarding@resend.dev>")
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }

  // Honeypot: bots fill this hidden field. Pretend success, save nothing.
  if ((body.company_website || "").toString().trim()) return json({ ok: true });

  const str = (k: string) => (body[k] == null ? "" : String(body[k])).trim();
  const name = str("name");
  const email = str("email");
  const message = str("message");
  const organization = str("organization");
  const role = str("role");
  const inquiry = str("inquiry");

  if (!name || !email || !message) return json({ error: "Please fill in your name, email, and message." }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Please enter a valid email address." }, 400);
  if (message.length > 8000) return json({ error: "Message is too long." }, 400);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // 1) Persist to the database (primary path).
  let saved = false;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name, email,
        organization: organization || null,
        role: role || null,
        inquiry: inquiry || null,
        message,
      }),
    });
    saved = r.ok;
    if (!r.ok) console.error("DB insert failed", r.status, await r.text());
  } catch (e) { console.error("DB insert error", e); }

  // 2) Email via Resend (best-effort; only if a key is configured).
  let emailed = false;
  const RESEND = Deno.env.get("RESEND_API_KEY");
  const TO = Deno.env.get("CONTACT_TO") || "Caleb.frady@theari.us";
  const FROM = Deno.env.get("CONTACT_FROM") || "ARI Website <onboarding@resend.dev>";
  if (RESEND) {
    try {
      const rows = [
        ["Name", name],
        ["Email", email],
        ["Organization", organization],
        ["Role", role],
        ["Inquiry type", inquiry],
      ].filter(([, v]) => v);
      const html = `<h2 style="font-family:sans-serif">New contact form submission</h2>` +
        rows.map(([k, v]) => `<p style="font-family:sans-serif;margin:4px 0"><strong>${k}:</strong> ${esc(v)}</p>`).join("") +
        `<p style="font-family:sans-serif;margin:12px 0 4px"><strong>Message:</strong></p>` +
        `<p style="font-family:sans-serif;white-space:pre-line">${esc(message)}</p>`;
      const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}`;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          reply_to: email,
          subject: `ARI contact: ${name}${inquiry ? " — " + inquiry : ""}`,
          html,
          text,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend failed", r.status, await r.text());
    } catch (e) { console.error("Resend error", e); }
  }

  if (!saved && !emailed) {
    return json({ error: "We couldn't send your message right now. Please email us directly." }, 502);
  }
  return json({ ok: true, saved, emailed });
});
