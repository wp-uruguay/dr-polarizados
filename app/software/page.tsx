import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Software | DR Polarizados",
  description:
    "Acceso a software exclusivo diseñado a medida para gestionar tu negocio de polarizados con control de inventario, clientes y IA.",
};

export default function SoftwarePage() {
  const tiers = [
    {
      level: 1,
      name: "Taller Estándar",
      color: "#10b981",
      emoji: "🟢",
      minPurchase: "5 rollos",
      features: [
        "Versión básica del sistema",
        "1 usuario",
        "Control simple de stock y ventas",
      ],
      benefit: "Incluido sin costo adicional",
    },
    {
      level: 2,
      name: "Taller Grande",
      color: "#f59e0b",
      emoji: "🟡",
      minPurchase: "15 rollos",
      features: [
        "Sistema completo",
        "Reportes avanzados",
        "Gestión de garantías",
        "Soporte prioritario",
      ],
      benefit: "Incluido mientras mantenga volumen",
    },
    {
      level: 3,
      name: "Distribuidor",
      color: "#ef4444",
      emoji: "🔴",
      minPurchase: "30+ rollos",
      features: [
        "Sistema multiusuario",
        "Control por sucursales",
        "Exclusividad territorial",
        "Personalización con tu logo",
      ],
      benefit: "Incluido como beneficio estratégico",
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
          <span className="kicker">Herramientas digitales</span>
          <h1>Software exclusivo para tu negocio</h1>
          <p className="lead">
            En DR Polarizados le ofrecemos a nuestros clientes acceso a un software
            exclusivo y diseñado a medida para que tengas control total de tu negocio.
            Gestión de inventario, clientes y comunicaciones transaccionales o de
            marketing, soporte inmediato y un asistente de IA entrenado para ayudarte
            a mejorar tu negocio de polarizados o distribución.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Planes de acceso al software</h2>
            <p className="lead" style={{ margin: "0 auto" }}>
              Elige el plan que mejor se adapta a tu negocio. A mayor compra, mayores
              beneficios y funcionalidades disponibles.
            </p>
          </div>

          <div className="software-plans-grid">
            {tiers.map((tier) => (
              <article
                key={tier.level}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: `4px solid ${tier.color}`,
                  position: "relative",
                }}
              >
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{tier.emoji}</span>
                    <h3
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: "1.25rem",
                        fontWeight: 600,
                      }}
                    >
                      {tier.name}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.95rem",
                      margin: 0,
                    }}
                  >
                    Compra mínima: <strong>{tier.minPurchase}</strong>
                  </p>
                </div>

                <div style={{ flex: "1 1 auto", marginBottom: "1.5rem" }}>
                  <h4
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "1rem",
                      marginTop: 0,
                    }}
                  >
                    Acceso incluido:
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckCircle2
                          size={18}
                          style={{
                            color: tier.color,
                            flex: "0 0 auto",
                            marginTop: "2px",
                          }}
                        />
                        <span style={{ fontSize: "0.95rem" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--surface-2)",
                    borderRadius: "0.375rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "0.9rem", color: tier.color }}>
                    <strong>{tier.benefit}</strong>
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <Link
                    href="/contacto"
                    className="contact-button"
                    style={{
                      flex: 1,
                      textAlign: "center",
                    }}

                  >
                    Solicitar acceso
                  </Link>
                  <a
                    href="https://wa.me/5491168477185?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20el%20software%20de%20DR%20Polarizados"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                    style={{
                      flex: 1,
                      fontSize: "0.95rem",
                    }}
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--surface)" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: "1rem" }}>¿Preguntas sobre el software?</h2>
            <p
              className="lead"
              style={{
                margin: "0 0 2rem 0",
                color: "var(--muted)",
              }}
            >
              Nuestro equipo está disponible para ayudarte a elegir el plan perfecto
              para tu negocio y resolver todas tus dudas sobre las funcionalidades.
            </p>
            <div className="software-cta-row">
              <Link href="/contacto" className="contact-button">
                Contáctanos
              </Link>
              <a
                href="https://wa.me/5491168477185?text=Hola%2C%20tengo%20preguntas%20sobre%20el%20software"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
