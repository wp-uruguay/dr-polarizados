import { Building2, Car, MessageCircle, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdvisoryForm } from "@/app/components/AdvisoryForm";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Líneas de láminas de polarizar de Dr Polarizados para automotriz y arquitectura.",
};

const productCategories = [
  {
    title: "Polarizado Vehicular",
    description:
      "Láminas de control solar diseñadas para vehículos, ofreciendo privacidad, protección UV y reducción de calor.",
    icon: Car,
    id: "polarizado-vehicular",
    bg: "/autos/5082.jpg",
    kicker: "Control Solar Automotriz",
    mensaje:
      "Hola, me interesa obtener información sobre Polarizado Vehicular.",
  },
  {
    title: "PPF",
    description:
      "Películas de protección transparente que resguardan la pintura del vehículo contra rayones, impactos y elementos.",
    icon: Zap,
    id: "ppf",
    bg: "/ppf.jpg",
    kicker: "Máxima protección para la pintura automotriz",
    mensaje:
      "Hola, me interesa obtener información sobre PPF (Paint Protection Film).",
  },
  {
    title: "Seguridad Vehicular",
    description:
      "Soluciones de refuerzo de cristal para protección contra impactos e incremento de seguridad estructural.",
    icon: Shield,
    id: "seguridad-vehicular",
    bg: "/autos/1233.jpg",
    kicker: "Protección estructural del cristal",
    mensaje:
      "Hola, me interesa obtener información sobre Seguridad Vehicular.",
  },
  {
    title: "Arquitectura",
    description:
      "Películas especializadas para edificios y espacios comerciales con control térmico y estético optimizado.",
    icon: Building2,
    id: "arquitectura",
    bg: "https://backend.drpolarizados.com/wp-content/uploads/2026/03/9019.jpg",
    kicker: "Control térmico y estético para edificios",
    mensaje:
      "Hola, me interesa obtener información sobre láminas de Arquitectura.",
  },
];

export default function ProductosPage() {
  return (
    <>
      <section className="hero hero-video">
        <video className="hero-video-bg" autoPlay muted loop playsInline>
          <source src="/videos/hero-catalogo.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="container">
          <span className="kicker">Catálogo DP</span>
          <h1>Líneas de producto para instalación profesional.</h1>
          <div style={{ marginTop: "1.15rem", maxWidth: "64ch" }}>
            <p className="lead" style={{ marginTop: 0 }}>
              En DR ponemos un gran enfoque en encontrar y distribuir los
              productos de mejor relación calidad precio para que el margen de
              instaladores y distribuidores sea el mejor! Recordá que ante
              cualquier duda sobre nuestros productos estamos disponibles para
              atenderte por WhatsApp
            </p>
            <a
              href="https://wa.me/5491168477185?text=Hola%2C%20me%20gustaría%20recibir%20información%20sobre%20los%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              style={{ marginTop: "1rem" }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {productCategories.map((category) => {
        const IconComponent = category.icon;
        const encodedMensaje = encodeURIComponent(category.mensaje);

        return (
          <section
            key={category.id}
            className="cat-hero"
            id={category.id}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("${category.bg}")`,
            }}
          >
            <div className="cat-hero-inner">
              <div className="container">
                <div className="cat-hero-content">
                  <span className="kicker">{category.kicker}</span>
                  <h1>
                    <IconComponent
                      size={36}
                      color="var(--accent)"
                      aria-hidden
                    />
                    {category.title}
                  </h1>
                  <p className="lead">{category.description}</p>
                  <Link
                    href={`/contacto?mensaje=${encodedMensaje}`}
                    className="contact-button"
                    style={{
                      marginTop: "1.5rem",
                      display: "inline-flex",
                      width: "auto",
                      color: "#000000",
                    }}
                  >
                    <MessageCircle size={18} aria-hidden />
                    Consultar por {category.title}
                  </Link>
                </div>
              </div>
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
                Dejanos tus datos y a la brevedad un asesor se comunicará para
                informarte sobre nuestros productos, nuestros planes de negocio
                y resolver todas las dudas que tengas.
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
