import { CircleCheck } from "lucide-react";
import Link from "next/link";
import AutosCarousel from "./components/AutosCarousel";
import FinalContactSection from "./final-contact-section";
import HeroSlider from "./hero-slider";
import HorizontalScrollSection from "./horizontal-scroll-section";
import type { PremiumCard } from "./premium-products-section";
import PremiumProductsSection from "./premium-products-section";

const topCards: PremiumCard[] = [
  {
    title: "Seguridad",
    description:
      "Láminas de seguridad de alta resistencia para proteger el vehículo de tu cliente con un producto premium.",
    icon: "shield",
    href: "/productos#seguridad-vehicular",
    bg: "/autos/1233.jpg",
  },
  {
    title: "Polarizados",
    description:
      "Control solar, rechazo UV y reducción térmica con opciones por nivel de visibilidad y uso.",
    icon: "car",
    href: "/productos#polarizado-vehicular",
    bg: "/autos/5082.jpg",
  },
  {
    title: "PPF",
    description:
      "Protección transparente de pintura con tecnología avanzada contra rayos UV y daños externos.",
    icon: "zap",
    href: "/productos#ppf",
    bg: "/ppf.jpg",
  },
  {
    title: "Arquitectura",
    description: "Seguridad y control solar para arquitectura de alta calidad.",
    icon: "building2",
    href: "/productos#arquitectura",
    bg: "https://backend.drpolarizados.com/wp-content/uploads/2026/03/9019.jpg",
  },
];

export default function Home() {
  return (
    <div>
      <HeroSlider />

      <PremiumProductsSection cards={topCards} />

      <section className="section direct-solutions">
        <video
          autoPlay
          className="direct-solutions-video"
          loop
          muted
          playsInline
        >
          <source src="/videos/tercera.mp4" type="video/mp4" />
        </video>

        <div className="direct-solutions-overlay" aria-hidden />

        <div className="container direct-solutions-inner">
          <div className="direct-solutions-copy">
            <h2>Soluciones Directas</h2>
            <h3>Si instalás, sabés esto:</h3>
            <ul className="check-list">
              <li>
                <CircleCheck size={20} strokeWidth={2.2} aria-hidden /> Querés
                mejores márgenes y un stock que no te dé dolores de cabeza.
              </li>
              <li>
                <CircleCheck size={20} strokeWidth={2.2} aria-hidden />{" "}
                Necesitás saber exactamente cuánto ganás por metro y por rollo.
              </li>
              <li>
                <CircleCheck size={20} strokeWidth={2.2} aria-hidden /> Y
                merecés un proveedor que sea un verdadero aliado de tu negocio.
              </li>
            </ul>
            <p>En DR trabajamos para que todo eso sea posible.</p>

            <div className="cta-row">
              <Link href="/contacto" className="btn btn-primary">
                Contactar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HorizontalScrollSection />

      <FinalContactSection />

      <div
        className="autos-carousel-fullwidth"
        style={{ marginBottom: 0, paddingBottom: 0 }}
      >
        <AutosCarousel />
      </div>
    </div>
  );
}
