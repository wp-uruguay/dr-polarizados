import Link from "next/link";

export default function FinalContactSection() {
  return (
    <section className="section final-contact-section">
      <h2 className="section-title" style={{ marginBottom: "3rem" }}>Productos premium</h2>
      
      <div className="container final-contact-container">
        {/* Columna izquierda: Cards apiladas */}
        <div className="final-contact-cards">
          <article className="card final-contact-card">
            <h3>Importación Directa</h3>
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
          <h3 style={{ marginBottom: "0.5rem" }}>Ponte en contacto</h3>
          <p style={{ marginBottom: "2rem", color: "var(--muted)" }}>
            Estamos para ayudarte a crecer
          </p>
          
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+54 9 XXXX XXXX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Tu empresa"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Cuéntanos como podemos ayudarte..."
                rows={5}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
