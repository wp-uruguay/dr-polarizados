"use client";

import { ArrowUp, Maximize2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const WHATSAPP_PHONE = "5491168477185";

function getGreetingByHour() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Buen día";
  }

  if (hour >= 12 && hour < 20) {
    return "Buenas tardes";
  }

  return "Buenas noches";
}

export default function WhatsappFab() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [showActionButtons, setShowActionButtons] = useState(false);

  const greeting = useMemo(() => getGreetingByHour(), []);

  const preparedMessage = message.trim();
  const whatsappMessage =
    preparedMessage.length > 0
      ? preparedMessage
      : "Hola, me gustaría recibir asesoramiento.";

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setShowActionButtons(scrollPercentage >= 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback si fullscreen no está soportado
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="wa-floating-wrap">
      {isExpanded && (
        <div
          className="wa-chat-modal"
          role="dialog"
          aria-label="Chat de WhatsApp"
        >
          <div className="wa-chat-head">Atención al cliente</div>
          <p className="wa-chat-bubble">{greeting}, ¿cómo podemos ayudarte?</p>
          <label htmlFor="wa-message" className="wa-input-label">
            Mensaje
          </label>
          <textarea
            id="wa-message"
            className="wa-message-input"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="wa-send-link"
            onClick={() => setIsExpanded(false)}
          >
            Enviar
          </a>
        </div>
      )}

      <button
        type="button"
        className={`wa-fab ${isExpanded ? "is-expanded" : ""} ${showActionButtons ? "is-pushed" : ""}`}
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls="wa-message"
        aria-label="Abrir chat de WhatsApp"
      >
        {isExpanded && <span className="wa-fab-label">Whatsapp</span>}
        <svg
          className="wa-fab-icon"
          viewBox="0 0 32 32"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M19.11 17.2c-.25-.12-1.5-.74-1.73-.82-.23-.09-.4-.12-.57.12-.17.25-.65.82-.79.99-.15.17-.29.19-.55.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.1.25-.26.37-.39.12-.13.17-.22.25-.37.09-.15.04-.28-.02-.4-.06-.12-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.58c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.12.16 1.55.1.47-.07 1.5-.61 1.72-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.49-.29ZM16.02 3.2c-7.1 0-12.85 5.75-12.85 12.84 0 2.27.59 4.49 1.71 6.44L3 29l6.7-1.76a12.78 12.78 0 0 0 6.32 1.71h.01c7.09 0 12.84-5.75 12.84-12.84 0-3.43-1.34-6.65-3.77-9.08a12.74 12.74 0 0 0-9.08-3.76Zm0 23.57h-.01a10.7 10.7 0 0 1-5.44-1.49l-.39-.23-3.98 1.04 1.06-3.87-.25-.4a10.7 10.7 0 0 1-1.65-5.76c0-5.92 4.82-10.74 10.75-10.74 2.87 0 5.56 1.12 7.58 3.14a10.65 10.65 0 0 1 3.15 7.58c0 5.92-4.82 10.73-10.74 10.73Z"
          />
        </svg>
      </button>

      <div
        className={`wa-action-buttons ${showActionButtons ? "is-visible" : ""}`}
      >
        <button
          type="button"
          className="wa-action-btn"
          onClick={handleScrollToTop}
          aria-label="Volver al inicio"
          title="Volver al inicio"
        >
          <ArrowUp size={14} />
        </button>
        <button
          type="button"
          className="wa-action-btn"
          onClick={handleFullscreen}
          aria-label="Pantalla completa"
          title="Pantalla completa"
        >
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}
