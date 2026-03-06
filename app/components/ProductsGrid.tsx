"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Eye, Sun, Thermometer } from "lucide-react";

interface Product {
  id: number;
  title: string;
  excerpt: string;
  featured_media?: number;
  acf?: {
    precio?: string | number;
    sku?: string;
  };
  better_featured_image?: {
    source_url?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
    }>;
  };
}

interface ProductsGridProps {
  productCat?: number;
  columns?: number;
  categoryId?: string;
}

export function ProductsGrid({ productCat, columns = 3, categoryId }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = productCat
          ? `https://backend.drpolarizados.com/wp-json/wp/v2/product?product_cat=${productCat}&_embed&per_page=100`
          : "https://backend.drpolarizados.com/wp-json/wp/v2/product?_embed&per_page=12";
        
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Products data:", data); // Debug
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error cargando productos");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productCat]);

  if (loading) {
    return (
      <div className={`grid grid-${columns}`} style={{ marginTop: "2rem" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-700 rounded-lg h-80"
            style={{ aspectRatio: "1" }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
        style={{ marginTop: "2rem" }}
      >
        Error cargando productos: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="text-center text-gray-500 py-12"
        style={{ marginTop: "2rem" }}
      >
        No hay productos disponibles
      </div>
    );
  }

  return (
    <div className={`grid grid-${columns}`} style={{ marginTop: "2rem" }}>
      {products.map((product) => {
        // Try multiple image sources
        let imageSrc = "/placeholder.jpg";
        
        if (product.better_featured_image?.source_url) {
          imageSrc = product.better_featured_image.source_url;
        } else if (
          product._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ) {
          imageSrc = product._embedded["wp:featuredmedia"][0].source_url;
        }

        const title =
          typeof product.title === "string"
            ? product.title
            : (product.title as any)?.rendered || "Sin título";
        const excerpt =
          typeof product.excerpt === "string"
            ? product.excerpt
            : (product.excerpt as any)?.rendered || "";
        const precio =
          product.acf?.precio || "Consultar precio";

        return (
          <Link 
            key={product.id}
            href={`/productos/${product.id}`}
            className="block"
            style={{ textDecoration: "none" }}
          >
            <article
              className="card group product-card"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                borderColor: "#2ecc71"
              }}
            >
              <div
                className="relative w-full mb-4 rounded overflow-hidden product-card-image"
                style={{ aspectRatio: "1", flex: "0 0 auto", transition: "transform 0.3s" }}
              >
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
                <h3
                  className="font-bold text-base mb-2 group-hover:text-green-600 transition-colors"
                  style={{ color: "inherit", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <ChevronRight size={18} style={{ color: "#2ecc71", marginRight: 4 }} />
                  {title}
                </h3>
                <p
                  className="text-xs text-gray-400 mb-4 line-clamp-2"
                  style={{
                    flex: "1 1 auto",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: excerpt.replace(/<[^>]*>/g, "").substring(0, 120),
                  }}
                />
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
