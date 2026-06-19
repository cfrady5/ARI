import { IconBadge } from "@/components/visual/IconBadge";
import { Icon, type IconName } from "@/components/visual/Icon";

type ContactCardProps = {
  title: string;
  description: string;
  email: string;
  name?: string;
  icon?: IconName;
};

/** Contact channel card with description and a mailto action. */
export function ContactCard({
  title,
  description,
  email,
  name,
  icon = "mail",
}: ContactCardProps) {
  return (
    <article className="card card-interactive flex h-full flex-col">
      <IconBadge name={icon} />
      <h3 className="mt-5 text-lg font-bold text-ari-white">{title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ari-muted">
        {description}
      </p>
      {name ? (
        <p className="mt-4 text-sm font-medium text-ari-white">{name}</p>
      ) : null}
      <a
        href={`mailto:${email}`}
        className="link-arrow mt-3 break-all"
      >
        <Icon name="arrow-right" size={15} />
        {email}
      </a>
    </article>
  );
}

export default ContactCard;
