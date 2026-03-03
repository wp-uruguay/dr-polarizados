"use client";

import Link from "next/link";
import { ChevronDown, ShoppingCart, Users, Package, Glasses } from "lucide-react";
import { useState, useRef } from "react";

export default function SiteNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const productItems = [
    {
      href: "/productos",
      title: "Ver Catálogo",
      description: "Explorar todos nuestros productos",
      icon: ShoppingCart,
    },
    {
      href: "/mayoristas",
      title: "Para Mayoristas",
      description: "Soluciones para distribuidores y revendedores",
      icon: Users,
    },
    {
      href: "/marca-blanca",
      title: "Marca Blanca",
      description: "Personalizamos productos con tu marca",
      icon: Package,
    },
  ];

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenDropdown("productos");
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <nav className="site-nav" aria-label="Principal">
      <Link href="/">Home</Link>
      
      <div
        className="nav-dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        <button
          className="nav-dropdown-toggle"
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem",
            fontSize: "1rem",
            fontFamily: "inherit",
          }}
        >
          Productos
          <ChevronDown
            size={16}
            style={{
              transform: openDropdown === "productos" ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {openDropdown === "productos" && (
          <div className="nav-megamenu">
            {productItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.href} href={item.href} className="megamenu-item">
                  <div className="megamenu-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="megamenu-content">
                    <h3 className="megamenu-title">{item.title}</h3>
                    <p className="megamenu-description">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Link href="/software">Software</Link>

      <Link href="/contacto">Contacto</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
