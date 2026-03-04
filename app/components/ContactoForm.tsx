"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

export function ContactoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "contacto",
          fields: {
            Nombre: data.get("nombre") as string,
            Empresa: data.get("empresa") as string,
            "Tipo de cliente": data.get("tipoCliente") as string,
            "Producto de interés": data.get("productoInteres") as string,
            Email: data.get("email") as string,
            WhatsApp: data.get("whatsapp") as string,
            Mensaje: data.get("mensaje") as string,
          },
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-confirmation">
        <div className="form-confirmation-icon">
          <CircleCheck size={28} />
        </div>
        <h3>¡Mensaje enviado!</h3>
        <p>Recibimos tu solicitud. Nuestro equipo comercial se pondrá en contacto a la brevedad.</p>
        <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="form-confirmation form-confirmation-error">
        <div className="form-confirmation-icon">
          <CircleX size={28} />
        </div>
        <h3>Error al enviar</h3>
        <p>Ocurrió un problema al procesar tu solicitud. Por favor, intentá de nuevo.</p>
        <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label htmlFor="nombre">
        Nombre
        <input id="nombre" name="nombre" placeholder="Tu nombre" required />
      </label>

      <label htmlFor="empresa">
        Empresa
        <input id="empresa" name="empresa" placeholder="Nombre de tu empresa" />
      </label>

      <label htmlFor="tipo-cliente">
        Tipo de cliente
        <select id="tipo-cliente" name="tipoCliente" className="contact-select" defaultValue="" required>
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="instalador">Instalador</option>
          <option value="distribuidor">Distribuidor</option>
          <option value="proyecto-arquitectonico">Proyecto arquitectónico</option>
          <option value="otro">Otro</option>
        </select>
      </label>

      <label htmlFor="producto-interes">
        Producto de interés
        <select
          id="producto-interes"
          name="productoInteres"
          className="contact-select"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="seguridad-vehicular">Seguridad Vehicular</option>
          <option value="polarizados">Polarizados</option>
          <option value="arquitectura">Arquitectura</option>
          <option value="otro">Otro</option>
        </select>
      </label>

      <label htmlFor="email">
        Email
        <input id="email" type="email" name="email" placeholder="tu@email.com" required />
      </label>

      <label htmlFor="whatsapp">
        WhatsApp
        <input id="whatsapp" type="tel" name="whatsapp" placeholder="+54 9 ..." />
      </label>

      <label htmlFor="mensaje">
        Mensaje
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Cuéntanos volumen aproximado y tipo de lámina."
        />
      </label>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}
