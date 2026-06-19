"use client";

import { useState } from "react";
import FilterBar from "@/components/interactive/FilterBar";
import InitiativeCard from "@/components/content/InitiativeCard";
import {
  INITIATIVES,
  INITIATIVE_CATEGORIES,
  type InitiativeCategory,
} from "@/data/initiatives";

/** Initiatives directory grid with category filtering. */
export function InitiativeFilter() {
  const [active, setActive] = useState<InitiativeCategory>("All");

  const visible =
    active === "All"
      ? INITIATIVES
      : INITIATIVES.filter((initiative) => initiative.category === active);

  return (
    <div>
      <FilterBar
        options={INITIATIVE_CATEGORIES}
        active={active}
        onChange={(value) => setActive(value as InitiativeCategory)}
        label="Filter initiatives by category"
      />

      <p className="mt-4 text-sm text-ari-subtle" aria-live="polite">
        Showing {visible.length}{" "}
        {visible.length === 1 ? "initiative" : "initiatives"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((initiative) => (
          <InitiativeCard key={initiative.slug} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}

export default InitiativeFilter;
