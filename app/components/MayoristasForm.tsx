"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

export function MayoristasForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    whatsapp: "",
    ciudad: "",
    tipo_negocio: "",
    mensaje: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "mayoristas",
          fields: {
            Nombre: formData.nombre,
            Empresa: formData.empresa,
            Ciudad: formData.ciudad,
            "Tipo de negocio": formData.tipo_negocio,
            Email: formData.email,
            WhatsApp: formData.whatsapp,
            Mensaje: formData.mensaje,
          },
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ nombre: "", empresa: "", email: "", whatsapp: "", ciudad: "", tipo_negocio: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <article className="card">
        <div className="form-confirmation">
          <div className="form-confirmation-icon">
            <CircleCheck size={28} />
          </div>
          <h3>¡Solicitud enviada!</h3>
          <p>Recibimos tu consulta mayorista. Un asesor comercial se comunicará con vos a la brevedad.</p>
          <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
            Enviar otra consulta
          </button>
        </div>
      </article>
    );
  }

  if (status === "error") {
    return (
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
    );
  }

  return (
    <article className="card">
      {/* Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="nombre">
          Nombre
          <input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Tu nombre completo"
            required
          />
        </label>

        <label htmlFor="empresa">
          Empresa
          <input
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
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleInputChange}
            placeholder="Tu ciudad"
            required
          />
        </label>

        <label htmlFor="tipo_negocio">
          Tipo de negocio
          <select
            id="tipo_negocio"
            name="tipo_negocio"
            value={formData.tipo_negocio}
            onChange={handleInputChange}
            className="contact-select"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="instalador">Instalador profesional</option>
            <option value="distribuidor">Distribuidor mayorista</option>
            <option value="reventa">Reventa</option>
            <option value="empresario">Empresario / Emprendedor</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            required
          />
        </label>

        <label htmlFor="whatsapp">
          WhatsApp
          <input
            id="whatsapp"
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleInputChange}
            placeholder="+54 9 XXXX XXXX"
            required
          />
        </label>

        <label htmlFor="mensaje">
          Mensaje
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Cuéntanos sobre tu negocio, volúmenes de compra aproximados y productos de interés..."
            required
          />
        </label>

        <button type="submit" className="contact-button" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </article>
  );
}
