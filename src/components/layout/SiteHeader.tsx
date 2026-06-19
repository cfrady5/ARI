"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/visual/Icon";
import { MAIN_NAV } from "@/data/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sticky, translucent, blurred header with active-page indicators and an
 * accessible mobile menu (Escape to close, closes on navigation, scroll lock).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape to close + lock body scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-soft)]"
      style={{
        background: "rgba(3,6,5,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 xl:flex"
        >
          {MAIN_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-ari-white"
                    : "text-ari-muted hover:text-ari-white"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ari-green"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center xl:flex">
          <Button href="/contact" className="px-5 py-2.5 text-sm">
            Partner With ARI
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-[var(--border-soft)] p-2 text-ari-white xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </Container>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-menu"
          className="xl:hidden"
          style={{
            background: "rgba(3,6,5,0.97)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          <Container className="border-t border-[var(--border-soft)] py-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {MAIN_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium ${
                      active
                        ? "bg-[rgba(59,174,72,0.1)] text-ari-white"
                        : "text-ari-muted"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span className="h-2 w-2 rounded-full bg-ari-green" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4">
              <Button href="/contact" className="w-full">
                Partner With ARI
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

export default SiteHeader;
