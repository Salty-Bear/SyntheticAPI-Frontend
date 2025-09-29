import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Tunnel } from '@/hooks/tunnel';

interface DeleteTunnelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tunnel: Tunnel | null;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteTunnelDialog({
  open,
  onOpenChange,
  tunnel,
  onConfirm,
  isDeleting = false,
}: DeleteTunnelDialogProps) {
  if (!tunnel) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle className="text-left">Delete Tunnel</AlertDialogTitle>
              <AlertDialogDescription className="text-left text-sm text-muted-foreground">
                This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Name:</span>
              <span className="text-sm font-semibold">{tunnel.name}</span>
            </div>
            {tunnel.description && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Description:</span>
                <span className="text-sm">{tunnel.description}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Endpoint:</span>
              <span className="text-sm font-mono text-xs bg-background px-2 py-1 rounded">
                {tunnel.endpoint}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Protocol:</span>
              <span className="text-sm uppercase font-medium">{tunnel.protocol}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  Are you sure you want to delete this tunnel?
                </p>
                <p className="text-xs text-destructive/80 mt-1">
                  This will permanently remove the tunnel and stop all traffic routing through it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex gap-2 sm:gap-2">
          <AlertDialogCancel disabled={isDeleting} className="sm:flex-1">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isDeleting}
              className="sm:flex-1"
            >
              {isDeleting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Tunnel
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}