"use client";

import { GenerationForm } from './generation-form';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function GeneratePage() {
  return (
    <ProtectedRoute>
      <GenerateContent />
    </ProtectedRoute>
  );
}

function GenerateContent() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Automated Test Case Generation
        </h1>
        <p className="text-muted-foreground">
          Provide your API specification in OpenAPI (Swagger) or a similar
          format. Our AI will generate a set of test cases for you.
        </p>
      </div>
      <GenerationForm />
    </div>
  );
}
