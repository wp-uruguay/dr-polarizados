import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Principal">
      <Link href="/">Home</Link>
      <Link href="/productos">Productos</Link>
      <Link href="/mayoristas">Mayoristas</Link>
      <Link href="/marca-blanca">Marca Blanca</Link>
      <Link href="/software">Software</Link>
      <Link href="/contacto">Contacto</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
