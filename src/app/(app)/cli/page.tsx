"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Terminal } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="mt-2 w-full whitespace-pre-wrap rounded-md bg-secondary p-4">
    <code className="font-mono text-sm text-secondary-foreground">
      {children}
    </code>
  </pre>
);

export default function CliPage() {
  return (
    <ProtectedRoute>
      <CliContent />
    </ProtectedRoute>
  );
}

function CliContent() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CLI Access</h1>
        <p className="text-muted-foreground">
          Integrate Syntra into your development workflow with our
          cross-platform CLI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
          <CardDescription>
            Install the CLI using npm or your favorite package manager.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock>npm install -g syntra-cli</CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 font-semibold">
              <Terminal className="size-4" /> syntra login
            </h3>
            <p className="text-sm text-muted-foreground">
              Authenticate with your Syntra account.
            </p>
            <CodeBlock>syntra login</CodeBlock>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold">
              <Terminal className="size-4" /> syntra tunnel create
            </h3>
            <p className="text-sm text-muted-foreground">
              Create a new reverse tunnel.
            </p>
            <CodeBlock>syntra tunnel create --port 3000 --name my-api</CodeBlock>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold">
              <Terminal className="size-4" /> syntra test run
            </h3>
            <p className="text-sm text-muted-foreground">
              Run a test suite from a file.
            </p>
            <CodeBlock>syntra test run ./tests/api.json</CodeBlock>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
