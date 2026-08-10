import { MultiServiceLanding } from "@/components/MultiServiceLanding";
import { ProductStructuredData } from "@/components/ProductStructuredData";
import { createPageMetadata, productSeoByService } from "@/lib/seo";

export const metadata = createPageMetadata(productSeoByService["punch-card"]);

export default function Home() {
  return (
    <>
      <ProductStructuredData serviceId="punch-card" />
      <MultiServiceLanding key="punch-card" initialService="punch-card" />
    </>
  );
}
