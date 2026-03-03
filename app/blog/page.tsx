import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog de Dr Polarizados con guias y tendencias sobre laminas de polarizar.",
};

interface FeaturedImage {
  id: number;
  source_url: string;
}

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
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedImage[];
  };
}

async function getBlogPosts() {
  try {
    const response = await fetch(
      "https://backend.drpolarizados.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia",
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

function getFeaturedImage(post: BlogPost): string | null {
  if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
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
            posts.map((post) => {
              const featuredImage = getFeaturedImage(post);
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article className="card blog-card" style={{ cursor: "pointer", height: "100%", overflow: "hidden" }}>
                    {featuredImage && (
                      <div className="blog-card-image">
                        <img 
                          src={featuredImage} 
                          alt={stripHtml(post.title.rendered)}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="blog-card-content">
                      <p style={{ color: "#7a7a7a", fontSize: ".82rem", margin: 0 }}>
                        {formatDate(post.date)}
                      </p>
                      <h3 style={{ marginTop: ".5rem", marginBottom: ".25rem" }}>
                        {stripHtml(post.title.rendered)}
                      </h3>
                      <p style={{ margin: 0 }}>{stripHtml(post.excerpt.rendered)}</p>
                    </div>
                  </article>
                </Link>
              );
            })
          ) : (
            <p style={{ gridColumn: "1 / -1" }}>No hay publicaciones disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
}
