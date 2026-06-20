// Shared Supabase client for the public site + employee portal.
// The publishable key is safe to expose: all writes are protected by
// Row Level Security (only allow-listed employees can create/edit/delete).
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const SUPABASE_URL = "https://xpelcuegqtpvojnjetkt.supabase.co";
export const SUPABASE_KEY = "sb_publishable_ikPGzv-l0gnyKIrPSYnkjA_74v54gC3";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Format an event date range like "October 14–15, 2026" or "August 20, 2026".
export function formatEventDate(start, end) {
  if (!start) return "";
  const s = new Date(start + "T00:00:00");
  const full = { month: "long", day: "numeric", year: "numeric" };
  if (!end || end === start) return s.toLocaleDateString("en-US", full);
  const e = new Date(end + "T00:00:00");
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return (
      s.toLocaleDateString("en-US", { month: "long", day: "numeric" }) +
      "–" + e.getDate() + ", " + e.getFullYear()
    );
  }
  return s.toLocaleDateString("en-US", full) + " – " + e.toLocaleDateString("en-US", full);
}
