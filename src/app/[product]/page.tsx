import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MultiServiceLanding } from "@/components/MultiServiceLanding";
import { ProductStructuredData } from "@/components/ProductStructuredData";
import {
  createPageMetadata,
  productSeoByPath,
  productSeoEntries,
} from "@/lib/seo";

type ProductPageProps = { params: Promise<{ product: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return productSeoEntries
    .filter((entry) => entry.path !== "/")
    .map((entry) => ({ product: entry.path.slice(1) }));
}

function getProductSeo(product: string) {
  return productSeoByPath.get(`/${product}`);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { product } = await params;
  const seo = getProductSeo(product);
  if (!seo) return {};
  return createPageMetadata(seo);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const seo = getProductSeo(product);
  if (!seo || seo.path === "/") notFound();

  return (
    <>
      <ProductStructuredData serviceId={seo.serviceId} />
      <MultiServiceLanding key={seo.serviceId} initialService={seo.serviceId} />
    </>
  );
}
