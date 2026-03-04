"use client";

import {
  Facebook,
  Headset,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import XIcon from "./components/XIcon";

const WHATSAPP_PHONE = "5491168477185";

export default function TopContactBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMessage, setDrawerMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 70);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isDrawerOpen);

    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, [isDrawerOpen]);

  const whatsappHref = useMemo(() => {
    const message = drawerMessage.trim();
    const content =
      message.length > 0
        ? message
        : "Hola, me gustaría recibir más información sobre Dr Polarizados.";

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(content)}`;
  }, [drawerMessage]);

  return (
    <>
      <div className={`top-contact-bar ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="container top-contact-inner">
          <div className="top-contact-left">
            <button
              type="button"
              className="top-menu-button"
              aria-label="Abrir menu lateral"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu size={16} aria-hidden />
            </button>
            <Link href="/" className="top-mini-brand">
              Dr Polarizados
            </Link>
          </div>

          <div className="top-contact-right">
            <a className="top-inline-link" href="tel:+5491168477185">
              <Headset size={14} aria-hidden />
              <span>+54 9 11 6847-7185</span>
            </a>
            <span className="top-separator" aria-hidden>
              |
            </span>
            <a className="top-inline-link" href="mailto:comunicaciones@drpolarizados.com">
              <Mail size={14} aria-hidden />
              <span>comunicaciones@drpolarizados.com</span>
            </a>
            <span className="top-separator" aria-hidden>
              |
            </span>
            <div className="top-inline-social" aria-label="Redes sociales">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={14} aria-hidden />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={14} aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} aria-hidden />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
              >
                <XIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <aside
        className={`top-side-drawer ${isDrawerOpen ? "is-open" : ""}`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="top-drawer-head">
          <span>Menu</span>
          <button
            type="button"
            className="top-drawer-close"
            aria-label="Cerrar menu lateral"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        <nav className="top-drawer-nav" aria-label="Menu lateral">
          <Link href="/" onClick={() => setIsDrawerOpen(false)}>
            Home
          </Link>
          <Link href="/productos" onClick={() => setIsDrawerOpen(false)}>
            Productos
          </Link>
          <Link href="/contacto" onClick={() => setIsDrawerOpen(false)}>
            Contacto
          </Link>
          <Link href="/blog" onClick={() => setIsDrawerOpen(false)}>
            Blog
          </Link>
        </nav>

        <div className="top-drawer-social" aria-label="Redes sociales">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook size={16} aria-hidden />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={16} aria-hidden />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} aria-hidden />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
            <XIcon size={16} />
          </a>
        </div>

        <div className="top-drawer-divider" aria-hidden />

        <div className="top-drawer-whatsapp">
          <h4 className="top-drawer-section-title">WhatsApp</h4>
          <label htmlFor="top-drawer-message">Mensaje por WhatsApp</label>
          <div className="top-drawer-wa-input">
            <MessageCircle size={15} aria-hidden />
            <input
              id="top-drawer-message"
              type="text"
              placeholder="Escribe tu mensaje..."
              value={drawerMessage}
              onChange={(event) => setDrawerMessage(event.target.value)}
            />
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="top-drawer-send"
            onClick={() => setIsDrawerOpen(false)}
          >
            Enviar
          </a>
        </div>
      </aside>

      {isDrawerOpen && (
        <button
          type="button"
          className="top-drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Cerrar menu lateral"
        />
      )}
    </>
  );
}
