import type { Metadata } from "next";
import SimplePage from "@/components/layout/SimplePage";
import { pageMetadata } from "@/lib/seo";
import { CONTACTS } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How the Applied Research Institute (ARI) collects, uses, and protects information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SimplePage eyebrow="Legal" title="Privacy Policy" lastUpdated="June 2026">
      <p>
        <strong>Template notice:</strong> This page provides a structure for
        ARI&rsquo;s privacy policy. Replace the sections below with finalized
        language reviewed by ARI&rsquo;s legal counsel before publication.
      </p>

      <h2>Information We Collect</h2>
      <p>
        ARI collects information you provide directly — such as your name, email
        address, organization, and any message content — when you contact us,
        register for events, or subscribe to updates.
      </p>

      <h2>How We Use Information</h2>
      <ul>
        <li>To respond to inquiries and partnership requests.</li>
        <li>To send updates, insights, events, and opportunities you request.</li>
        <li>To improve our website and programs.</li>
      </ul>

      <h2>Sharing of Information</h2>
      <p>
        ARI does not sell personal information. We may share information with
        service providers who support our operations, or as required by law.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may opt out of communications at any time. To request access to or
        deletion of your information, contact us using the details below.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be directed to{" "}
        <a href={`mailto:${CONTACTS.general.email}`}>
          {CONTACTS.general.email}
        </a>
        .
      </p>
    </SimplePage>
  );
}
