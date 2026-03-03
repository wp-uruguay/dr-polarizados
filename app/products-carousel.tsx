"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  name: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export default function ProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend.drpolarizados.com/wp-json/wp/v2/products?_embed=wp:featuredmedia&per_page=12"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="section products-carousel-section">
        <div className="container">
          <h2 className="section-title">Productos</h2>
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)" }}>
            Cargando productos...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section products-carousel-section">
      <div className="container" style={{ marginBottom: "3rem" }}>
        <h2 className="section-title">Productos</h2>
      </div>

      <div
        ref={carouselRef}
        className="products-carousel-track"
        role="region"
        aria-label="Carrusel de productos"
      >
        {products.map((product) => {
          const featuredImage = product._embedded?.["wp:featuredmedia"]?.[0];

          return (
            <article key={product.id} className="product-carousel-item">
              <div className="product-carousel-image">
                {featuredImage?.source_url ? (
                  <Image
                    src={featuredImage.source_url}
                    alt={featuredImage.alt_text || product.name}
                    fill
                    className="product-image"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <span>{product.name}</span>
                  </div>
                )}
              </div>
              <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>{product.name}</h3>
              <Link href={`/productos/${product.id}`} className="btn btn-ghost btn-sm">
                Ver producto
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
