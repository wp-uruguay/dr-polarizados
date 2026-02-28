const premiumCards = [
  {
    title: "Importacion directa",
    description:
      "Laminas con trazabilidad de lote, consistencia optica y disponibilidad para entregas programadas.",
    highlight: false,
  },
  {
    title: "Enfoque B2B",
    description:
      "Planes para talleres, redes de instalacion, concesionarios y obras con requerimientos tecnicos especificos.",
    highlight: true,
  },
  {
    title: "Performance real",
    description:
      "Control solar, rechazo UV y reduccion termica con opciones por nivel de visibilidad y uso.",
    highlight: false,
  },
];

export default function PremiumProductsSection() {
  const loopCards = [...premiumCards, ...premiumCards];

  return (
    <section className="section">
      <div className="container premium-products">
        <h2 className="premium-title">Productos premium</h2>

        <div className="premium-grid">
          {premiumCards.map((card) => (
            <article
              className={`card${card.highlight ? " highlight" : ""}`}
              key={card.title}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <div className="premium-carousel-shell" aria-label="Productos premium">
          <div className="premium-carousel-track">
            {loopCards.map((card, idx) => (
              <article
                className={`card premium-card${card.highlight ? " highlight" : ""}`}
                key={`${card.title}-${idx}`}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
