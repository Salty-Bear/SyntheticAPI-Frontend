'use client';

import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type TestStatus = 'pending' | 'running' | 'passed' | 'failed';

interface TestCase {
  id: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: TestStatus;
  duration?: number;
}

const initialTestCases: TestCase[] = [
  {
    id: 'TC001',
    description: 'Get all users successfully',
    endpoint: '/users',
    method: 'GET',
    status: 'pending',
  },
  {
    id: 'TC002',
    description: 'Create a new user',
    endpoint: '/users',
    method: 'POST',
    status: 'pending',
  },
  {
    id: 'TC003',
    description: 'Get a single user by ID',
    endpoint: '/users/1',
    method: 'GET',
    status: 'pending',
  },
  {
    id: 'TC004',
    description: 'Return 404 for non-existent user',
    endpoint: '/users/999',
    method: 'GET',
    status: 'pending',
  },
  {
    id: 'TC005',
    description: "Update a user's details",
    endpoint: '/users/1',
    method: 'PUT',
    status: 'pending',
  },
  {
    id: 'TC006',
    description: 'Delete a user',
    endpoint: '/users/1',
    method: 'DELETE',
    status: 'pending',
  },
  {
    id: 'TC007',
    description: 'Invalid input for user creation',
    endpoint: '/users',
    method: 'POST',
    status: 'pending',
  },
  {
    id: 'TC008',
    description: 'Unauthorized access to delete',
    endpoint: '/users/2',
    method: 'DELETE',
    status: 'pending',
  },
];

const statusConfig: Record<TestStatus, { text: string; className: string }> = {
  pending: { text: 'Pending', className: 'bg-gray-500' },
  running: { text: 'Running', className: 'bg-blue-500 animate-pulse' },
  passed: { text: 'Passed', className: 'bg-green-500' },
  failed: { text: 'Failed', className: 'bg-red-500' },
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function TestExecutionClient() {
  const [tests, setTests] = useState<TestCase[]>(initialTestCases);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRunTests = async () => {
    setIsRunning(true);
    setProgress(0);

    for (let i = 0; i < tests.length; i++) {
      // Set status to running
      setTests((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'running' } : t))
      );

      await sleep(500 + Math.random() * 1000); // Simulate network latency & execution

      // Set final status
      const didPass = Math.random() > 0.2; // 80% pass rate
      setTests((prev) =>
        prev.map((t, idx) =>
          idx === i
            ? {
                ...t,
                status: didPass ? 'passed' : 'failed',
                duration: Math.floor(Math.random() * 500) + 50,
              }
            : t
        )
      );
      setProgress(((i + 1) / tests.length) * 100);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setTests(initialTestCases);
    setProgress(0);
    setIsRunning(false);
  };

  const summary = tests.reduce(
    (acc, test) => {
      acc[test.status] = (acc[test.status] || 0) + 1;
      return acc;
    },
    {} as Record<TestStatus, number>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Test Suite
          <div className="flex gap-2">
            <Button onClick={handleRunTests} disabled={isRunning}>
              <Play className="mr-2 h-4 w-4" /> Run All Tests
            </Button>
            <Button onClick={handleReset} variant="outline" disabled={isRunning}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </CardTitle>
        {isRunning && <Progress value={progress} className="mt-4" />}
        <div className="flex gap-4 pt-4 text-sm">
          <span>
            Passed:{' '}
            <span className="font-bold text-green-600">{summary.passed || 0}</span>
          </span>
          <span>
            Failed:{' '}
            <span className="font-bold text-red-600">{summary.failed || 0}</span>
          </span>
          <span>
            Pending: <span className="font-bold">{summary.pending || 0}</span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Status</TableHead>
              <TableHead className="w-[100px]">Method</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>
                  <Badge
                    className={cn('text-white', statusConfig[test.status].className)}
                  >
                    {statusConfig[test.status].text}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{test.method}</Badge>
                </TableCell>
                <TableCell className="font-mono">{test.endpoint}</TableCell>
                <TableCell>{test.description}</TableCell>
                <TableCell className="text-right font-mono">
                  {test.duration ? `${test.duration}ms` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
