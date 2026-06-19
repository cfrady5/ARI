type QuoteBlockProps = {
  quote: string;
  attribution?: string;
};

/** Editorial pull-quote with a green accent rule. */
export function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <figure className="surface relative px-6 py-8 sm:px-10 sm:py-10">
      <span
        aria-hidden="true"
        className="absolute left-6 top-4 text-6xl font-extrabold leading-none text-ari-green/30 sm:left-10"
      >
        &ldquo;
      </span>
      <blockquote className="relative">
        <p className="text-balance text-xl font-semibold leading-snug text-ari-white sm:text-2xl">
          {quote}
        </p>
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-sm font-medium text-ari-green">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default QuoteBlock;
