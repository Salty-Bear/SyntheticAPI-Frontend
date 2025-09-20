'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const responseTimeData = [
  { date: '2024-07-01', time: 110 },
  { date: '2024-07-02', time: 130 },
  { date: '2024-07-03', time: 120 },
  { date: '2024-07-04', time: 145 },
  { date: '2024-07-05', time: 125 },
  { date: '2024-07-06', time: 150 },
  { date: '2024-07-07', time: 140 },
];

const errorRateData = [
  { endpoint: '/users', rate: 0.5 },
  { endpoint: '/products', rate: 1.2 },
  { endpoint: '/orders', rate: 2.1 },
  { endpoint: '/auth/login', rate: 0.2 },
  { endpoint: '/auth/signup', rate: 0.8 },
];

const chartConfig: ChartConfig = {
  time: {
    label: 'Response Time (ms)',
    color: 'hsl(var(--accent))',
  },
  rate: {
    label: 'Error Rate (%)',
    color: 'hsl(var(--primary))',
  },
};

export function ResponseTimeChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart
        data={responseTimeData}
        margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
            })
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}ms`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="time"
          stroke="var(--color-time)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function ErrorRateChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart
        data={errorRateData}
        margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="endpoint"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
