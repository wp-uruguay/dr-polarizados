"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SiteNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="site-nav" aria-label="Principal">
      <Link href="/">Home</Link>
      
      <div
        className="nav-dropdown"
        onMouseEnter={() => setOpenDropdown("productos")}
        onMouseLeave={() => setOpenDropdown(null)}
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
          <div
            className="nav-dropdown-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "0.5rem",
              marginTop: "0.5rem",
              minWidth: "200px",
              zIndex: 100,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Link
              href="/productos"
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "inherit",
                textDecoration: "none",
                borderBottom: "1px solid var(--line)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Ver catálogo
            </Link>
            <Link
              href="/mayoristas"
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "inherit",
                textDecoration: "none",
                borderBottom: "1px solid var(--line)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Para mayoristas
            </Link>
            <Link
              href="/marca-blanca"
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "inherit",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Marca Blanca
            </Link>
          </div>
        )}
      </div>

      <Link href="/software">Software</Link>

      <Link href="/contacto">Contacto</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
