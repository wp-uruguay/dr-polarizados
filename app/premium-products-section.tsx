"use client";

import { Building2, Car, ChevronRight, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type PremiumCardIcon = "shield" | "car" | "building2" | "zap";

export type PremiumCard = {
  title: string;
  description: string;
  highlight?: boolean;
  icon?: PremiumCardIcon;
  href?: string;
};

const iconMap = {
  building2: Building2,
  car: Car,
  shield: Shield,
  zap: Zap,
} as const;

const defaultPremiumCards: PremiumCard[] = [
  {
    title: "Stock permanente",
    description:
      "Láminas con trazabilidad de lote, consistencia óptica y disponibilidad para entregas programadas.",
    highlight: false,
  },
  {
    title: "Enfoque B2B",
    description:
      "Planes para talleres, redes de instalación, concesionarios y obras con requerimientos técnicos específicos.",
    highlight: true,
  },
  {
    title: "Performance real",
    description:
      "Control solar, rechazo UV y reducción térmica con opciones por nivel de visibilidad y uso.",
    highlight: false,
  },
];

type PremiumProductsSectionProps = {
  title?: string;
  cards?: PremiumCard[];
};

export default function PremiumProductsSection({
  title = "Productos",
  cards = defaultPremiumCards,
}: PremiumProductsSectionProps) {
  const loopCards = [...cards, ...cards];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section premium-products-section${isVisible ? " premium-products--visible" : ""}`}
    >
      <div className="container premium-products">
        <h2 className="premium-title">{title}</h2>

        <div className="premium-grid">
          {cards.map((card) => {
            const Icon = card.icon ? iconMap[card.icon] : null;

            return (
              <article
                className={`card premium-card-item${card.highlight ? " highlight" : ""}`}
                key={card.title}
              >
                {Icon ? (
                  <span className="premium-card-icon" aria-hidden>
                    <Icon size={22} />
                  </span>
                ) : null}
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {card.href && (
                  <Link href={card.href} className="premium-card-link">
                    <ChevronRight size={16} />
                    Ver
                  </Link>
                )}
              </article>
            );
          })}
        </div>

        <section className="premium-carousel-shell" aria-label="Productos">
          <div className="premium-carousel-track">
            {loopCards.map((card, idx) => {
              const Icon = card.icon ? iconMap[card.icon] : null;

              return (
                <article
                  className={`card premium-card premium-card-item${card.highlight ? " highlight" : ""}`}
                  key={`${card.title}-${idx}`}
                >
                  {Icon ? (
                    <span className="premium-card-icon" aria-hidden>
                      <Icon size={20} />
                    </span>
                  ) : null}
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.href && (
                    <Link href={card.href} className="premium-card-link">
                      <ChevronRight size={16} />
                      Ver
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
