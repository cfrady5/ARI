import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/components/visual/Icon";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  icon?: IconName;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

function classes(variant: Variant, className: string) {
  const variantClass =
    variant === "primary" ? "btn-primary" : "btn-secondary";
  return `btn ${variantClass} ${className}`.trim();
}

/**
 * Primary/secondary brand button. Renders an internal/external link when
 * `href` is provided, otherwise a native button. External links open safely.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", children, icon, className = "" } = props;
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} size={18} /> : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, variant: _v, children: _c, icon: _i, className: _cn, ...rest } =
      props;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes(variant, className)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes(variant, className)} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, children: _c, icon: _i, className: _cn, href: _h, ...rest } =
    props;
  return (
    <button className={classes(variant, className)} {...rest}>
      {content}
    </button>
  );
}

export default Button;
