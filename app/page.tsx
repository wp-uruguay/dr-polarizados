import Link from "next/link";
import HeroSlider from "./hero-slider";
import PremiumProductsSection from "./premium-products-section";

export default function Home() {
  return (
    <div>
      <HeroSlider />

      <PremiumProductsSection />

      <section className="section">
        <div className="container grid grid-2">
          <article className="card">
            <h2>Soluciones por segmento</h2>
            <p className="lead">
              Portfolio simplificado para cotizar rapido: automotriz, edificios
              corporativos y proyectos de flota.
            </p>
            <div className="cta-row">
              <Link href="/productos" className="btn btn-ghost">
                Explorar productos
              </Link>
            </div>
          </article>
          <article className="card">
            <h2>Capacitacion y soporte</h2>
            <p className="lead">
              Acompanamos a instaladores con fichas tecnicas, recomendaciones
              de aplicacion y criterios de venta.
            </p>
            <div className="cta-row">
              <Link href="/blog" className="btn btn-ghost">
                Leer guias del blog
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
