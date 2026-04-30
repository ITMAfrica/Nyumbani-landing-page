import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SiteFooter } from '@/components/Footer';
import { I18nProvider } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'Nyumbani Landing Page',
    template: '%s | Nyumbani Landing Page',
  },
  description: 'Exclusive tier of the Nyumbani brand, designed for investors who want access to Nairobi\'s most promising real estate opportunities.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans font-light antialiased">
        <I18nProvider>
          {children}
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
