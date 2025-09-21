"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function TunnelsPage() {
  return (
    <ProtectedRoute>
      <TunnelsContent />
    </ProtectedRoute>
  );
}

function TunnelsContent() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reverse Tunnels</h1>
        <p className="text-muted-foreground">
          Manage secure tunnels to your localhost environments.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Tunnels</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Local URL</TableHead>
                    <TableHead>Public URL</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>dev-api</TableCell>
                    <TableCell>http://localhost:3000</TableCell>
                    <TableCell>https://a1b2c3d4.syndata.dev</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>staging-db</TableCell>
                    <TableCell>http://localhost:5432</TableCell>
                    <TableCell>https://e5f6g7h8.syndata.dev</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>test-service</TableCell>
                    <TableCell>http://localhost:8080</TableCell>
                    <TableCell>https://i9j0k1l2.syndata.dev</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Closed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create New Tunnel</CardTitle>
              <CardDescription>
                Expose a local port to a public URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tunnel Name</Label>
                <Input id="name" placeholder="e.g., my-local-api" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="port">Local Port</Label>
                <Input id="port" type="number" placeholder="e.g., 3000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="protocol">Protocol</Label>
                <Select>
                  <SelectTrigger id="protocol">
                    <SelectValue placeholder="Select protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http">HTTP</SelectItem>
                    <SelectItem value="https">HTTPS</SelectItem>
                    <SelectItem value="tcp">TCP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create Tunnel</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
