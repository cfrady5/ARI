"use client";

import { useState, type FormEvent } from "react";
import Container from "@/components/layout/Container";
import { FormField } from "@/components/interactive/FormField";
import { IconBadge } from "@/components/visual/IconBadge";
import { GradientOrb } from "@/components/visual/Decor";
import { Icon } from "@/components/visual/Icon";
import { METRICS } from "@/data/metrics";

const PROOF = METRICS.slice(0, 3);

/**
 * Newsletter signup pattern: left headline + copy + form, right proof points.
 * Black-background form/stat-card style. Replace handler with a list service.
 */
export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section">
      <Container>
        <div className="surface relative overflow-hidden p-6 sm:p-10">
          <GradientOrb className="absolute -right-20 -top-20 h-72 w-72" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: copy + form */}
            <div>
              <p className="eyebrow">ARI Updates</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                Don&rsquo;t miss a beat<span className="accent">.</span>
              </h2>
              <p className="mt-4 max-w-md text-ari-muted">
                Sign up for ARI updates, insights, events, and opportunities
                across the innovation ecosystem.
              </p>

              {submitted ? (
                <div
                  role="status"
                  className="mt-6 flex items-center gap-3 rounded-2xl border border-[var(--border-green)] bg-[rgba(59,174,72,0.08)] p-4"
                >
                  <span className="text-ari-green">
                    <Icon name="check" size={22} />
                  </span>
                  <p className="text-sm text-ari-white">
                    You&rsquo;re subscribed. Thank you for joining the ARI
                    network.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      id="nl-name"
                      name="name"
                      label="Name"
                      required
                      autoComplete="name"
                    />
                    <FormField
                      id="nl-email"
                      name="email"
                      type="email"
                      label="Email"
                      required
                      autoComplete="email"
                    />
                    <FormField
                      id="nl-org"
                      name="organization"
                      label="Organization"
                      autoComplete="organization"
                    />
                    <FormField
                      id="nl-zip"
                      name="zip"
                      label="ZIP Code"
                      autoComplete="postal-code"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-5 w-full sm:w-auto"
                  >
                    Sign Up
                    <Icon name="arrow-right" size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Right: proof points */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {PROOF.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[rgba(0,0,0,0.25)] p-4"
                >
                  <IconBadge name={metric.icon} size="sm" />
                  <div>
                    <p className="stat-figure text-2xl">{metric.value}</p>
                    <p className="text-sm text-ari-muted">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NewsletterSignup;
