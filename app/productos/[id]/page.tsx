import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MessageCircle, Mail, ArrowLeft } from "lucide-react";
import { ProductDescription } from "./ProductDescription";
import { ProductFooterShare } from "./ProductFooter";

interface Product {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featured_media?: number;
  product_cat?: number[];
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

  const whatsappMessage = encodeURIComponent(`Hola, quiero consultar por el precio de ${title}`);
  const whatsappUrl = `https://wa.me/5491168477185?text=${whatsappMessage}`;
  const mailSubject = encodeURIComponent(`Consulta por ${title}`);
  const mailBody = encodeURIComponent(`Hola, quiero consultar por el precio de ${title}`);
  const mailUrl = `mailto:comunicaciones@drpolarizados.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <>
      {/* Hero Section */}
      <section className="product-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.82)), url('${imageSrc}')` }}>
        <div className="container">
          <Link
            href="/productos"
            className="product-back-link"
          >
            <ChevronLeft size={20} aria-hidden />
            Volver al catálogo
          </Link>

          <div className="product-hero-grid">
            {/* Image */}
            <div className="product-hero-image">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="product-hero-info">
              <h1>{title}</h1>
              <h3 className="product-hero-price">Consultar precio para talleres o distribuidores</h3>
              <div className="product-hero-actions">
                <a
                  href={whatsappUrl}
                  className="contact-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#000" }}
                >
                  <MessageCircle size={18} aria-hidden />
                  Consultar por WhatsApp
                </a>
                <a
                  href={mailUrl}
                  className="contact-button product-btn-outline"
                >
                  <Mail size={18} aria-hidden />
                  Consultar por email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {content && (
        <section className="section">
          <div className="container">
            <h2 className="product-desc-title">Descripción del producto</h2>
            <ProductDescription content={content} />
          </div>
        </section>
      )}

      {/* Product Footer CTA */}
      <section className="product-footer-cta">
        <div className="container">
          {/* Back link */}
          <Link href="/productos" className="product-footer-back">
            <ArrowLeft size={16} aria-hidden />
            Volver al catálogo
          </Link>

          <div className="product-footer-line" />

          {/* CTA text + buttons */}
          <h3 className="product-footer-cta-text">
            ¿Te interesa <strong>{title}</strong>?
          </h3>
          <div className="product-footer-buttons">
            <a
              href={whatsappUrl}
              className="contact-button"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#000" }}
            >
              <MessageCircle size={18} aria-hidden />
              Consultar por WhatsApp
            </a>
            <a
              href={mailUrl}
              className="contact-button product-btn-outline"
            >
              <Mail size={18} aria-hidden />
              Consultar por email
            </a>
          </div>

          <div className="product-footer-line" />

          {/* Share icons */}
          <ProductFooterShare productId={product.id} title={title} />
        </div>
      </section>

    </>
  );
}
