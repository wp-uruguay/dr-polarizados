import Link from "next/link";
import { FinalContactForm } from "./components/FinalContactForm";

export default function FinalContactSection() {
  return (
    <section className="section final-contact-section">
      <div className="container final-contact-container">
        {/* Columna izquierda: Cards apiladas */}
        <div className="final-contact-cards">
          <article className="card final-contact-card">
            <h3>Stock Permanente</h3>
            <p>
              Láminas con trazabilidad de lote, consistencia óptica y disponibilidad para entregas programadas.
            </p>
            <Link href="/productos" className="btn btn-ghost btn-sm">
              Conocer más
            </Link>
          </article>

          <article className="card final-contact-card final-contact-card--highlight">
            <h3>Enfoque B2B</h3>
            <p>
              Planes para talleres, redes de instalación, concesionarios y obras con requerimientos técnicos específicos.
            </p>
            <Link href="/mayoristas" className="btn btn-ghost btn-sm">
              Cotizar ahora
            </Link>
          </article>

          <article className="card final-contact-card">
            <h3>Performance Real</h3>
            <p>
              Control solar, rechazo UV y reducción térmica con opciones por nivel de visibilidad y uso.
            </p>
            <Link href="/productos" className="btn btn-ghost btn-sm">
              Explorar
            </Link>
          </article>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="final-contact-form">
          <h2 className="final-contact-title">Ponte en contacto</h2>
          <p className="final-contact-subtitle">
            Estamos para ayudarte a crecer
          </p>
          
          <FinalContactForm />
        </div>
      </div>
    </section>
  );
}
