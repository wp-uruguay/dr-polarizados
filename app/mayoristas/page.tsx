import type { Metadata } from "next";
import { MayoristasForm } from "@/app/components/MayoristasForm";

export const metadata: Metadata = {
  title: "Mayoristas",
  description:
    "Programa de mayoristas y distribuidores de Dr Polarizados. Soluciones profesionales para tu negocio.",
};

export default function MayoristasPage() {

  return (
    <section className="section">
      <div className="container grid grid-2 contact-layout">
        <article className="card highlight">
          <span className="kicker">Programa comercial</span>
          <h1>Mayoristas y Distribuidores</h1>
          <p className="lead">
            Accede a una solución integral diseñada para negocios profesionales que
            buscan expandir su catálogo de productos con opciones de calidad
            premium.
          </p>

          <div style={{ marginTop: "2.5rem", lineHeight: 1.8, color: "var(--muted)" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--ink)",
              }}
            >
              ¿Por qué trabajar con nosotros?
            </h3>

            <div style={{ marginBottom: "1.75rem" }}>
              <h4
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Márgenes competitivos
              </h4>
              <p style={{ fontSize: "0.95rem" }}>
                Rentabilidad garantizada con precios mayoristas sin sacrificar
                calidad.
              </p>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <h4
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Catálogo versátil
              </h4>
              <p style={{ fontSize: "0.95rem" }}>
                Soluciones para automotriz, arquitectura, seguridad y más.
                Múltiples líneas para diversificar tu oferta.
              </p>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <h4
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Soporte técnico especializado
              </h4>
              <p style={{ fontSize: "0.95rem" }}>
                Equipo dedicado para resolver dudas técnicas, especificaciones
                de productos y asesoramiento comercial.
              </p>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <h4
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Flexibilidad en volúmenes
              </h4>
              <p style={{ fontSize: "0.95rem" }}>
                Desde pequeños emprendimientos hasta grandes distribuidores.
                Condiciones adaptadas a tu negocio.
              </p>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <h4
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Material de marketing incluido
              </h4>
              <p style={{ fontSize: "0.95rem" }}>
                Acceso a contenido, fichas técnicas y recursos para promocionar
                los productos en tu zona.
              </p>
            </div>

            <div>
              <h4
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Logística eficiente
              </h4>
              <p style={{ fontSize: "0.95rem" }}>
                Entregas confiables y tiempos establecidos para que puedas
                planificar tu inventario.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--line)",
            }}
          >
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Completa el formulario con tus datos y nos pondremos en contacto para
              discutir condiciones especiales, programas de capacitación y soluciones
              a medida para tu negocio.
            </p>
          </div>
        </article>

        <MayoristasForm />
      </div>
    </section>
  );
}
