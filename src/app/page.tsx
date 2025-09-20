import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  Cloud,
  FlaskConical,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 h-16 border-b border-border/20 bg-background/80 px-4 backdrop-blur-sm lg:px-6">
        <div className="flex h-full items-center">
          <Link href="#" className="flex items-center justify-center">
            <Logo className="size-6 text-primary" />
            <span className="ml-3 text-lg font-semibold">
              Syntra
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
            >
              Login
            </Link>
            <Button asChild variant="secondary">
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-40 lg:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1
                    className="glitch text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none"
                    data-text="Inspect and Test Your APIs with AI"
                  >
                    Inspect and Test Your APIs with AI
                  </h1>
                  <p className="max-w-[600px] text-lg text-muted-foreground">
                    Syntra provides AI-powered tools to generate test
                    cases, analyze performance, and ensure your APIs are robust
                    and secure.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="px-8 py-6 text-base">
                    <Link href="/login">Start Testing for Free</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/gopher/600/600"
                alt="Hero"
                width={600}
                height={600}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                data-ai-hint="golang gopher"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-secondary/50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">2,000+</p>
                <p className="font-medium text-muted-foreground">Teams Trust Us</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">1.5M+</p>
                <p className="font-medium text-muted-foreground">Tests Executed Daily</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">99.9%</p>
                <p className="font-medium text-muted-foreground">API Uptime</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">10x</p>
                <p className="font-medium text-muted-foreground">Faster Than Manual</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-muted-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Tools for Modern API Development
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to ship reliable APIs, from automated
                  generation to real-time monitoring.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-2 rounded-lg bg-secondary/50 p-6 transition-transform hover:-translate-y-2">
                <FlaskConical className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">AI Test Generation</h3>
                <p className="text-muted-foreground">
                  Paste your API spec and let our AI generate comprehensive test
                  suites in seconds.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg bg-secondary/50 p-6 transition-transform hover:-translate-y-2">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Real-time Execution</h3>
                <p className="text-muted-foreground">
                  Run your tests and get immediate, detailed feedback on every
                  endpoint.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg bg-secondary/50 p-6 transition-transform hover:-translate-y-2">
                <Activity className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Monitor response times and error rates with beautiful,
                  easy-to-read charts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full bg-secondary/50 py-16 md:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <p className="mx-auto max-w-prose text-2xl font-light md:text-3xl">
                “Syntra has become an indispensable part of our CI/CD
                pipeline. The AI-generated tests catch issues we would have
                missed.”
              </p>
              <div className="flex items-center justify-center gap-3">
                <Image
                  src="https://picsum.photos/seed/ceo/48/48"
                  alt="CEO Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                  data-ai-hint="person portrait"
                />
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">
                    Head of Engineering, TechCorp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to supercharge your API testing?
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Sign up today and start generating tests in minutes. No credit
              card required.
            </p>
            <div className="mt-4">
              <Button asChild size="lg" className="px-8 py-6 text-base">
                <Link href="/login">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full shrink-0 border-t border-border/20 bg-secondary/50">
        <div className="container flex flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 Syntra Inc. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
