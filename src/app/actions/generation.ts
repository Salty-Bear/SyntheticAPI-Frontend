'use server';

import {
  generateTestCasesFromSpec,
  type GenerateTestCasesFromSpecInput,
} from '@/ai/flows/generate-test-cases-from-spec';

export async function handleGenerateTestCases(
  input: GenerateTestCasesFromSpecInput
) {
  try {
    const output = await generateTestCasesFromSpec(input);
    return output;
  } catch (error) {
    console.error('Error generating test cases:', error);
    // Let the client-side handle the error display
    throw new Error('Failed to communicate with the AI service.');
  }
}
