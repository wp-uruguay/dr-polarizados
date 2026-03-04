"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

export function AdvisoryForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    whatsapp: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
        <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
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
        <p>Intentá de nuevo en unos momentos.</p>
        <button type="button" className="form-confirmation-btn" onClick={() => setStatus("idle")}>
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="advisory-form-content">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={formData.empresa}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="whatsapp"
        placeholder="WhatsApp"
        value={formData.whatsapp}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit" className="advisory-submit-btn" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
