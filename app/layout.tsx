import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trompette SaaS - Manage Your Choir, Grow Your Ministry',
  description: 'An all-in-one platform for worship teams, choirs and churches. Manage members, track attendance, plan worship, and grow your ministry.',
  keywords: ['choir management', 'church software', 'worship planning', 'gospel choir', 'ministry management'],
  authors: [{ name: 'Trompette SaaS' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trompette-saas.com',
    siteName: 'Trompette SaaS',
    title: 'Trompette SaaS - Manage Your Choir, Grow Your Ministry',
    description: 'An all-in-one platform for worship teams, choirs and churches.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trompette SaaS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trompette SaaS - Manage Your Choir, Grow Your Ministry',
    description: 'An all-in-one platform for worship teams, choirs and churches.',
    images: ['/og-image.png'],
    creator: '@trompette_saas',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
