"use client";

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="mt-2 w-full whitespace-pre-wrap rounded-md bg-secondary p-4">
    <code className="font-mono text-sm text-secondary-foreground">
      {children}
    </code>
  </pre>
);

export default function DocumentationPage() {
  return (
    <ProtectedRoute>
      <DocumentationContent />
    </ProtectedRoute>
  );
}

function DocumentationContent() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground">
          Integrate with Syntra using our public API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Badge className="bg-blue-600 text-white">GET</Badge>
            <span>/api/v1/tests</span>
          </CardTitle>
          <CardDescription>
            Retrieve a list of all test suites.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">Example Response:</h4>
          <CodeBlock>
            {`{
  "data": [
    {
      "id": "suite_abc123",
      "name": "User API Tests",
      "test_count": 8,
      "last_run": "2024-07-22T10:00:00Z"
    }
  ]
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Badge className="bg-green-600 text-white">POST</Badge>
            <span>/api/v1/tests/{'{}'}suiteId{'{}'}/run</span>
          </CardTitle>
          <CardDescription>
            Trigger a new test run for a specific suite.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">Example Response:</h4>
          <CodeBlock>
            {`{
  "run_id": "run_xyz789",
  "status": "started",
  "message": "Test run initiated successfully."
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Badge className="bg-blue-600 text-white">GET</Badge>
            <span>/api/v1/runs/{'{}'}runId{'{}'}</span>
          </CardTitle>
          <CardDescription>
            Get the status and results of a specific test run.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">Example Response:</h4>
          <CodeBlock>
            {`{
  "run_id": "run_xyz789",
  "status": "completed",
  "results": {
    "passed": 7,
    "failed": 1,
    "duration": 4580
  }
}`}
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
