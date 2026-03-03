"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Monitor, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Slide = {
  kicker: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

const slides: Slide[] = [
  {
    kicker: "Linea Profesional y Nano Carbon en stock inmediato.",
    icon: Shield,
    title: "Mas margen por metro. Mas control de tu negocio.",
    description:
      "Se distribuidor de nuestra marca o crea tu propia marca de laminas con nuestra solucion b2b de marca blanca.",
    image: "/slider/slider1.png",
    primary: { href: "/marca-blanca", label: "Quiero mi propia marca" },
    secondary: { href: "/mayoristas", label: "Condiciones mayoristas" },
  },
  {
    kicker: "Software de gestion a medida para nuestros clientes",
    icon: Monitor,
    title: "Tecnologia para optimizar tu negocio",
    description:
      "Dale a tus clientes una experiencia unica mientras gestionas tu negocio de forma eficiente con nuestro software de gestion y garantias.",
    image: "/slider/slider2.png",
    primary: { href: "/contacto", label: "Solicitar mas info" },
    secondary: { href: "/software", label: "Ver ejemplos de uso" },
  },
  {
    kicker: "Te ayudamos a crecer",
    icon: Monitor,
    title: "Tecnologia premium en polarizados, seguridad y arquitectura.",
    description:
      "Ofrecele a tus clientes un producto de alta calidad, con una experiencia perfecta y un precio razonable.",
    image: "/slider/slider3.webp",
    primary: { href: "/contacto", label: "Contactar" },
    secondary: { href: "/productos", label: "Ver productos" },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 7000; // 7 segundos

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setAutoPlay(false);
    }
  }, []);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (SLIDE_DURATION / 33)); // ~33ms updates
        return next >= 100 ? 100 : next;
      });
    }, 33);

    return () => window.clearInterval(progressInterval);
  }, []);

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  return (
    <section className="hero">
      <div
        className="hero-slider"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <div className="hero-viewport" aria-live="polite">
          <button
            type="button"
            onClick={prev}
            className="hero-arrow hero-arrow-left"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={next}
            className="hero-arrow hero-arrow-right"
            aria-label="Slide siguiente"
          >
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>

          <div
            className="hero-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            role="region"
            aria-label="Presentacion de Dr Polarizados"
          >
            {slides.map((slide, slideIndex) => (
              <article
                className="hero-slide"
                key={slide.title}
                aria-hidden={slideIndex !== index}
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,.72)), url('${slide.image}')`,
                }}
              >
                <div className="container hero-slide-inner">
                  <span className="kicker">
                    <slide.icon size={16} strokeWidth={2.1} aria-hidden />
                    {slide.kicker}
                  </span>
                  <h1>{slide.title}</h1>
                  <p className="lead">{slide.description}</p>
                  <div className="cta-row">
                    <Link href={slide.primary.href} className="btn btn-primary">
                      {slide.primary.label}
                    </Link>
                    <Link href={slide.secondary.href} className="btn btn-ghost">
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      
      <div className="hero-progress-bar">
        <div 
          className="hero-progress-fill"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
