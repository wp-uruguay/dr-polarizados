import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Product {
  id: number;
  title: string;
  content: string;
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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `https://backend.drpolarizados.com/wp-json/wp/v2/product/${id}?_embed`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto solicitado no existe",
    };
  }

  const title =
    typeof product.title === "string"
      ? product.title
      : (product.title as any)?.rendered || "Producto";

  return {
    title,
    description:
      typeof product.excerpt === "string"
        ? product.excerpt
        : (product.excerpt as any)?.rendered || "",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-gray-400 mb-6">
              El producto que buscan no existe o fue eliminado.
            </p>
            <Link href="/productos" className="contact-button" style={{display: "inline-block"}}>
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get image source
  let imageSrc = "/placeholder.jpg";
  if (product.better_featured_image?.source_url) {
    imageSrc = product.better_featured_image.source_url;
  } else if (product._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    imageSrc = product._embedded["wp:featuredmedia"][0].source_url;
  }

  const title =
    typeof product.title === "string"
      ? product.title
      : (product.title as any)?.rendered || "Sin título";

  const content =
    typeof product.content === "string"
      ? product.content
      : (product.content as any)?.rendered || "";

  const precio = product.acf?.precio || "Consultar precio";

  return (
    <>
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-accent mb-6 hover:opacity-80 transition-opacity"
          >
            <ChevronLeft size={20} />
            Volver al catálogo
          </Link>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Image Section */}
            <div>
              <div
                className="relative w-full rounded-lg overflow-hidden"
                style={{ aspectRatio: "1" }}
              >
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Details Section */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>

              {product.acf?.sku && (
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  SKU: <strong>{product.acf.sku}</strong>
                </p>
              )}

              <div
                className="text-3xl font-bold mb-8"
                style={{ color: "var(--accent)" }}
              >
                {precio}
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Descripción</h2>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.8,
                  }}
                />
              </div>

              <div
                style={{
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                  ¿Interesado en este producto?
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Link
                    href="/contacto"
                    className="contact-button"
                    style={{
                      flex: "1",
                      textAlign: "center",
                    }}
                  >
                    Solicitar información
                  </Link>
                  <a
                    href="https://wa.me/5491168477185"
                    className="contact-button"
                    style={{
                      flex: "1",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "2px solid var(--accent)",
                      color: "var(--accent)",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section - Optional */}
      <section className="section" style={{ backgroundColor: "var(--surface)" }}>
        <div className="container">
          <h2 className="text-2xl font-bold mb-4">Otros productos</h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
            Explora más opciones en nuestro catálogo
          </p>
          <Link
            href="/productos"
            className="contact-button"
            style={{display: "inline-block"}}
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>
    </>
  );
}
