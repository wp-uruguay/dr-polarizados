"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;

    if (!container || !scroller) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isActive) return;

      // Solo interceptar cuando la sección está activa
      const sectionRect = container.getBoundingClientRect();
      const isInView =
        sectionRect.top <= window.innerHeight / 2 &&
        sectionRect.bottom >= window.innerHeight / 2;

      if (isInView && scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth) {
        e.preventDefault();
        scroller.scrollLeft += e.deltaY;
      }
    };

    const handleScroll = () => {
      const sectionRect = container.getBoundingClientRect();
      const isInView =
        sectionRect.top <= window.innerHeight / 2 &&
        sectionRect.bottom >= window.innerHeight / 2;

      setIsActive(isInView);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  return (
    <section
      ref={containerRef}
      className="section sticky-scroll-section"
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Soluciones por segmento
      </h2>
      <div ref={scrollerRef} className="horizontal-scroll-cards">
        <article className="card card-scroll">
          <h3>Card 1</h3>
          <p className="lead">Contenido de la tarjeta 1</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-ghost">
              Explorar
            </Link>
          </div>
        </article>
        <article className="card card-scroll">
          <h3>Card 2</h3>
          <p className="lead">Contenido de la tarjeta 2</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-ghost">
              Explorar
            </Link>
          </div>
        </article>
        <article className="card card-scroll">
          <h3>Card 3</h3>
          <p className="lead">Contenido de la tarjeta 3</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-ghost">
              Explorar
            </Link>
          </div>
        </article>
        <article className="card card-scroll">
          <h3>Card 4</h3>
          <p className="lead">Contenido de la tarjeta 4</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-ghost">
              Explorar
            </Link>
          </div>
        </article>
        <article className="card card-scroll">
          <h3>Card 5</h3>
          <p className="lead">Contenido de la tarjeta 5</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-ghost">
              Explorar
            </Link>
          </div>
        </article>
        <article className="card card-scroll">
          <h3>Card 6</h3>
          <p className="lead">Contenido de la tarjeta 6</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-ghost">
              Explorar
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
