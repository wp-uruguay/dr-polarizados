"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

export function FinalContactForm() {
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
          origin: "final-contact",
          fields: {
            Nombre: data.get("name") as string,
            Email: data.get("email") as string,
            Teléfono: data.get("phone") as string,
            Empresa: data.get("company") as string,
            Mensaje: data.get("message") as string,
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
        <h3>¡Gracias por escribirnos!</h3>
        <p>Tu mensaje fue enviado correctamente. Te responderemos a la brevedad.</p>
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
        <p>Ocurrió un problema al procesar tu mensaje. Por favor, intentá de nuevo.</p>
        <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+54 9 XXXX XXXX"
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Empresa</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Tu empresa"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          placeholder="Cuéntanos cómo podemos ayudarte..."
          rows={5}
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
