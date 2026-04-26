import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Chatbot } from '@/components/chatbot'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Techvix.org - Digital Solutions & Web Development',
  description: 'Professional digital solutions including web development, cybersecurity, graphic design, and AI services. Transform your business with cutting-edge technology.',
  generator: 'v0.app',
  metadataBase: new URL('https://techvix.org'),
  openGraph: {
    title: 'Techvix.org - Digital Solutions & Web Development',
    description: 'Professional digital solutions including web development, cybersecurity, graphic design, and AI services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techvix.org - Digital Solutions & Web Development',
    description: 'Professional digital solutions including web development, cybersecurity, graphic design, and AI services.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="font-sans antialiased">
        {children}
        <Chatbot />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
