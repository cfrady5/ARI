import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Centered max-width content shell with responsive horizontal padding. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={`container-shell ${className}`}>{children}</Tag>;
}

export default Container;
