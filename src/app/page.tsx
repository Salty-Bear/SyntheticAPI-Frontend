import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
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
      <header className="sticky top-0 z-50 h-14 sm:h-16 border-b border-border/40 bg-background/80 px-3 sm:px-4 backdrop-blur-sm lg:px-6">
        <div className="flex h-full items-center">
          <Link href="#" className="flex items-center justify-center">
            <Logo className="size-6 sm:size-8 text-primary" />
            <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-primary">
              Syntra
            </span>
          </Link>
          <nav className="ml-6 sm:ml-10 hidden items-center gap-4 sm:gap-6 text-sm font-medium lg:flex">
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
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="sm:size-default">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center grid-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
          <div className="container relative mx-auto flex justify-center px-4 sm:px-6">
            <div className="max-w-4xl text-center">
              <div className="inline-block rounded-full bg-secondary px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary">
                <Zap className="mr-1 sm:mr-2 inline size-3 sm:size-4" />
                Now powered by Gemini 2.5
              </div>
              <h1
                className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground text-center leading-tight"
              >
                <div className="leading-tight">
                  <span className="shimmer">Intelligent API Testing,</span>
                  <br />
                  <span className="typewriter" data-text="Automated.">
                    Automated.
                  </span>
                </div>
              </h1>
              <p className="mt-4 sm:mt-6 max-w-[600px] mx-auto text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                Syntra is the AI-native platform for comprehensive API testing.
                Generate tests from specs, monitor performance, and ship with
                confidence.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/login">Start Testing for Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/documentation">Read Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full border-y border-border/40 bg-secondary/20 py-12 sm:py-16 md:py-24">
          <div className="container px-4 sm:px-6 md:px-6 mx-auto">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 text-center lg:grid-cols-4">
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">10x</p>
                <p className="text-sm sm:text-base font-medium text-muted-foreground">
                  Faster Test Creation
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">40%</p>
                <p className="text-sm sm:text-base font-medium text-muted-foreground">
                  Reduction in Bugs
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">2M+</p>
                <p className="text-sm sm:text-base font-medium text-muted-foreground">
                  Tests Run Daily
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">99.99%</p>
                <p className="text-sm sm:text-base font-medium text-muted-foreground">
                  Uptime Guaranteed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 sm:py-20 md:py-32">
          <div className="container space-y-12 sm:space-y-16 px-4 sm:px-6 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2 sm:space-y-3">
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary text-xs sm:text-sm"
                >
                  Key Features
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  The Future of API Reliability
                </h2>
                <p className="max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4 sm:px-0">
                  Syntra's AI-powered suite of tools helps you build, test, and
                  monitor APIs at every stage of the development lifecycle.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-6 sm:gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-3 sm:gap-4 rounded-lg border border-border/40 p-4 sm:p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <FlaskConical className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">AI Test Generation</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Paste your OpenAPI spec and let our AI generate
                  comprehensive, context-aware test suites in seconds.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 rounded-lg border border-border/40 p-4 sm:p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">Real-time Execution</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Run your tests against local, staging, or production
                  environments and get immediate, detailed feedback.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 rounded-lg border border-border/40 p-4 sm:p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">Performance Analytics</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Monitor response times, error rates, and custom metrics with
                  beautiful, easy-to-read charts.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 rounded-lg border border-border/40 p-4 sm:p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">Security Scanning</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Automatically scan for common vulnerabilities like SQLi, XSS,
                  and insecure direct object references.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 rounded-lg border border-border/40 p-4 sm:p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <GitBranch className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">CI/CD Integration</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Integrate Syntra into your GitHub, GitLab, or Bitbucket
                  pipelines to test on every commit.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 rounded-lg border border-border/40 p-4 sm:p-6 transition-all hover:border-primary/50 hover:bg-secondary/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">Developer-first CLI</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Manage tunnels, run tests, and stream results directly from
                  your terminal with our powerful CLI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Code Demo Section */}
        <section className="w-full bg-secondary/20 py-12 sm:py-16 md:py-24 border-y border-border/40">
          <div className="container px-4 sm:px-6 md:px-6 mx-auto">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-8 sm:mb-12">
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary mb-3 sm:mb-4 text-xs sm:text-sm"
                >
                  See It In Action
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                  From API Spec to Tests in Seconds
                </h2>
                <p className="mt-3 sm:mt-4 max-w-[600px] mx-auto text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
                  Watch as Syntra transforms your OpenAPI specification into comprehensive test suites with AI-powered intelligence.
                </p>
              </div>
              
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
                {/* Input Side */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    OpenAPI Specification
                  </div>
                  <div className="rounded-lg border bg-background/50 p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                    <div className="text-blue-400">paths:</div>
                    <div className="ml-2 text-green-400">/api/users:</div>
                    <div className="ml-4 text-yellow-400">post:</div>
                    <div className="ml-6 text-gray-300">summary: Create user</div>
                    <div className="ml-6 text-gray-300">requestBody:</div>
                    <div className="ml-8 text-purple-400">required: true</div>
                    <div className="ml-8 text-gray-300">content:</div>
                    <div className="ml-10 text-blue-400">application/json:</div>
                    <div className="ml-12 text-gray-300">schema:</div>
                    <div className="ml-14 text-red-400">$ref: '#/components/schemas/User'</div>
                  </div>
                </div>

                {/* Output Side */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    AI-Generated Test Suite
                  </div>
                  <div className="rounded-lg border bg-background/50 p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                    <div className="text-blue-400">describe('POST /api/users', () =&gt; {'{'}</div>
                    <div className="ml-2 text-green-400">it('creates user with valid data', async () =&gt; {'{'}</div>
                    <div className="ml-4 text-gray-300">const response = await request</div>
                    <div className="ml-6 text-yellow-400">.post('/api/users')</div>
                    <div className="ml-6 text-yellow-400">.send({'{'}</div>
                    <div className="ml-8 text-purple-400">name: 'John Doe',</div>
                    <div className="ml-8 text-purple-400">email: 'john@example.com'</div>
                    <div className="ml-6 text-yellow-400">{'}'})</div>
                    <div className="ml-4 text-gray-300">expect(response.status).toBe(201)</div>
                    <div className="ml-2 text-green-400">{'}'});</div>
                    <div className="text-blue-400">{'}'});</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 flex justify-center px-4 sm:px-0">
                <div className="flex items-center gap-3 sm:gap-4 rounded-full bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 border border-primary/20">
                  <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-center">
                    <span className="text-primary font-bold">50+</span> test scenarios generated automatically
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 sm:py-20 md:py-32">
          <div className="container flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-6 text-center md:px-6 mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Ready to supercharge your API testing?
            </h2>
            <p className="max-w-[600px] text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
              Sign up today and start generating tests in minutes. No credit
              card required.
            </p>
            <div className="mt-3 sm:mt-4">
              <Button asChild size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base">
                <Link href="/login">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full shrink-0 border-t border-border/40 bg-background/80">
        <div className="container flex flex-col items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6 sm:flex-row md:px-6">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Logo className="size-5 sm:size-6 text-primary" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              &copy; 2024 Syntra Inc. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-3 sm:gap-4 sm:ml-auto lg:gap-6">
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