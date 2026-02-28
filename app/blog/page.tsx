import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog de Dr Polarizados con guias y tendencias sobre laminas de polarizar.",
};

const posts = [
  {
    title: "Como elegir el VLT correcto para cada vehiculo",
    excerpt:
      "Resumen practico para recomendar transparencia segun uso, ciudad y nivel de confort esperado.",
    date: "Febrero 2026",
  },
  {
    title: "Errores comunes al instalar laminas en vidrio curvo",
    excerpt:
      "Buenas practicas para reducir retrabajos y mejorar terminacion en instalaciones exigentes.",
    date: "Enero 2026",
  },
  {
    title: "Tendencias en control solar para oficinas y retail",
    excerpt:
      "Que estan pidiendo hoy los proyectos arquitectonicos y como cotizar valor, no solo precio.",
    date: "Enero 2026",
  },
];

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="kicker">Blog tecnico</span>
        <h1>Contenido para clientes e instaladores.</h1>
        <p className="lead">
          Base inicial de entradas para posicionar marca y autoridad en el
          nicho. Luego ajustamos tono, keywords y calendario editorial.
        </p>

        <div className="grid grid-3" style={{ marginTop: "1.6rem" }}>
          {posts.map((post) => (
            <article className="card" key={post.title}>
              <p style={{ color: "#7a7a7a", fontSize: ".82rem" }}>{post.date}</p>
              <h3 style={{ marginTop: ".25rem" }}>{post.title}</h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
