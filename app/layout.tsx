import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import HeaderTools from "./header-tools";
import TopContactBar from "./top-contact-bar";
import WhatsappFab from "./whatsapp-fab";
import SiteNav from "./site-nav";
import SiteFooter from "./site-footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr Polarizados | Láminas de Polarizar",
    template: "%s | Dr Polarizados",
  },
  description:
    "Stock permanente y distribución de láminas de polarizar para automotriz, arquitectura y flotas.",
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
      <body
        className={spaceGrotesk.variable}
      >
        <TopContactBar />
        <div className="app-frame">
          <div className="site-shell">
            <header className="site-header">
                <div className="container nav-wrap">
                  <Link href="/" className="brand" aria-label="Ir a inicio">
                    <span className="brand-logo" aria-hidden />
                  </Link>
                  <SiteNav />
                  <HeaderTools />
                </div>
              </header>
              <main>{children}</main>
              <SiteFooter />
              <WhatsappFab />
            </div>
          </div>
      </body>
    </html>
  );
}
