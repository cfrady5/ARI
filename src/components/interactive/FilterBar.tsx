"use client";

type FilterBarProps = {
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
};

/**
 * Controlled filter pill group. Uses real <button> elements with
 * aria-pressed for accessibility and keyboard support. When JavaScript is
 * unavailable the surrounding grids still render every item, so content is
 * never hidden behind the filter.
 */
export function FilterBar({ options, active, onChange, label }: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="filter-pill"
          aria-pressed={active === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
