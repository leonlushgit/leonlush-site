"use client";

import { useRef } from "react";

// All merch from Bunker Branding store
const products = [
  {
    name: "Electric Wormaloo T-Shirt",
    price: "$29.95",
    image: "https://www.bunkerbranding.com/cdn/shop/files/LeonLush-DesignOne.jpg?v=1684260100",
    href: "https://www.bunkerbranding.com/products/electric-wormaloo-t-shirt",
  },
  {
    name: "The Album Cover T-Shirt",
    price: "$29.95",
    image: "https://www.bunkerbranding.com/cdn/shop/files/LeonLush-DesignThree2.jpg?v=1684262103",
    href: "https://www.bunkerbranding.com/products/the-album-cover-t-shirt",
  },
  {
    name: "The Wave T-Shirt",
    price: "$29.95",
    image: "https://www.bunkerbranding.com/cdn/shop/files/LeonLush-Design2S.jpg?v=1684261665",
    href: "https://www.bunkerbranding.com/products/the-wave-t-shirt",
  },
  {
    name: "The Classic T-Shirt",
    price: "$29.95",
    image: "https://cdn.shopify.com/s/files/1/2788/8404/products/sBrainwormsT-ShirtFront.jpg?v=1660577837",
    href: "https://www.bunkerbranding.com/products/leon-lush-brain-worms-t-shirt",
  },
  {
    name: "The Classic Hoodie",
    price: "$54.99",
    image: "https://cdn.shopify.com/s/files/1/2788/8404/products/BLKHOODIESTACKED.jpg?v=1618330910",
    href: "https://www.bunkerbranding.com/products/leon-lush-brainworms-hoodie",
  },
  {
    name: "The Classic Long Sleeve",
    price: "$35.00",
    image: "https://cdn.shopify.com/s/files/1/2788/8404/products/BWLSBLK100-104_mainimage.jpg?v=1612384123",
    href: "https://www.bunkerbranding.com/products/leon-lush-brainworms-long-sleeve-t-shirt",
  },
  {
    name: "The Karen T-Shirt",
    price: "$29.95",
    image: "https://cdn.shopify.com/s/files/1/2788/8404/products/sBrainwormsKarenT-ShirtFront.jpg?v=1660578463",
    href: "https://www.bunkerbranding.com/products/leon-lush-restraint-and-poise-t-shirt",
  },
  {
    name: "The Karen Long Sleeve",
    price: "$35.00",
    image: "https://cdn.shopify.com/s/files/1/2788/8404/products/KLSBLK100_mainimage.jpg?v=1612390248",
    href: "https://www.bunkerbranding.com/products/leon-lush-restraint-poise-long-sleeve-t-shirt",
  },
];

// Arrow button for scrolling the carousel
function ScrollButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1a1919]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
      style={{ [direction === "left" ? "left" : "right"]: "-20px" }}
      aria-label={`Scroll ${direction}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        {direction === "left" ? (
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        ) : (
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        )}
      </svg>
    </button>
  );
}

export default function MerchSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll by roughly 3 card widths
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.offsetWidth / 3;
    const scrollAmount = cardWidth * 3;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="merch" className="max-w-6xl mx-auto px-8 py-20">
      {/* Section header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Merch</h2>
          <p className="text-slate-500 text-sm mt-1">brainworms apparel — official collection</p>
        </div>
        <a
          href="/shop"
          className="text-[#81e9ff] text-sm font-medium hover:text-[#b0f0ff] transition-colors"
        >
          Shop All →
        </a>
      </div>

      {/* Scrolling carousel — 3 items visible at a time */}
      <div className="relative">
        <ScrollButton direction="left" onClick={() => scroll("left")} />
        <ScrollButton direction="right" onClick={() => scroll("right")} />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block flex-shrink-0"
              style={{ width: "calc((100% - 48px) / 3)" }}
            >
              {/* Product image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1919] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product info */}
              <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#81e9ff] transition-colors">
                {product.name}
              </h3>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
