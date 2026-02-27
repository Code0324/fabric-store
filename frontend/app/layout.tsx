import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AL Imran Fabrics | Premium Pakistani Fabrics',
  description:
    'Discover premium Pakistani fabrics for mens and womens wear. Shop stitched, unstitched, lawn, chiffon, and linen fabrics with free nationwide delivery.',
  keywords: 'Pakistani fabrics, stitched wear, unstitched fabric, lawn, chiffon, linen, womens wear, mens wear',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0A0A0A',
  metadataBase: new URL('https://alimranfabrics.com'),
  openGraph: {
    title: 'AL Imran Fabrics | Premium Pakistani Fabrics',
    description: 'Premium quality Pakistani fabrics for every occasion',
    url: 'https://alimranfabrics.com',
    siteName: 'AL Imran Fabrics',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AL Imran Fabrics',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-charcoal text-cream">{children}</body>
    </html>
  );
}
