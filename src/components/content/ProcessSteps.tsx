import type { ProcessStep } from "@/data/approach";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

/**
 * Numbered horizontal process band ("From mission need to measurable impact").
 * Stacks to a single column on small screens.
 */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step) => (
        <li key={step.step} className="card flex h-full flex-col">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-green)] bg-[rgba(59,174,72,0.08)] text-lg font-extrabold text-ari-green">
            {step.step}
          </span>
          <h3 className="mt-4 text-base font-bold text-ari-white">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ari-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default ProcessSteps;
