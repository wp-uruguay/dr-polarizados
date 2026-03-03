import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ShareTab from "./share-tab";

interface FeaturedImage {
  id: number;
  source_url: string;
}

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
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedImage[];
  };
}

async function getBlogPost(slug: string) {
  try {
    const response = await fetch(
      `https://backend.drpolarizados.com/wp-json/wp/v2/posts?slug=${slug}&_embed=wp:featuredmedia`,
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

async function getBlogPosts() {
  try {
    const response = await fetch(
      "https://backend.drpolarizados.com/wp-json/wp/v2/posts?per_page=100",
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

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateReadingTime(htmlContent: string): number {
  const plainText = htmlContent.replace(/<[^>]*>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return Math.max(1, readingTime);
}

function getFeaturedImage(post: BlogPost): string | null {
  if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

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

  const featuredImage = getFeaturedImage(post);
  const readingTime = calculateReadingTime(post.content.rendered);

  return (
    <>
      {/* Hero Section */}
      <div
        className="blog-post-hero"
        style={{
          width: "100%",
          height: "500px",
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${featuredImage || "var(--surface)"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "2rem",
          marginTop: "calc(var(--top-bar-h) * -1)",
          paddingTop: "calc(2rem + var(--top-bar-h) + var(--header-h))",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 8vw, 4rem)",
              fontWeight: "800",
              margin: 0,
              lineHeight: "1.2",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            {post.title.rendered}
          </h1>
        </div>
      </div>

      {/* Info Bar */}
      <div
        style={{
          background: "var(--accent)",
          color: "#111111",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          fontSize: "0.9rem",
          fontWeight: "600",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <span>{formatDate(post.date)}</span>
        </div>
        <div style={{ opacity: 0.6 }}>•</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <span>{readingTime} min de lectura</span>
        </div>
        <div style={{ opacity: 0.6 }}>•</div>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Inicio
          </Link>
          <ChevronRight size={14} />
          <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>
            Blog
          </Link>
          <ChevronRight size={14} />
          <span style={{ opacity: 0.7 }}>{post.title.rendered.substring(0, 30)}...</span>
        </nav>
      </div>

      {/* Content Section */}
      <section className="section">
        <ShareTab slug={slug} title={post.title.rendered} />
        <div className="container" style={{ maxWidth: "800px" }}>
          <article>
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
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
