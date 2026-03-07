"use client";

import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";

interface ShareTabProps {
  slug: string;
  title: string;
}

export default function ShareTab({ slug, title }: ShareTabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const postUrl = `https://drpolarizados.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title.replace(/<[^>]*>/g, ""));

  const shareLinks = [
    {
      id: "facebook",
      icon: Facebook,
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2",
    },
    {
      id: "twitter",
      icon: Twitter,
      label: "X",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#ffffff",
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0A66C2",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`,
      color: "#EA4335",
    },
  ];

  return (
    <>
      {/* Share Tab Floating Button */}
      <div className="share-tab-container">
        <button
          type="button"
          className="share-tab-button"
          onClick={() => setIsOpen(!isOpen)}
          title="Compartir"
          aria-label="Compartir en redes sociales"
        >
          <Share2 size={20} />
        </button>

        {/* Overlay */}
        {isOpen && (
          <button
            type="button"
            className="share-overlay"
            aria-label="Cerrar menú de compartir"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Share Menu */}
        {isOpen && (
          // biome-ignore lint/a11y/noStaticElementInteractions: stop propagation only
          // biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation only
          <div className="share-menu" onClick={(e) => e.stopPropagation()}>
            {shareLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link"
                  style={
                    {
                      "--share-color": link.color,
                    } as React.CSSProperties
                  }
                  title={`Compartir en ${link.label}`}
                >
                  <IconComponent size={18} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
