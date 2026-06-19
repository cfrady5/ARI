import { Icon, type IconName } from "@/components/visual/Icon";
import { NetworkPattern } from "@/components/visual/Decor";

type ThumbnailProps = {
  image?: string;
  alt: string;
  icon?: IconName;
  label?: string;
  className?: string;
  /** Aspect ratio utility classes, e.g. "aspect-[16/9]". */
  aspect?: string;
};

/**
 * Media frame for cards. Renders the supplied image, or a branded gradient
 * placeholder (with optional icon/label) when no image is available — so the
 * UI never shows a broken image.
 */
export function Thumbnail({
  image,
  alt,
  icon = "atom",
  label,
  className = "",
  aspect = "aspect-[16/9]",
}: ThumbnailProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--border-green)] ${aspect} ${className}`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(31,54,85,0.65), rgba(5,8,7,0.95))",
          }}
          role="img"
          aria-label={alt}
        >
          <NetworkPattern className="absolute inset-0 h-full w-full opacity-40" />
          <div className="relative flex flex-col items-center gap-2 text-ari-green">
            <Icon name={icon} size={34} />
            {label ? (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ari-muted">
                {label}
              </span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Thumbnail;
