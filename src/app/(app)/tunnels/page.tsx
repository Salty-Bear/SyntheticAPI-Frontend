"use client";

import { useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useTunnelState, Tunnel } from '@/hooks/tunnel';
import { DeleteTunnelDialog } from '@/components/tunnels/DeleteTunnelDialog';
import { Trash2, ExternalLink, Copy } from 'lucide-react';

export default function TunnelsPage() {
  return (
    <ProtectedRoute>
      <TunnelsContent />
    </ProtectedRoute>
  );
}

function TunnelsContent() {
  const tunnelState = useTunnelState();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    endpoint: '',
    protocol: '',
    description: ''
  });
  
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    tunnel: Tunnel | null;
  }>({ open: false, tunnel: null });

  // Initialize data on component mount - using ref to ensure it only runs once
  useEffect(() => {
    let isMounted = true;
    
    const initializeData = async () => {
      try {
        await tunnelState.fetchAllTunnels();
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching tunnels:', error);
        }
      }
    };
    
    initializeData();
    
    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTunnel = async () => {
    // Prevent multiple simultaneous create operations
    if (tunnelState.creatingTunnel.get()) {
      return;
    }

    if (!formData.name || !formData.endpoint || !formData.protocol) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Extract port from endpoint URL or use default
      const extractPortFromUrl = (url: string): number => {
        try {
          const urlObj = new URL(url);
          return urlObj.port ? parseInt(urlObj.port) : (urlObj.protocol === 'https:' ? 443 : 80);
        } catch {
          return 80; // Default port
        }
      };

      const result = await tunnelState.createTunnel({
        name: formData.name,
        endpoint: formData.endpoint,
        port: extractPortFromUrl(formData.endpoint),
        protocol: formData.protocol,
        description: formData.description
      });

      // Show success toast
      toast({
        title: "Success",
        description: result.message || "Tunnel created successfully",
        variant: "default",
      });

      // Reset form on success
      setFormData({
        name: '',
        endpoint: '',
        protocol: '',
        description: ''
      });
      
    } catch (error: any) {
      console.error('Failed to create tunnel:', error);
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create tunnel. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTunnel = (tunnel: Tunnel) => {
    // Prevent opening delete dialog if already deleting or invalid tunnel
    if (!tunnel?.id || tunnelState.deletingTunnel.get()) {
      return;
    }
    setDeleteDialog({ open: true, tunnel });
  };

  const confirmDeleteTunnel = async () => {
    if (!deleteDialog.tunnel?.id || tunnelState.deletingTunnel.get()) {
      return; // Prevent multiple simultaneous delete calls
    }

    try {
      const result = await tunnelState.deleteTunnel(deleteDialog.tunnel.id);
      
      // Show success toast
      toast({
        title: "Success",
        description: result.message || "Tunnel deleted successfully",
        variant: "default",
      });
      
      setDeleteDialog({ open: false, tunnel: null });
    } catch (error: any) {
      console.error('Failed to delete tunnel:', error);
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete tunnel. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string, enabled: boolean) => {
    if (!enabled) {
      return <Badge variant="secondary">Disabled</Badge>;
    }
    
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

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
              <CardTitle>Active Tunnels ({tunnelState.tunnels.get().length})</CardTitle>
            </CardHeader>
            <CardContent>
              {tunnelState.loadingTunnels.get() ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[80px]" />
                    </div>
                  ))}
                </div>
              ) : tunnelState.tunnels.get().length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No tunnels found. Create your first tunnel to get started.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tunnelState.tunnels.get().map((tunnel: Tunnel) => {
                      // Ensure tunnel has valid id to prevent rendering issues
                      if (!tunnel.id) return null;
                      
                      return (
                        <TableRow key={tunnel.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div>{tunnel.name}</div>
                              {tunnel.description && (
                                <div className="text-xs text-muted-foreground">
                                  {tunnel.description}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {tunnel.endpoint}
                              {tunnel.endpoint && (
                                <ExternalLink 
                                  className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" 
                                  onClick={() => window.open(tunnel.endpoint, '_blank')}
                                />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="uppercase">
                              {tunnel.protocol}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(tunnel.status || 'inactive', tunnel.enabled !== false)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTunnel(tunnel)}
                              disabled={tunnelState.deletingTunnel.get()}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create New Tunnel</CardTitle>
              <CardDescription>
                Create a secure tunnel to expose your local services.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tunnel Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., my-local-api"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endpoint">Endpoint URL</Label>
                <Input 
                  id="endpoint" 
                  placeholder="e.g., http://localhost:3000"
                  value={formData.endpoint}
                  onChange={(e) => handleInputChange('endpoint', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="protocol">Protocol</Label>
                <Select value={formData.protocol} onValueChange={(value) => handleInputChange('protocol', value)}>
                  <SelectTrigger id="protocol">
                    <SelectValue placeholder="Select protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http">HTTP</SelectItem>
                    <SelectItem value="https">HTTPS</SelectItem>
                    <SelectItem value="tcp">TCP</SelectItem>
                    <SelectItem value="udp">UDP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input 
                  id="description" 
                  placeholder="e.g., Development API server"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCreateTunnel}
                disabled={tunnelState.creatingTunnel.get() || !formData.name || !formData.endpoint || !formData.protocol}
                className="w-full"
              >
                {tunnelState.creatingTunnel.get() ? "Creating..." : "Create Tunnel"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Professional delete confirmation dialog */}
      <DeleteTunnelDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, tunnel: deleteDialog.tunnel })}
        tunnel={deleteDialog.tunnel}
        onConfirm={confirmDeleteTunnel}
        isDeleting={tunnelState.deletingTunnel.get()}
      />
    </div>
  );
}
