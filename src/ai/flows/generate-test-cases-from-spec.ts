'use server';
/**
 * @fileOverview Automatically generates test cases for API endpoints from a specification using an AI model.
 *
 * - generateTestCasesFromSpec - A function that takes an API specification and generates test cases.
 * - GenerateTestCasesFromSpecInput - The input type for the generateTestCasesFromSpec function.
 * - GenerateTestCasesFromSpecOutput - The return type for the generateTestCasesFromSpec function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestCasesFromSpecInputSchema = z.object({
  apiSpec: z.string().describe('The API specification to generate test cases from.'),
});
export type GenerateTestCasesFromSpecInput = z.infer<typeof GenerateTestCasesFromSpecInputSchema>;

const GenerateTestCasesFromSpecOutputSchema = z.object({
  testCases: z.string().describe('The generated test cases in a suitable format (e.g., JSON, YAML).'),
});
export type GenerateTestCasesFromSpecOutput = z.infer<typeof GenerateTestCasesFromSpecOutputSchema>;

export async function generateTestCasesFromSpec(input: GenerateTestCasesFromSpecInput): Promise<GenerateTestCasesFromSpecOutput> {
  return generateTestCasesFromSpecFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestCasesFromSpecPrompt',
  input: {schema: GenerateTestCasesFromSpecInputSchema},
  output: {schema: GenerateTestCasesFromSpecOutputSchema},
  prompt: `You are an expert test case generator for APIs.

  Given the following API specification, generate a comprehensive set of test cases to ensure its functionality, robustness, and security.
  Consider various scenarios, including valid and invalid inputs, edge cases, and potential security vulnerabilities.

  API Specification:
  {{apiSpec}}

  Ensure that the test cases are well-structured, easy to understand, and cover all critical aspects of the API.
  The output should be a string that represents the test cases in a suitable format such as JSON or YAML.
  `,
});

const generateTestCasesFromSpecFlow = ai.defineFlow(
  {
    name: 'generateTestCasesFromSpecFlow',
    inputSchema: GenerateTestCasesFromSpecInputSchema,
    outputSchema: GenerateTestCasesFromSpecOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
