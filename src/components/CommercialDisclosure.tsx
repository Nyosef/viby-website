import Link from "next/link";
import { commercialTerms, subscriptionPriceNotice } from "@/lib/commercial";
import type { ServiceId } from "@/lib/services";

export function CommercialDisclosure({ service, compact = false }: { service: ServiceId; compact?: boolean }) {
  return (
    <p className="commercial-disclosure">
      {commercialTerms.commitment}{" "}
      {!compact ? <>{subscriptionPriceNotice(service)} {commercialTerms.vatNotice}{" "}</> : null}
      {commercialTerms.delivery}{" "}
      <Link href="/terms#terms-8">לתנאי ההצטרפות והביטול</Link>
    </p>
  );
}
