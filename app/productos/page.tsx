import type { Metadata } from "next";
import Link from "next/link";
import { Car, Zap, Shield, Building2, ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import { ProductsGrid } from "@/app/components/ProductsGrid";
import { AdvisoryForm } from "@/app/components/AdvisoryForm";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Líneas de láminas de polarizar de Dr Polarizados para automotriz y arquitectura.",
};

export default function ProductosPage() {
  const productCategories = [
    {
      title: "Polarizado Vehicular",
      description: "Láminas de control solar diseñadas para vehículos, ofreciendo privacidad, protección UV y reducción de calor.",
      icon: Car,
      id: "polarizado-vehicular",
      productCat: 124,
    },
    {
      title: "PPF",
      description: "Películas de protección transparente que resguardan la pintura del vehículo contra rayones, impactos y elementos.",
      icon: Zap,
      id: "ppf",
      productCat: 125,
    },
    {
      title: "Seguridad Vehicular",
      description: "Soluciones de refuerzo de cristal para protección contra impactos e incremento de seguridad estructural.",
      icon: Shield,
      id: "seguridad-vehicular",
      productCat: 128,
    },
    {
      title: "Arquitectura",
      description: "Películas especializadas para edificios y espacios comerciales con control térmico y estético optimizado.",
      icon: Building2,
      id: "arquitectura",
      productCat: 127,
    },
  ];

  return (
    <>
      <section className="hero hero-video">
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/hero-catalogo.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="container">
          <span className="kicker">Catálogo DP</span>
          <h1>Líneas de producto para instalación profesional.</h1>
          <div style={{ marginTop: "1.15rem", maxWidth: "64ch" }}>
            <p className="lead" style={{ marginTop: 0 }}>
              En DR ponemos un gran enfoque en encontrar y distribuir los productos de mejor relación calidad precio para que el margen de instaladores y distribuidores sea el mejor! Recordá que ante cualquier duda sobre nuestros productos estamos disponibles para atenderte por WhatsApp
            </p>
            <a 
              href="https://wa.me/5491168477185?text=Hola%2C%20me%20gustaría%20recibir%20información%20sobre%20los%20productos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-button"
              style={{
                marginTop: "1rem",
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="categorias">
        <div className="container">
          <div className="grid grid-4">
            {productCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <article className="card product-card" key={category.title}>
                  <div className="product-card-header">
                    <IconComponent size={28} className="product-card-icon" aria-hidden />
                    <h3>{category.title}</h3>
                  </div>
                  <p>{category.description}</p>
                <a href={`#${category.id}`} className="product-card-button">
                    Ver productos
                    <ArrowDown size={16} aria-hidden />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {productCategories.map((category) => {
        // Render PPF section after Polarizado Vehicular
        if (category.id === "polarizado-vehicular") {
          return (
            <div key="ppf-section">
              <section className="section" id={category.id}>
                <div className="container">
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <h2 style={{ margin: 0 }}>{category.title}</h2>
                    <a 
                      href="#categorias" 
                      className="back-to-categories-btn"
                      title="Volver a categorías"
                    >
                      <ArrowUp size={14} aria-hidden />
                      Volver a categorías
                    </a>
                  </div>
                  <p className="lead">
                    {category.description}
                  </p>
                  <ProductsGrid 
                    productCat={category.productCat}
                    columns={3}
                    categoryId={category.id}
                  />
                </div>
              </section>

              {/* PPF Hero Section */}
              <section className="ppf-hero" id="ppf">
                <div className="ppf-hero-inner">
                  <div className="container">
                    <div className="ppf-hero-content">
                      <span className="kicker">Máxima protección para la pintura automotriz</span>
                      <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1rem 0 1.5rem 0" }}>
                        <Shield size={36} color="var(--accent)" aria-hidden />
                        PPF Premium
                      </h1>
                      <p className="lead">
                        Consulta por nuestro stock de rollos de PPF para protección automotriz, tenemos calidades y precios adaptados a tu negocio.
                      </p>
                      <Link href="/contacto" className="contact-button" style={{ marginTop: "1.5rem", display: "inline-flex", width: "auto", color: "#000000" }}>
                        <MessageCircle size={18} aria-hidden />
                        Consultar por PPF
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        }
        
        // Skip PPF category as it's now handled above
        if (category.id === "ppf") return null;
        
        return (
          <section className="section" id={category.id} key={category.id}>
            <div className="container">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <h2 style={{ margin: 0 }}>{category.title}</h2>
                <a 
                  href="#categorias" 
                  className="back-to-categories-btn"
                  title="Volver a categorías"
                >
                  <ArrowUp size={14} aria-hidden />
                  Volver a categorías
                </a>
              </div>
              <p className="lead">
                {category.description}
              </p>
              <ProductsGrid 
                productCat={category.productCat}
                columns={category.id === "polarizado-vehicular" ? 3 : 4}
                categoryId={category.id}
              />
            </div>
          </section>
        );
      })}

      {/* Asesoramiento Section */}
      <section className="advisory-section">
        <div className="container">
          <div className="advisory-content">
            <div className="advisory-text">
              <h1>Asesoramiento gratuito</h1>
              <p className="lead">
                Dejanos tus datos y a la brevedad un asesor se comunicará para informarte sobre nuestros productos, nuestros planes de negocio y resolver todas las dudas que tengas.
              </p>
            </div>
            <div className="advisory-form">
              <AdvisoryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
