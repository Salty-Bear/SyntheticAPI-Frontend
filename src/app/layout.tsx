import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/theme-context';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: 'Syntra',
  description: 'Inspect and test your APIs with AI-powered tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Syntra Logo and SEO Meta Tags */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="API, Syntra, AI, API Testing, API Inspector, Developer Tools, OpenAPI, REST, GraphQL, Postman Alternative" />
        <meta name="author" content="Syntra Team" />
        <meta property="og:title" content="Syntra" />
        <meta property="og:description" content="Inspect and test your APIs with AI-powered tools." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://syntra.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Syntra" />
        <meta name="twitter:description" content="Inspect and test your APIs with AI-powered tools." />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="syntra-ui-theme">
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
