import type { Metadata } from "next";
import { Facebook, Instagram, Linkedin, Mail, Phone, Clock } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto comercial de Dr Polarizados para compras mayoristas y distribucion.",
};

export default function ContactoPage() {
  return (
    <section className="section">
      <div className="container grid grid-2 contact-layout">
        <article className="card highlight">
          <span className="kicker">Canal comercial</span>
          <h1>Contacto para ventas y distribucion.</h1>
          <p className="lead">
            Deja tus datos y el perfil de tu negocio. Este formulario es visual
            por ahora, luego conectamos envio real por correo o CRM.
          </p>
          <div className="contact-social-links" aria-label="Redes sociales">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={16} aria-hidden />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={16} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} aria-hidden />
            </a>
          </div>

          <div className="contact-info-block">
            <Image
              src="/branding/callcenter.png"
              alt="Atencion comercial"
              width={164}
              height={164}
              className="contact-info-image"
              priority
            />
            <div className="contact-info-copy">
              <p>
                <Mail size={16} aria-hidden className="contact-info-icon" />
                <span>comunicaciones@drpolarizados.com</span>
              </p>
              <p>
                <Phone size={16} aria-hidden className="contact-info-icon" />
                <span>+54 9 11 6847-7185</span>
              </p>
              <p>
                <Clock size={16} aria-hidden className="contact-info-icon" />
                <span>Lunes a Viernes, 09:00 - 18:00</span>
              </p>
            </div>
          </div>
        </article>

        <article className="card">
          <form className="contact-form">
            <label htmlFor="nombre">
              Nombre
              <input id="nombre" name="nombre" placeholder="Tu nombre" />
            </label>

            <label htmlFor="empresa">
              Empresa
              <input id="empresa" name="empresa" placeholder="Nombre de tu empresa" />
            </label>

            <label htmlFor="tipo-cliente">
              Tipo de cliente
              <select id="tipo-cliente" name="tipoCliente" className="contact-select" defaultValue="" required>
                <option value="" disabled>
                  Selecciona una opcion
                </option>
                <option value="instalador">Instalador</option>
                <option value="distribuidor">Distribuidor</option>
                <option value="proyecto-arquitectonico">Proyecto arquitectonico</option>
                <option value="otro">Otro</option>
              </select>
            </label>

            <label htmlFor="producto-interes">
              Producto de interes
              <select
                id="producto-interes"
                name="productoInteres"
                className="contact-select"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecciona una opcion
                </option>
                <option value="seguridad-vehicular">Seguridad Vehicular</option>
                <option value="polarizados">Polarizados</option>
                <option value="arquitectura">Arquitectura</option>
                <option value="otro">Otro</option>
              </select>
            </label>

            <label htmlFor="email">
              Email
              <input id="email" type="email" name="email" placeholder="tu@email.com" />
            </label>

            <label htmlFor="whatsapp">
              Whatsapp
              <input id="whatsapp" type="tel" name="whatsapp" placeholder="+54 9 ..." />
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
