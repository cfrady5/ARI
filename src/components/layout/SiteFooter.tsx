import Link from "next/link";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import { Icon } from "@/components/visual/Icon";
import {
  SITE,
  CONTACTS,
  SOCIAL_LINKS,
  LEGAL_LINKS,
} from "@/data/site";
import { FOOTER_QUICK_LINKS } from "@/data/navigation";
import { INITIATIVES } from "@/data/initiatives";

const FOOTER_INITIATIVES = INITIATIVES.slice(0, 6);

/** Premium, structured footer used site-wide. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-[var(--border-soft)] bg-[var(--color-ari-deep-black)]">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Identity + mission */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ari-muted">
              {SITE.footerDescription}
            </p>
            <p className="mt-5 max-w-sm border-l-2 border-ari-green pl-4 text-sm italic text-ari-muted">
              {SITE.mission}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ari-white">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ari-muted transition-colors hover:text-ari-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Initiatives */}
          <nav aria-label="Initiatives">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ari-white">
              Initiatives
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_INITIATIVES.map((initiative) => (
                <li key={initiative.slug}>
                  <Link
                    href={initiative.href}
                    className="text-sm text-ari-muted transition-colors hover:text-ari-green"
                  >
                    {initiative.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/initiatives"
                  className="link-arrow mt-1 text-sm"
                >
                  All initiatives
                  <Icon name="arrow-right" size={15} />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact + social */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ari-white">
              Connect
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACTS.general.email}`}
                  className="text-sm text-ari-muted transition-colors hover:text-ari-green"
                >
                  {CONTACTS.general.email}
                </a>
              </li>
              <li className="text-sm text-ari-muted">
                Media:{" "}
                <a
                  href={`mailto:${CONTACTS.media.email}`}
                  className="text-ari-green transition-colors hover:underline"
                >
                  {CONTACTS.media.email}
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ARI on ${social.label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] text-ari-muted transition-colors hover:border-ari-green hover:text-ari-green"
                  >
                    <Icon
                      name={social.label === "LinkedIn" ? "linkedin" : "external"}
                      size={18}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="divider-green my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-sm text-ari-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-ari-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
