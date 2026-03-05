"use client";

import Link from "next/link";
import { ChevronDown, ShoppingCart, Users, Package } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function SiteNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const openMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown("productos");
  };

  const closeMenu = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMenu = () => {
    setOpenDropdown((prev) => (prev === "productos" ? null : "productos"));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpenDropdown(null);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOpen = openDropdown === "productos";

  return (
    <nav className="site-nav" aria-label="Principal">
      <Link href="/">Home</Link>

      <div
        className="nav-dropdown"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        onKeyDown={handleKeyDown}
        ref={dropdownRef}
      >
        <button
          className="nav-dropdown-toggle"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="productos-megamenu"
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem",
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: 600,
          }}
        >
          Productos
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {isOpen && (
          <div id="productos-megamenu" className="nav-megamenu" role="menu">
            {productItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="megamenu-item"
                  role="menuitem"
                  onClick={() => setOpenDropdown(null)}
                >
                  <div className="megamenu-icon" aria-hidden="true">
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
