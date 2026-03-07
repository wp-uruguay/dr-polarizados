import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import AutosCarousel from "../components/AutosCarousel";
import { ContactoForm } from "../components/ContactoForm";
import XIcon from "../components/XIcon";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto comercial de Dr Polarizados para compras mayoristas y distribución.",
};

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ mensaje?: string }>;
}) {
  const { mensaje } = await searchParams;
  return (
    <section className="section">
      <div className="container grid grid-2 contact-layout">
        <div className="contact-col">
          <article className="card highlight">
            <span className="kicker">Canal comercial</span>
            <h1>Contacto para ventas y distribución.</h1>
            <p className="lead">
              Deja tus datos y el perfil de tu negocio para que nuestro equipo
              comercial se ponga en contacto.
            </p>
            <nav className="contact-social-links" aria-label="Redes sociales">
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
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
              >
                <XIcon size={16} />
              </a>
            </nav>

            <div className="contact-info-block">
              <div className="contact-info-copy">
                <p>
                  <Mail size={16} aria-hidden className="contact-info-icon" />
                  <span>ventas@drpolarizados.com</span>
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

          <AutosCarousel />
        </div>

        <article className="card">
          <ContactoForm defaultMensaje={mensaje} />
        </article>
      </div>
    </section>
  );
}
