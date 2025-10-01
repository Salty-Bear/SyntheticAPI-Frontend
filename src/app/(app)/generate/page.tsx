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
          Synthetic Data Generation
        </h1>
        <p className="text-muted-foreground">
          Define your API endpoint schema by specifying keys and their data types.
          Our AI will generate realistic synthetic data based on your schema.
          Supports all data types including media files.
        </p>
      </div>
      <GenerationForm />
    </div>
  );
}
