import getImages from "@/lib/getImages";
import productService from "@/services/produit.service";
import { headers } from "next/headers";

export async function grtMetadataProduct(slug: string) {
  const product = await productService.getOneProductServer(slug);
  const headersList = await headers();
  const domain = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const fullUrl = `${protocol}://${domain}/product/${slug}`;
  const priceCurrency = "DZD";
  return {
    metadataBase: new URL(`${protocol}://${domain}`),
    title: product.name,
    description: product.description || "Check out this product!",
    openGraph: {
      title: product.name,
      description: product.description || "Check out this product!",
      url: fullUrl,
      images: product.images.map((x) => {
        return {
          url: getImages(x), // Must be absolute URL
          width: 800,
          height: 600,
          alt: product.name,
        };
      }),
      type: "website", // Facebook doesn't officially support "product" type
    },
    // Additional meta tags for better compatibility
    twitter: {
      card: "product",
      title: product.name,
      description: product.description || "Check out this product!",
      images: product.images.map((x) => getImages(x)),
    },
    other: {
      "og:type": "website", // Explicitly set to avoid errors
      "product:price:amount": product.price.toFixed(2),
      "product:price:currency": priceCurrency,
      "product:availability": product.stock != 0 ? "in stock" : "out of stock",
      "product:retailer_item_id": product.id, // Optional: Helps with tracking
    },
  };
}
