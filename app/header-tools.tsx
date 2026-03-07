"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import XIcon from "./components/XIcon";
import ThemeToggle from "./theme-toggle";

const WHATSAPP_PHONE = "5491168477185";

export default function HeaderTools() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuMessage, setMobileMenuMessage] = useState("");
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const mobileFirstLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus first input when login modal opens
  useEffect(() => {
    if (isLoginOpen && loginEmailRef.current) {
      loginEmailRef.current.focus();
    }
  }, [isLoginOpen]);

  // Focus first nav link when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen && mobileFirstLinkRef.current) {
      mobileFirstLinkRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  // Close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLoginOpen) setIsLoginOpen(false);
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLoginOpen, isMobileMenuOpen]);

  const whatsappHref = useMemo(() => {
    const message = mobileMenuMessage.trim();
    const content =
      message.length > 0
        ? message
        : "Hola, me gustaría recibir más información sobre Dr Polarizados.";

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(content)}`;
  }, [mobileMenuMessage]);

  return (
    <>
      <div className="header-actions">
        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Abrir menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} aria-hidden />
        </button>
        <ThemeToggle />
        <button
          type="button"
          className="user-toggle"
          aria-label="Abrir login"
          onClick={() => setIsLoginOpen(true)}
        >
          <UserRound size={16} aria-hidden />
        </button>
      </div>

      {isLoginOpen && (
        <div
          className="login-modal-root"
          role="dialog"
          aria-modal="true"
          aria-label="Login"
        >
          <button
            type="button"
            aria-label="Cerrar modal de login"
            className="login-modal-backdrop"
            onClick={() => setIsLoginOpen(false)}
          />
          <div className="login-modal-card">
            <div className="login-modal-head">
              <h3>Login</h3>
              <button
                type="button"
                className="login-modal-close"
                aria-label="Cerrar login"
                onClick={() => setIsLoginOpen(false)}
              >
                <X size={15} aria-hidden />
              </button>
            </div>
            <form
              className="login-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="login-email">
                Email
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  ref={loginEmailRef}
                  autoComplete="email"
                />
              </label>
              <label htmlFor="login-password">
                Contraseña
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}

      <aside
        className={`mobile-menu-drawer ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
        aria-label="Menú de navegación"
        role="dialog"
        aria-modal={isMobileMenuOpen}
      >
        <div className="mobile-drawer-head">
          <span>Menu</span>
          <button
            type="button"
            className="mobile-drawer-close"
            aria-label="Cerrar menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        <nav className="mobile-drawer-nav" aria-label="Menu">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            ref={mobileFirstLinkRef}
          >
            Home
          </Link>
          <Link href="/productos" onClick={() => setIsMobileMenuOpen(false)}>
            Productos
          </Link>
          <Link href="/mayoristas" onClick={() => setIsMobileMenuOpen(false)}>
            Mayoristas
          </Link>
          <Link href="/marca-blanca" onClick={() => setIsMobileMenuOpen(false)}>
            Marca Blanca
          </Link>
          <Link href="/software" onClick={() => setIsMobileMenuOpen(false)}>
            Software
          </Link>
          <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
            Contacto
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </Link>
        </nav>

        <nav className="mobile-drawer-social" aria-label="Redes sociales">
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

        <div className="mobile-drawer-divider" aria-hidden />

        <div className="mobile-drawer-whatsapp">
          <h4 className="mobile-drawer-section-title">WhatsApp</h4>
          <label htmlFor="mobile-drawer-message">Mensaje por WhatsApp</label>
          <div className="mobile-drawer-wa-input">
            <MessageCircle size={15} aria-hidden />
            <input
              id="mobile-drawer-message"
              type="text"
              placeholder="Escribe tu mensaje..."
              value={mobileMenuMessage}
              onChange={(event) => setMobileMenuMessage(event.target.value)}
            />
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mobile-drawer-send"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Enviar
          </a>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <button
          type="button"
          className="mobile-drawer-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Cerrar menu"
        />
      )}
    </>
  );
}
