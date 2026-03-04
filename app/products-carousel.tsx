"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

interface Product {
  id: number;
  title: string | { rendered: string };
  featured_media: number;
  product_cat?: number[];
  better_featured_image?: {
    source_url?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

/* Category IDs: Polarizado Vehicular = 124, Arquitectura = 127 */
const ALLOWED_CATS = [124, 127];

function ProductCard({ product }: { product: Product }) {
  const embeddedImage = product._embedded?.["wp:featuredmedia"]?.[0];
  const featuredImage = embeddedImage || product.better_featured_image;
  const productTitle =
    typeof product.title === "string"
      ? product.title
      : product.title?.rendered || "";
  const imageAlt = embeddedImage?.alt_text || productTitle;

  return (
    <article className="product-carousel-item">
      <Link href={`/productos/${product.id}`} className="product-carousel-link">
        <div className="product-carousel-image">
          {featuredImage?.source_url ? (
            <Image
              src={featuredImage.source_url}
              alt={imageAlt}
              fill
              className="product-image"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
            />
          ) : (
            <div className="product-image-placeholder">
              <span>{productTitle}</span>
            </div>
          )}
          <span className="product-carousel-overlay">Ver +</span>
        </div>
        <h3>{productTitle}</h3>
      </Link>
    </article>
  );
}

export default function ProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        /* Fetch both categories in parallel */
        const urls = ALLOWED_CATS.map(
          (cat) =>
            `https://backend.drpolarizados.com/wp-json/wp/v2/product?_embed&per_page=20&product_cat=${cat}`
        );
        const responses = await Promise.all(urls.map((u) => fetch(u)));
        const results = await Promise.all(responses.map((r) => r.json()));
        /* Deduplicate by id */
        const all: Product[] = results.flat().filter((p: Product) => p?.id);
        const unique = Array.from(new Map(all.map((p) => [p.id, p])).values());

        setProducts(unique);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* Pause animation on hover / focus */
  const handleEnter = useCallback(() => setPaused(true), []);
  const handleLeave = useCallback(() => setPaused(false), []);

  if (isLoading) {
    return (
      <section className="section products-carousel-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Productos</h2>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            Cargando productos...
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="section products-carousel-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Productos</h2>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            No hay productos disponibles en este momento.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section products-carousel-section">
      <div
        className="container"
        style={{ marginBottom: "2.5rem", textAlign: "center" }}
      >
        <h2 className="section-title">Productos</h2>
      </div>

      <div className="carousel-infinite-wrapper">
        <div
          ref={trackRef}
          className={`carousel-infinite-track${paused ? " paused" : ""}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onFocus={handleEnter}
          onBlur={handleLeave}
          role="region"
          aria-label="Carrusel de productos"
        >
          {/* Render products twice for seamless infinite loop */}
          {[...products, ...products].map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
