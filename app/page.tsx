import Link from "next/link";
import HeroSlider from "./hero-slider";
import PremiumProductsSection from "./premium-products-section";
import HorizontalScrollSection from "./horizontal-scroll-section";
import type { PremiumCard } from "./premium-products-section";

const topCards: PremiumCard[] = [
  {
    title: "Seguridad",
    description:
      "Laminas de seguridad de alta resistencia para proteger el vehiculo de tu cliente con un producto premium.",
    icon: "shield",
    href: "/productos#seguridad",
  },
  {
    title: "Polarizados",
    description:
      "Control solar, rechazo UV y reduccion termica con opciones por nivel de visibilidad y uso.",
    icon: "car",
    href: "/productos#polarizados",
  },
  {
    title: "PPF",
    description:
      "Proteccion transparente de pintura con tecnologia avanzada contra rayos UV y daños externos.",
    icon: "car",
    href: "/productos#ppf",
  },
  {
    title: "Arquitectura",
    description:
      "Seguridad y control solar para arquitectura de alta calidad.",
    icon: "building2",
    href: "/productos#arquitectura",
  },
];

export default function Home() {
  return (
    <div>
      <HeroSlider />

      <PremiumProductsSection cards={topCards} />

      <section className="section direct-solutions">
        <video autoPlay className="direct-solutions-video" loop muted playsInline>
          <source src="/videos/tercera.mp4" type="video/mp4" />
        </video>

        <div className="direct-solutions-overlay" aria-hidden />

        <div className="container direct-solutions-inner">
          <div className="direct-solutions-copy">
            <h2>Soluciones Directas</h2>
            <h3>Si instalás, sabés esto:</h3>
            <p>
              El margen se achica y el stock se desordena.
              <br />
              No sabés cuánto ganás realmente por metro ni por rollo.
              <br />
              Cambiar de proveedor es un riesgo.
              <br />
              DP te ofrece una solución profesional para todo eso.
            </p>

            <div className="cta-row">
              <Link href="/contacto" className="btn btn-primary">
                Contactar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HorizontalScrollSection />

      <PremiumProductsSection />
    </div>
  );
}
