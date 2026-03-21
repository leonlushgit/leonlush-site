import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop | Leon Lush",
  description: "Official Leon Lush merch — brainworms apparel",
};

const products = [
  {
    name: "Electric Wormaloo T-Shirt",
    price: "$29.95",
    image:
      "https://www.bunkerbranding.com/cdn/shop/files/LeonLush-DesignOne.jpg?v=1684260100",
    href: "https://www.bunkerbranding.com/products/electric-wormaloo-t-shirt",
  },
  {
    name: "The Album Cover T-Shirt",
    price: "$29.95",
    image:
      "https://www.bunkerbranding.com/cdn/shop/files/LeonLush-DesignThree2.jpg?v=1684262103",
    href: "https://www.bunkerbranding.com/products/the-album-cover-t-shirt",
  },
  {
    name: "The Wave T-Shirt",
    price: "$29.95",
    image:
      "https://www.bunkerbranding.com/cdn/shop/files/LeonLush-Design2S.jpg?v=1684261665",
    href: "https://www.bunkerbranding.com/products/the-wave-t-shirt",
  },
  {
    name: "The Classic T-Shirt",
    price: "$29.95",
    image:
      "https://cdn.shopify.com/s/files/1/2788/8404/products/sBrainwormsT-ShirtFront.jpg?v=1660577837",
    href: "https://www.bunkerbranding.com/products/leon-lush-brain-worms-t-shirt",
  },
  {
    name: "The Classic Hoodie",
    price: "$54.99",
    image:
      "https://cdn.shopify.com/s/files/1/2788/8404/products/BLKHOODIESTACKED.jpg?v=1618330910",
    href: "https://www.bunkerbranding.com/products/leon-lush-brainworms-hoodie",
  },
  {
    name: "The Classic Long Sleeve",
    price: "$35.00",
    image:
      "https://cdn.shopify.com/s/files/1/2788/8404/products/BWLSBLK100-104_mainimage.jpg?v=1612384123",
    href: "https://www.bunkerbranding.com/products/leon-lush-brainworms-long-sleeve-t-shirt",
  },
  {
    name: "The Karen T-Shirt",
    price: "$29.95",
    image:
      "https://cdn.shopify.com/s/files/1/2788/8404/products/sBrainwormsKarenT-ShirtFront.jpg?v=1660578463",
    href: "https://www.bunkerbranding.com/products/leon-lush-restraint-and-poise-t-shirt",
  },
  {
    name: "The Karen Long Sleeve",
    price: "$35.00",
    image:
      "https://cdn.shopify.com/s/files/1/2788/8404/products/KLSBLK100_mainimage.jpg?v=1612390248",
    href: "https://www.bunkerbranding.com/products/leon-lush-restraint-poise-long-sleeve-t-shirt",
  },
];

export default function ShopPage() {
  return (
    <main className="relative flex min-h-screen w-full max-w-[580px] mx-auto flex-col bg-mesh overflow-x-hidden">
      {/* Back link */}
      <div className="px-6 pt-8 pb-2">
        <Link
          href="/"
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-8 text-center">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
          Merch
        </h1>
        <p className="text-slate-400 text-sm">
          brainworms apparel — official Leon Lush collection
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-6 pb-8">
        {products.map((product) => (
          <a
            key={product.name}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-white/5 rounded-xl overflow-hidden backdrop-blur-md hover:bg-white/10 transition-colors"
          >
            {/* Product Image */}
            <div className="aspect-square w-full overflow-hidden bg-black">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-3">
              <h2 className="text-white font-bold text-sm leading-tight">
                {product.name}
              </h2>
              <p className="text-slate-400 text-sm mt-1">{product.price}</p>
            </div>
          </a>
        ))}
      </div>

      {/* View All link */}
      <div className="px-6 pb-12 text-center">
        <a
          href="https://www.bunkerbranding.com/pages/leon-lush"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#d674ff] hover:text-[#eaaeff] transition-colors text-sm font-medium"
        >
          View all on Bunker Branding
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center px-6">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} Leon Lush. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
