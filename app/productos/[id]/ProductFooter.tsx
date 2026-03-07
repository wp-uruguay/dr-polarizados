"use client";

import { Check, Facebook, Link2, Linkedin } from "lucide-react";
import { useState } from "react";
import XIcon from "../../components/XIcon";

interface ProductFooterShareProps {
  productId: number;
  title: string;
}

export function ProductFooterShare({
  productId,
  title,
}: ProductFooterShareProps) {
  const [copied, setCopied] = useState(false);

  const productUrl = `https://drpolarizados.com/productos/${productId}`;
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedTitle = encodeURIComponent(title);

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
      icon: XIcon,
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
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = productUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="product-footer-share">
      <span className="product-footer-share-label">Compartir</span>
      <div className="product-footer-share-icons">
        {shareLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="product-share-icon"
              title={link.label}
              aria-label={`Compartir en ${link.label}`}
            >
              <IconComponent size={18} />
            </a>
          );
        })}
        <button
          type="button"
          className={`product-share-icon ${copied ? "product-share-icon--copied" : ""}`}
          onClick={handleCopyLink}
          title={copied ? "¡Enlace copiado!" : "Copiar enlace"}
          aria-label="Copiar enlace"
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
      </div>
    </div>
  );
}
