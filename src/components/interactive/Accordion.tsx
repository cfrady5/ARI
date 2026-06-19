import { Icon } from "@/components/visual/Icon";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

/**
 * Accessible accordion built on native <details>/<summary> — fully keyboard
 * operable and functional without JavaScript.
 */
export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group card overflow-hidden p-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ari-white [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="text-ari-green transition-transform duration-200 group-open:rotate-45">
              <Icon name="plus" size={20} />
            </span>
          </summary>
          <div className="px-6 pb-5 text-sm leading-relaxed text-ari-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default Accordion;
