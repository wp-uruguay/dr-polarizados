import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  slug: string;
  author: number;
}

async function getBlogPost(slug: string) {
  try {
    const response = await fetch(
      `https://backend.drpolarizados.com/wp-json/wp/v2/posts?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Error fetching post");
    }

    const posts: BlogPost[] = await response.json();

    if (posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post no encontrado",
      description: "El post que buscas no existe",
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <h1>Post no encontrado</h1>
            <p>Lo sentimos, el post que buscas no existe o ha sido eliminado.</p>
            <Link href="/blog" style={{ color: "var(--accent)" }}>
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--accent-strong)",
            marginBottom: "2rem",
            textDecoration: "none",
          }}
        >
          <ChevronLeft size={18} />
          Volver al blog
        </Link>

        <article>
          <header style={{ marginBottom: "2rem" }}>
            <p style={{ color: "var(--muted)", fontSize: ".9rem", marginBottom: "0.5rem" }}>
              {formatDate(post.date)}
            </p>
            <h1 style={{ marginTop: 0 }}>{post.title.rendered}</h1>
          </header>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            style={{
              fontSize: "1rem",
              lineHeight: "1.8",
              color: "var(--ink)",
            }}
          />
        </article>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--line)",
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--accent-strong)",
              textDecoration: "none",
            }}
          >
            <ChevronLeft size={18} />
            Volver al blog
          </Link>
        </div>
      </div>
    </section>
  );
}
