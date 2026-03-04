"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

export default function MarcaBlancaPage() {
  const [formData, setFormData] = useState({
    nombre_apellido: "",
    empresa: "",
    ciudad: "",
    whatsapp: "",
    email: "",
    nombre_marca: "",
    tienes_logo: "",
    logo: null as File | null,
    sobre_marca: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "marca-blanca",
          fields: {
            "Nombre y Apellido": formData.nombre_apellido,
            Empresa: formData.empresa,
            Ciudad: formData.ciudad,
            WhatsApp: formData.whatsapp,
            Email: formData.email,
            "Nombre de la marca": formData.nombre_marca,
            "¿Tiene logo?": formData.tienes_logo || "No especificado",
            "Sobre la marca": formData.sobre_marca,
          },
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({
          nombre_apellido: "", empresa: "", ciudad: "", whatsapp: "",
          email: "", nombre_marca: "", tienes_logo: "", logo: null, sobre_marca: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section className="section">
        <div className="container grid grid-2 contact-layout">
          <article className="card highlight">
            <span className="kicker">Programa de negocios</span>
            <h1>Marca Blanca</h1>
            <p className="lead">
              Conviértete en distribuidor autorizado de Dr Polarizados. Ofrece nuestros
              productos bajo tu propia marca y genera ingresos adicionales.
            </p>
          </article>
          <article className="card">
            <div className="form-confirmation">
              <div className="form-confirmation-icon">
                <CircleCheck size={28} />
              </div>
              <h3>¡Solicitud enviada!</h3>
              <p>Recibimos tu propuesta de Marca Blanca. Nos pondremos en contacto para conocer más sobre tu proyecto.</p>
              <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
                Enviar otra solicitud
              </button>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="section">
        <div className="container grid grid-2 contact-layout">
          <article className="card highlight">
            <span className="kicker">Programa de negocios</span>
            <h1>Marca Blanca</h1>
            <p className="lead">
              Conviértete en distribuidor autorizado de Dr Polarizados.
            </p>
          </article>
          <article className="card">
            <div className="form-confirmation form-confirmation-error">
              <div className="form-confirmation-icon">
                <CircleX size={28} />
              </div>
              <h3>Error al enviar</h3>
              <p>Ocurrió un problema. Por favor, intentá de nuevo.</p>
              <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
                Volver al formulario
              </button>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container grid grid-2 contact-layout">
        <article className="card highlight">
          <span className="kicker">Programa de negocios</span>
          <h1>Marca Blanca</h1>
          <p className="lead">
            Conviértete en distribuidor autorizado de Dr Polarizados. Ofrece nuestros
            productos bajo tu propia marca y genera ingresos adicionales. Completa el
            formulario a continuación y nos pondremos en contacto para conocer tu
            proyecto.
          </p>
          
          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem", color: "var(--ink)" }}>
              ¿Por qué unirse?
            </h3>
            <ul style={{ lineHeight: 1.8, color: "var(--muted)" }}>
              <li>✓ Productos de calidad premium</li>
              <li>✓ Soporte técnico completo</li>
              <li>✓ Márgenes competitivos</li>
              <li>✓ Flexibilidad en volúmenes</li>
              <li>✓ Capacitación y material de ventas</li>
            </ul>
          </div>
        </article>

        <article className="card">
          <form onSubmit={handleSubmit} className="contact-form">
            {/* Datos de contacto */}
            <label htmlFor="nombre_apellido">
              Nombre y Apellido
              <input
                type="text"
                id="nombre_apellido"
                name="nombre_apellido"
                value={formData.nombre_apellido}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
              />
            </label>

            <label htmlFor="empresa">
              Empresa
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa"
                required
              />
            </label>

            <label htmlFor="ciudad">
              Ciudad
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                placeholder="Tu ciudad"
                required
              />
            </label>

            <label htmlFor="whatsapp">
              WhatsApp
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="+54 9 XXXX XXXX"
                required
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </label>

            {/* Datos de marca */}
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--ink)" }}>
                Datos de tu marca
              </h3>
            </div>

            <label htmlFor="nombre_marca">
              Nombre de la marca
              <input
                type="text"
                id="nombre_marca"
                name="nombre_marca"
                value={formData.nombre_marca}
                onChange={handleInputChange}
                placeholder="Nombre de tu marca"
                required
              />
            </label>

            <label htmlFor="tienes_logo">
              ¿Tienes logo?
              <select
                id="tienes_logo"
                name="tienes_logo"
                value={formData.tienes_logo}
                onChange={handleInputChange}
                className="contact-select"
              >
                <option value="">Selecciona una opción</option>
                <option value="si">Sí, tengo logo</option>
                <option value="no">No, no tengo logo aún</option>
              </select>
            </label>

            {formData.tienes_logo === "si" && (
              <label htmlFor="logo">
                Subir logo
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            )}

            <label htmlFor="sobre_marca">
              Cuéntanos sobre la marca
              <textarea
                id="sobre_marca"
                name="sobre_marca"
                value={formData.sobre_marca}
                onChange={handleInputChange}
                placeholder="Comparte detalles sobre tu marca, su trayectoria, si es nueva, si es la misma marca de tu taller, etc..."
                required
                rows={5}
              />
            </label>

            <button type="submit" className="contact-button" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
