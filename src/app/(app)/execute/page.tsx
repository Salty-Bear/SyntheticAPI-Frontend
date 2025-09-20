import { TestExecutionClient } from './test-execution-client';

export default function ExecutePage() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Real-time Test Execution
        </h1>
        <p className="text-muted-foreground">
          Execute generated test cases and get immediate feedback on your API
          endpoints.
        </p>
      </div>
      <TestExecutionClient />
    </div>
  );
}
