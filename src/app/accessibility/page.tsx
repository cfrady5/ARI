import type { Metadata } from "next";
import SimplePage from "@/components/layout/SimplePage";
import { pageMetadata } from "@/lib/seo";
import { CONTACTS } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description:
    "The Applied Research Institute (ARI) is committed to making its website accessible to all users.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <SimplePage eyebrow="Legal" title="Accessibility" lastUpdated="June 2026">
      <p>
        ARI is committed to ensuring digital accessibility for people of all
        abilities. We aim to conform to the Web Content Accessibility Guidelines
        (WCAG) 2.1 Level AA and continually work to improve the experience for
        every visitor.
      </p>

      <h2>Our Approach</h2>
      <ul>
        <li>Semantic HTML and a logical heading structure.</li>
        <li>Keyboard-operable navigation and visible focus states.</li>
        <li>Strong color contrast against the dark interface.</li>
        <li>Descriptive link text and image alternatives.</li>
        <li>Support for reduced-motion preferences.</li>
      </ul>

      <h2>Ongoing Effort</h2>
      <p>
        Accessibility is an ongoing commitment. We welcome feedback on areas
        where we can improve.
      </p>

      <h2>Contact</h2>
      <p>
        If you encounter an accessibility barrier, please let us know at{" "}
        <a href={`mailto:${CONTACTS.general.email}`}>
          {CONTACTS.general.email}
        </a>{" "}
        so we can address it.
      </p>
    </SimplePage>
  );
}
