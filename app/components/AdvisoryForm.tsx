"use client";

import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useState } from "react";

export function AdvisoryForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    whatsapp: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: "advisory",
          fields: {
            Nombre: formData.nombre,
            Empresa: formData.empresa,
            WhatsApp: formData.whatsapp,
            Email: formData.email,
          },
        }),
      });

      if (response.ok) {
        setStatus("sent");
        setFormData({ nombre: "", empresa: "", whatsapp: "", email: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-confirmation">
        <div className="form-confirmation-icon">
          <CircleCheck size={28} />
        </div>
        <h3>¡Consulta enviada!</h3>
        <p>Un asesor se comunicará con vos a la brevedad.</p>
        <button
          type="button"
          className="form-confirmation-btn"
          onClick={() => setStatus("idle")}
        >
          Enviar otra consulta
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
        <p>
          Intentá de nuevo en unos momentos o contactanos por{" "}
          <a
            href="https://wa.me/5491168477185"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          className="form-confirmation-btn"
          onClick={() => setStatus("idle")}
        >
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="advisory-form-content"
      aria-busy={status === "sending"}
    >
      <label htmlFor="advisory-nombre">
        Nombre{" "}
        <span className="required-star" aria-hidden="true">
          *
        </span>
        <input
          id="advisory-nombre"
          type="text"
          name="nombre"
          placeholder="Tu nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="advisory-empresa">
        Empresa{" "}
        <span className="required-star" aria-hidden="true">
          *
        </span>
        <input
          id="advisory-empresa"
          type="text"
          name="empresa"
          placeholder="Nombre de tu empresa"
          value={formData.empresa}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="advisory-whatsapp">
        WhatsApp{" "}
        <span className="required-star" aria-hidden="true">
          *
        </span>
        <input
          id="advisory-whatsapp"
          type="tel"
          name="whatsapp"
          placeholder="+54 9 XXXX XXXX"
          value={formData.whatsapp}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="advisory-email">
        Email{" "}
        <span className="required-star" aria-hidden="true">
          *
        </span>
        <input
          id="advisory-email"
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <button
        type="submit"
        className="advisory-submit-btn"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <Loader2 size={15} className="btn-spinner" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          "Enviar"
        )}
      </button>
    </form>
  );
}
