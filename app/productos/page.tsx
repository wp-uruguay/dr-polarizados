import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Lineas de laminas de polarizar de Dr Polarizados para automotriz y arquitectura.",
};

const categories = [
  {
    title: "Serie Auto Carbon",
    detail:
      "Equilibrio entre estetica y control termico para vehiculos particulares y flotas.",
  },
  {
    title: "Serie Auto Ceramic Pro",
    detail:
      "Mayor rechazo de calor con estabilidad de color para clientes exigentes y alta exposicion solar.",
  },
  {
    title: "Serie Arquitectonica Reflect",
    detail:
      "Reduccion de ganancia solar para oficinas, vidrieras y frentes con alta carga termica.",
  },
  {
    title: "Serie Seguridad Shield",
    detail:
      "Refuerzo de vidrio para puntos de venta, corporativo y sectores con control de impacto.",
  },
  {
    title: "Accesorios de instalacion",
    detail:
      "Squeegees, cutters, removedores y consumibles para equipos con volumen continuo.",
  },
  {
    title: "Formatos comerciales",
    detail:
      "Rollos por metro lineal, presentaciones por caja y disponibilidad para reposicion semanal.",
  },
];

export default function ProductosPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="kicker">Catalogo DP</span>
        <h1>Lineas de producto para instalacion profesional.</h1>
        <p className="lead">
          Esta estructura es inicial para definir el contenido final. Podemos
          ajustar nombres comerciales, fichas y especificaciones por cada linea.
        </p>

        <div className="grid grid-3" style={{ marginTop: "1.6rem" }}>
          {categories.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
