import type { Metadata } from "next";
import SimplePage from "@/components/layout/SimplePage";
import { pageMetadata } from "@/lib/seo";
import { CONTACTS } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms governing use of the Applied Research Institute (ARI) website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SimplePage eyebrow="Legal" title="Terms of Use" lastUpdated="June 2026">
      <p>
        <strong>Template notice:</strong> This page provides a structure for
        ARI&rsquo;s terms of use. Replace the sections below with finalized
        language reviewed by ARI&rsquo;s legal counsel before publication.
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing this website, you agree to these terms. If you do not
        agree, please discontinue use of the site.
      </p>

      <h2>Use of the Site</h2>
      <ul>
        <li>Use the site only for lawful purposes.</li>
        <li>Do not attempt to disrupt or compromise site security.</li>
        <li>Do not misrepresent your affiliation with any person or entity.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        Content on this site, including text, graphics, and logos, is the
        property of ARI or its licensors and is protected by applicable law.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties of any kind.
        ARI is not liable for any damages arising from use of the site.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be directed to{" "}
        <a href={`mailto:${CONTACTS.general.email}`}>
          {CONTACTS.general.email}
        </a>
        .
      </p>
    </SimplePage>
  );
}
