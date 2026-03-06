"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import XIcon from "./components/XIcon";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div className="footer-grid">
          {/* Logo Section */}
          <div className="footer-section">
            <Link href="/" className="footer-logo-link">
              <Image
                src="/branding/logo-blanco.png"
                alt="Dr Polarizados"
                width={100}
                height={50}
                className="footer-logo"
              />
            </Link>
            <p className="footer-tagline">
                Distribucion profesional de laminas de control solar de autos y arquitectura para toda la Argentina.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Navegación</h3>
            <nav className="footer-nav">
              <Link href="/productos">Productos</Link>
              <Link href="/software">Software</Link>
              <Link href="/marca-blanca">Marca Blanca</Link>
              <Link href="/mayoristas">Mayoristas</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
          </div>

          {/* Contact Info & Social Networks */}
          <div className="footer-section">
            <h3>Síguenos</h3>
            <div className="footer-socials">
              <a
                href="https://facebook.com/drpolarizados"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="footer-social-link"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/drpolarizados"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="footer-social-link"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/drpolarizados"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="footer-social-link"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="footer-social-link"
              >
                <XIcon size={20} />
              </a>
            </div>
            <h3 style={{ marginTop: "1.5rem" }}>Contacto</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+54 9 1168 477 185</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a href="mailto:ventas@drpolarizados.com">ventas@drpolarizados.com</a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>CABA, Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dr Polarizados. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <Link href="/politica-privacidad">Política de Privacidad</Link>
            <Link href="/terminos-servicio">Términos de Servicio</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="footer-credit">
          <span>Desarrollado por</span>
          <a
            href="http://colonia.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            <img
              src="http://colonia.cloud/wp-content/uploads/2025/12/Logo.png"
              alt="Colonia Cloud"
              className="footer-credit-logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
