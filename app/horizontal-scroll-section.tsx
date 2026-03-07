"use client";

import { ChevronRight, Code, Package, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
        <h2 className="section-heading-center">Nuestras Soluciones</h2>
        <div className="horizontal-scroll-wrapper">
          <div className="horizontal-scroll-cards" ref={scrollRef}>
            {/* Card 1: Productos */}
            <article className="card card-scroll">
              <div className="card-scroll-header">
                <ShoppingCart color="var(--accent)" />
                <h3>Productos</h3>
              </div>
              <p className="lead">
                Láminas de polarizado de alta calidad con protección UV
                avanzada, rechazo térmico superior y oscurecimiento óptico de
                excelencia.
              </p>
              <ul className="scroll-card-list">
                <li>✓ Control solar efectivo</li>
                <li>✓ Protección 99% UV</li>
                <li>✓ Durabilidad garantizada</li>
                <li>✓ Acabado profesional</li>
              </ul>
              <div className="cta-row">
                <Link href="/productos" className="btn-ver">
                  Ver <ChevronRight size={18} />
                </Link>
              </div>
            </article>

            {/* Card 2: Video */}
            <article
              className="card card-scroll"
              style={{ padding: 0, overflow: "hidden" }}
            >
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
                <source
                  src="/scroll/0_Sports_Car_Red_1280x720.mp4"
                  type="video/mp4"
                />
              </video>
            </article>

            {/* Card 3: Marca Blanca */}
            <article className="card card-scroll">
              <div className="card-scroll-header">
                <Package color="var(--accent)" />
                <h3>Marca Blanca</h3>
              </div>
              <p className="lead">
                Desarrollo de productos personalizados bajo tu marca. Soluciones
                completas para emprendedores y distribuidores.
              </p>
              <ul className="scroll-card-list">
                <li>✓ Diseño personalizado</li>
                <li>✓ Volúmenes flexibles</li>
                <li>✓ Soporte técnico full</li>
                <li>✓ Margen competitivo</li>
              </ul>
              <div className="cta-row">
                <Link href="/marca-blanca" className="btn-ver">
                  Ver <ChevronRight size={18} />
                </Link>
              </div>
            </article>

            {/* Card 4: Foto 1 */}
            <article
              className="card card-scroll"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <Image
                src="/scroll/2151948193.jpg"
                alt="Instalación de láminas de polarizado"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </article>

            {/* Card 5: Software */}
            <article className="card card-scroll">
              <div className="card-scroll-header">
                <Code color="var(--accent)" />
                <h3>Software</h3>
              </div>
              <p className="lead">
                Herramienta integral para gestión de instalaciones, inventario y
                cotizaciones. Analytics y reportes en tiempo real.
              </p>
              <ul className="scroll-card-list">
                <li>✓ Gestión de órdenes</li>
                <li>✓ Inventario automático</li>
                <li>✓ Reportes detallados</li>
                <li>✓ Acceso móvil 24/7</li>
              </ul>
              <div className="cta-row">
                <Link href="/software" className="btn-ver">
                  Ver <ChevronRight size={18} />
                </Link>
              </div>
            </article>

            {/* Card 6: Foto 2 */}
            <article
              className="card card-scroll"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <Image
                src="/scroll/5082.jpg"
                alt="Resultado de láminas polarizadas"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </article>
          </div>
          <span className="scroll-hint" aria-hidden="true">
            <ChevronRight size={28} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </section>
  );
}
