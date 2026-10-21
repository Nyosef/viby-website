import { siteConfig } from "@/lib/site";
import { PhoneIcon } from "./PhoneIcon";

type PhoneCallLinkProps = {
  className: string;
  analyticsLocation: string;
  iconOnly?: boolean;
};

export function PhoneCallLink({ className, analyticsLocation, iconOnly = false }: PhoneCallLinkProps) {
  return (
    <a
      className={className}
      href={`tel:+${siteConfig.whatsappNumber}`}
      data-analytics-location={analyticsLocation}
      aria-label={`התקשרו ל־Viby במספר ${siteConfig.whatsappDisplay}`}
    >
      <span className="phone-call-icon"><span className="phone-call-glyph"><PhoneIcon /></span></span>
      {!iconOnly ? <bdi dir="ltr">{siteConfig.whatsappDisplay}</bdi> : null}
    </a>
  );
}
