import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto comercial de Dr Polarizados para compras mayoristas y distribucion.",
};

export default function ContactoPage() {
  return (
    <section className="section">
      <div className="container grid grid-2">
        <article className="card highlight">
          <span className="kicker">Canal comercial</span>
          <h1>Contacto para ventas y distribucion.</h1>
          <p className="lead">
            Deja tus datos y el perfil de tu negocio. Este formulario es visual
            por ahora, luego conectamos envio real por correo o CRM.
          </p>
          <div style={{ marginTop: "1.25rem" }}>
            <p>
              <strong>Email:</strong> ventas@drpolarizados.com
            </p>
            <p>
              <strong>Telefono:</strong> +598 0000 0000
            </p>
            <p>
              <strong>Horario:</strong> Lunes a Viernes, 09:00 - 18:00
            </p>
          </div>
        </article>

        <article className="card">
          <form>
            <label htmlFor="nombre">
              Nombre y empresa
              <input id="nombre" name="nombre" placeholder="Ej: Juan - Taller X" />
            </label>
            <label htmlFor="segmento">
              Tipo de cliente
              <select id="segmento" name="segmento" defaultValue="">
                <option value="" disabled>
                  Selecciona una opcion
                </option>
                <option value="instalador">Instalador</option>
                <option value="arquitectonico">Proyecto arquitectonico</option>
                <option value="distribuidor">Distribuidor</option>
              </select>
            </label>
            <label htmlFor="email">
              Email
              <input id="email" type="email" name="email" placeholder="tu@email.com" />
            </label>
            <label htmlFor="mensaje">
              Mensaje
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Cuentanos volumen aproximado y tipo de lamina."
              />
            </label>
            <button type="button" className="btn btn-primary">
              Enviar solicitud
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
