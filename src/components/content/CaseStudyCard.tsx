import Link from "next/link";
import { Icon } from "@/components/visual/Icon";
import type { CaseStudy } from "@/data/impact";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

/** Impact case study card: initiative, outcome, related metric, CTA. */
export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="card card-interactive group relative flex h-full flex-col">
      <span className="tag self-start">{caseStudy.initiative}</span>
      <h3 className="mt-4 text-xl font-bold text-ari-white">
        <Link href={caseStudy.href} className="after:absolute after:inset-0">
          {caseStudy.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ari-muted">
        {caseStudy.outcome}
      </p>

      <div className="mt-5 flex items-center gap-2 border-t border-[var(--border-soft)] pt-4">
        <Icon name="trending" size={18} className="text-ari-green" />
        <span className="text-sm font-semibold text-ari-green">
          {caseStudy.metric}
        </span>
      </div>

      <span className="link-arrow mt-4">
        Read Case Study
        <Icon name="arrow-right" size={15} />
      </span>
    </article>
  );
}

export default CaseStudyCard;
