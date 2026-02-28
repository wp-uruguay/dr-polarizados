import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import ThemeToggle from "./theme-toggle";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr Polarizados | Laminas de Polarizar",
    template: "%s | Dr Polarizados",
  },
  description:
    "Importacion y distribucion de laminas de polarizar para automotriz, arquitectura y flotas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const saved = localStorage.getItem('dp-theme');
  const theme = saved === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();`,
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
        <div className="site-shell">
          <header className="site-header">
            <div className="container nav-wrap">
              <Link href="/" className="brand" aria-label="Ir a inicio">
                <span className="brand-shield" aria-hidden />
                <span className="brand-copy">
                  <strong>DP</strong>
                  <small>Dr Polarizados</small>
                </span>
              </Link>
              <nav className="site-nav" aria-label="Principal">
                <Link href="/">Home</Link>
                <Link href="/productos">Productos</Link>
                <Link href="/contacto">Contacto</Link>
                <Link href="/blog">Blog</Link>
              </nav>
              <ThemeToggle />
            </div>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <div className="container footer-wrap">
              <p>Dr Polarizados. Importacion y distribucion profesional.</p>
              <p>Montevideo, Uruguay</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
