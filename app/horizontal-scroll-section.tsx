"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Package, Code } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HorizontalScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      /* Only hijack if there's room to scroll horizontally */
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      /* If scrolling down and not at the end, or scrolling up and not at start → hijack */
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 3;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Nuestras Soluciones
        </h2>
        <div className="horizontal-scroll-wrapper">
        <div className="horizontal-scroll-cards" ref={scrollRef}>
        {/* Card 1: Productos Premium */}
        <article className="card card-scroll">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <ShoppingCart size={24} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>Productos Premium</h3>
          </div>
          <p className="lead">
            Láminas de polarizado de alta calidad con protección UV avanzada, rechazo térmico superior y oscurecimiento óptico de excelencia.
          </p>
          <ul style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1rem" }}>
            <li>✓ Control solar efectivo</li>
            <li>✓ Protección 99% UV</li>
            <li>✓ Durabilidad garantizada</li>
            <li>✓ Acabado profesional</li>
          </ul>
          <div className="cta-row">
            <Link href="/productos" className="btn btn-ghost">
              Explorar productos
            </Link>
          </div>
        </article>

        {/* Card 2: Video */}
        <article className="card card-scroll" style={{ padding: 0, overflow: "hidden" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/scroll/0_Sports_Car_Red_1280x720.mp4" type="video/mp4" />
          </video>
        </article>

        {/* Card 3: Marca Blanca */}
        <article className="card card-scroll">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Package size={24} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>Marca Blanca</h3>
          </div>
          <p className="lead">
            Desarrollo de productos personalizados bajo tu marca. Soluciones completas para emprendedores y distribuidores.
          </p>
          <ul style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1rem" }}>
            <li>✓ Diseño personalizado</li>
            <li>✓ Volúmenes flexibles</li>
            <li>✓ Soporte técnico full</li>
            <li>✓ Margen competitivo</li>
          </ul>
          <div className="cta-row">
            <Link href="/marca-blanca" className="btn btn-ghost">
              Cotizar ahora
            </Link>
          </div>
        </article>

        {/* Card 4: Foto 1 */}
        <article className="card card-scroll" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src="/scroll/2151948193.jpg"
            alt="Instalación de láminas de polarizado"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </article>

        {/* Card 5: Software */}
        <article className="card card-scroll">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Code size={24} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>Software</h3>
          </div>
          <p className="lead">
            Herramienta integral para gestión de instalaciones, inventario y cotizaciones. Analytics y reportes en tiempo real.
          </p>
          <ul style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1rem" }}>
            <li>✓ Gestión de órdenes</li>
            <li>✓ Inventario automático</li>
            <li>✓ Reportes detallados</li>
            <li>✓ Acceso móvil 24/7</li>
          </ul>
          <div className="cta-row">
            <Link href="/software" className="btn btn-ghost">
              Conocer más
            </Link>
          </div>
        </article>

        {/* Card 6: Foto 2 */}
        <article className="card card-scroll" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src="/scroll/5082.jpg"
            alt="Resultado de láminas polarizadas"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </article>
      </div>
      </div>
      </div>
    </section>
  );
}
