'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { handleGenerateTestCases } from '@/app/actions/generation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  apiSpec: z.string().min(50, {
    message: 'API specification must be at least 50 characters.',
  }),
});

export function GenerationForm() {
  const [generatedTests, setGeneratedTests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiSpec: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedTests('');
    try {
      const result = await handleGenerateTestCases(values);
      if (result && result.testCases) {
        setGeneratedTests(result.testCases);
        toast({
          title: 'Success!',
          description: 'Test cases generated successfully.',
        });
      } else {
        throw new Error(
          'Failed to generate test cases. The result was empty.'
        );
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description:
          error instanceof Error
            ? error.message
            : 'Could not generate test cases.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="apiSpec"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Specification</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your OpenAPI/Swagger spec here..."
                    className="min-h-[400px] font-mono text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Tests
          </Button>
        </form>
      </Form>
      <Card>
        <CardHeader>
          <CardTitle>Generated Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <pre className="mt-2 h-[400px] w-full whitespace-pre-wrap overflow-auto rounded-md bg-secondary p-4 text-sm font-mono text-secondary-foreground">
              <code>
                {generatedTests ||
                  'Your generated test cases will appear here...'}
              </code>
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
