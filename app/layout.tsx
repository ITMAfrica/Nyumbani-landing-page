import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/Footer";
import { I18nProvider, type Lang } from "@/lib/i18n";
import { LangAttributeUpdater } from "@/components/LangAttributeUpdater";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Nyumbani Landing Page",
    template: "%s | Nyumbani Landing Page",
  },
  description:
    "Exclusive tier of the Nyumbani brand, designed for investors who want access to Nairobi's most promising real estate opportunities.",
};

/**
 * Read the user's language cookie on the server so the SSR output matches
 * what the client will render from localStorage, avoiding hydration mismatches.
 */
async function getInitialLang(): Promise<Lang> {
  try {
    const cookieStore = await cookies();
    const lang = cookieStore.get("nyumbani-lang")?.value;
    if (lang === "en" || lang === "fr") return lang;
  } catch {
    // `cookies()` may throw if called outside a request context (e.g. static
    // generation).  Fall back to 'en'.
  }
  return "en";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLang = await getInitialLang();

  return (
    <html
      lang={initialLang}
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans font-light antialiased"
      >
        <I18nProvider initialLang={initialLang}>
          <LangAttributeUpdater />
          {children}
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
