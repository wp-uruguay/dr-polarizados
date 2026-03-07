"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  title: string | { rendered: string };
  excerpt: string | { rendered: string };
  featured_media?: number;
  better_featured_image?: {
    source_url?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
    }>;
  };
}

interface RelatedProductsProps {
  productCat: number;
  currentProductId: number;
}

export function RelatedProducts({
  productCat,
  currentProductId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(
          `https://backend.drpolarizados.com/wp-json/wp/v2/product?product_cat=${productCat}&_embed&per_page=12`,
        );
        if (!response.ok) throw new Error("Error fetching");
        const data: Product[] = await response.json();
        // Filter out current product
        const filtered = data.filter((p) => p.id !== currentProductId);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [productCat, currentProductId]);

  const updateScrollButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".related-card")?.clientWidth || 300;
    const distance = cardWidth + 24; // card + gap
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="related-carousel-wrapper">
        <div className="related-carousel-track">
          {["sk1", "sk2", "sk3", "sk4"].map((id) => (
            <div key={id} className="related-card related-card-skeleton">
              <div className="related-card-image skeleton-pulse" />
              <div className="skeleton-text skeleton-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="related-carousel-wrapper">
      {/* Navigation Arrows */}
      {canScrollLeft && (
        <button
          type="button"
          className="related-arrow related-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Anterior"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          className="related-arrow related-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Siguiente"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Track */}
      <div ref={trackRef} className="related-carousel-track">
        {products.map((product) => {
          let imageSrc = "/placeholder.jpg";
          if (product.better_featured_image?.source_url) {
            imageSrc = product.better_featured_image.source_url;
          } else if (product._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
            imageSrc = product._embedded["wp:featuredmedia"][0].source_url;
          }

          const title =
            typeof product.title === "string"
              ? product.title
              : product.title?.rendered || "Sin título";

          return (
            <Link
              key={product.id}
              href={`/productos/${product.id}`}
              className="related-card group"
            >
              <div className="related-card-image">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
              <h4 className="related-card-title">{title}</h4>
              <span className="related-card-btn">
                Ver producto
                <ChevronRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
