import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog de Dr Polarizados con guias y tendencias sobre laminas de polarizar.",
};

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  slug: string;
}

async function getBlogPosts() {
  try {
    const response = await fetch(
      "https://backend.drpolarizados.com/wp-json/wp/v2/posts",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Error fetching posts");
    }

    const posts: BlogPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="card" style={{ cursor: "pointer", height: "100%" }}>
                  <p style={{ color: "#7a7a7a", fontSize: ".82rem" }}>
                    {formatDate(post.date)}
                  </p>
                  <h3 style={{ marginTop: ".25rem" }}>
                    {stripHtml(post.title.rendered)}
                  </h3>
                  <p>{stripHtml(post.excerpt.rendered)}</p>
                </article>
              </Link>
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1" }}>No hay publicaciones disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
}
