import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  Cloud,
  Code,
  FlaskConical,
  GitBranch,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 h-16 border-b border-border/40 bg-background/80 px-4 backdrop-blur-sm lg:px-6">
        <div className="flex h-full items-center">
          <Link href="#" className="flex items-center justify-center">
            <Logo className="size-8 text-primary" />
            <span className="ml-3 text-xl font-bold text-primary">
              Syntra
            </span>
          </Link>
          <nav className="ml-10 hidden items-center gap-6 text-sm font-medium lg:flex">
            <Link
              href="#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/documentation"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-40 lg:py-48 grid-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                <Zap className="mr-2 inline size-4" />
                Now powered by Gemini 2.5
              </div>
              <h1
                className="mt-6 text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground sm:text-6xl xl:text-7xl/none"
              >
                Intelligent API Testing,{' '}
                <span className="glitch" data-text="Automated.">
                  Automated.
                </span>
              </h1>
              <p className="mt-6 max-w-[600px] mx-auto text-lg text-muted-foreground">
                Syntra is the AI-native platform for comprehensive API testing.
                Generate tests from specs, monitor performance, and ship with
                confidence.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/login">Start Testing for Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/documentation">Read Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full border-y border-border/40 bg-secondary/20 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">10x</p>
                <p className="font-medium text-muted-foreground">
                  Faster Test Creation
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">40%</p>
                <p className="font-medium text-muted-foreground">
                  Reduction in Bugs
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">2M+</p>
                <p className="font-medium text-muted-foreground">
                  Tests Run Daily
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary">99.99%</p>
                <p className="font-medium text-muted-foreground">
                  Uptime Guaranteed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container space-y-16 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  Key Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  The Future of API Reliability
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Syntra's AI-powered suite of tools helps you build, test, and
                  monitor APIs at every stage of the development lifecycle.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-2 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-4">
                  <FlaskConical className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">AI Test Generation</h3>
                </div>
                <p className="text-muted-foreground">
                  Paste your OpenAPI spec and let our AI generate
                  comprehensive, context-aware test suites in seconds.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-4">
                  <Zap className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Real-time Execution</h3>
                </div>
                <p className="text-muted-foreground">
                  Run your tests against local, staging, or production
                  environments and get immediate, detailed feedback.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-4">
                  <Activity className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Performance Analytics</h3>
                </div>
                <p className="text-muted-foreground">
                  Monitor response times, error rates, and custom metrics with
                  beautiful, easy-to-read charts.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Security Scanning</h3>
                </div>
                <p className="text-muted-foreground">
                  Automatically scan for common vulnerabilities like SQLi, XSS,
                  and insecure direct object references.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-4">
                  <GitBranch className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">CI/CD Integration</h3>
                </div>
                <p className="text-muted-foreground">
                  Integrate Syntra into your GitHub, GitLab, or Bitbucket
                  pipelines to test on every commit.
                </p>
              </div>
              <div className="grid gap-2 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-4">
                  <Code className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Developer-first CLI</h3>
                </div>
                <p className="text-muted-foreground">
                  Manage tunnels, run tests, and stream results directly from
                  your terminal with our powerful CLI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full bg-secondary/20 py-16 md:py-24 border-y border-border/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-4">
              <Image
                src="https://picsum.photos/seed/ceo/64/64"
                alt="CEO Avatar"
                width={64}
                height={64}
                className="rounded-full mx-auto"
                data-ai-hint="person portrait"
              />
              <p className="mx-auto max-w-prose text-2xl font-light md:text-3xl">
                “Syntra has become an indispensable part of our CI/CD
                pipeline. The AI-generated tests catch issues we would have
                missed, saving us hours of manual work.”
              </p>
              <div>
                <p className="font-semibold">Jane Doe</p>
                <p className="text-sm text-muted-foreground">
                  Head of Engineering, Future Systems Inc.
                </p>
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
      <footer className="w-full shrink-0 border-t border-border/40 bg-background/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Logo className="size-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Syntra Inc. All rights reserved.
            </p>
          </div>
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
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
