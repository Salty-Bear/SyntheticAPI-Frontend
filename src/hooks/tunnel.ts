import { hookstate, useHookstate } from "@hookstate/core";
import { useMemo } from "react";
import { fetchClient } from "@/lib/fetchClient";
import API_SERVER from "../../config/server";

interface Tunnel {
  id?: string;
  name: string;
  description?: string;
  endpoint: string;
  port: number;
  protocol: string; // http, https, tcp, udp
  status?: string;  // active, inactive, pending
  enabled?: boolean;
  created_by?: string;
  updated_by?: string;
}

interface TunnelQuery {
  status?: string;
  protocol?: string;
  enabled?: boolean;
  page?: number;
  limit?: number;
  offset?: number;
}

interface TunnelState {
  loading: boolean;
  errorMessage: string;
  successMessage: string;
  tunnels: Tunnel[];
  currentTunnel: Tunnel | null;
  loadingTunnels: boolean;
  loadingTunnel: boolean;
  creatingTunnel: boolean;
  updatingTunnel: boolean;
  deletingTunnel: boolean;
}

const state = hookstate<TunnelState>({
  loading: false,
  errorMessage: "",
  successMessage: "",
  tunnels: [],
  currentTunnel: null,
  loadingTunnels: false,
  loadingTunnel: false,
  creatingTunnel: false,
  updatingTunnel: false,
  deletingTunnel: false,
});

// Create separate action functions to prevent recreation on every render
const createTunnel = async (tunnelData: Tunnel) => {
  state.creatingTunnel.set(true);
  state.errorMessage.set("");
  state.successMessage.set("");

  try {
    const response = await fetchClient(`${API_SERVER}/tunnels/v1/`, {
      method: "POST",
      body: JSON.stringify(tunnelData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create tunnel");
    }

    const successMessage = data.message || "Tunnel created successfully";
    state.successMessage.set(successMessage);
    
    // Add the new tunnel to the tunnels array if it exists in response
    if (data.data) {
      state.tunnels.set(prev => [...prev, data.data]);
      // Also set as current tunnel
      state.currentTunnel.set(data.data);
    }
    
    return { 
      success: true, 
      data: data.data, 
      message: successMessage,
      tunnel: data.data 
    };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to create tunnel";
    state.errorMessage.set(errorMessage);
    console.error('Create tunnel error:', error);
    throw new Error(errorMessage);
  } finally {
    state.creatingTunnel.set(false);
  }
};

const wrapState = () => {
  return {
    // Create tunnel
    createTunnel,

    // Get all tunnels
    fetchAllTunnels: async (query?: TunnelQuery) => {
      state.loadingTunnels.set(true);
      state.errorMessage.set("");

      try {
        // Build query string if query parameters are provided
        let url = `${API_SERVER}/tunnels/v1/`;
        if (query) {
          const queryParams = new URLSearchParams();
          if (query.status) queryParams.append('status', query.status);
          if (query.protocol) queryParams.append('protocol', query.protocol);
          if (query.enabled !== undefined) queryParams.append('enabled', query.enabled.toString());
          if (query.page) queryParams.append('page', query.page.toString());
          if (query.limit) queryParams.append('limit', query.limit.toString());
          
          if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
          }
        }

        const response = await fetchClient(url);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tunnels");
        }

        // Handle both 'data' and 'tunnels' response fields from the Go backend
        const tunnelsData = data.tunnels || data.data || [];
        state.tunnels.set(tunnelsData);
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to fetch tunnels");
        state.tunnels.set([]);
      } finally {
        state.loadingTunnels.set(false);
      }
    },

    // Get tunnel by ID
    fetchTunnelById: async (tunnelId: string) => {
      state.loadingTunnel.set(true);
      state.errorMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/tunnels/v1/${tunnelId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tunnel");
        }

        state.currentTunnel.set(data.data || null);
        return data.data;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to fetch tunnel");
        state.currentTunnel.set(null);
        throw error;
      } finally {
        state.loadingTunnel.set(false);
      }
    },

    // Update tunnel by ID
    updateTunnel: async (tunnelId: string, tunnelData: Partial<Tunnel>) => {
      state.updatingTunnel.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/tunnels/v1/${tunnelId}`, {
          method: "PUT",
          body: JSON.stringify(tunnelData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to update tunnel");
        }

        state.successMessage.set(data.message || "Tunnel updated successfully");
        
        // Update the tunnel in the tunnels array
        if (data.data) {
          state.tunnels.set(prev => 
            prev.map(tunnel => tunnel.id === tunnelId ? { ...tunnel, ...data.data } : tunnel)
          );
          
          // Update current tunnel if it's the same
          if (state.currentTunnel.get()?.id === tunnelId) {
            state.currentTunnel.set(data.data);
          }
        }
        
        return data.data;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to update tunnel");
        throw error;
      } finally {
        state.updatingTunnel.set(false);
      }
    },

    // Delete tunnel by ID
    deleteTunnel: async (tunnelId: string) => {
      state.deletingTunnel.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/tunnels/v1/${tunnelId}`, {
          method: "DELETE",
        });

        // Handle both JSON and text responses
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = { message: await response.text() };
        }

        if (!response.ok) {
          throw new Error(data.message || `Failed to delete tunnel. Status: ${response.status}`);
        }

        state.successMessage.set(data.message || "Tunnel deleted successfully");
        
        // Immediately remove the tunnel from the tunnels array
        state.tunnels.set(currentTunnels => 
          currentTunnels.filter(tunnel => tunnel.id !== tunnelId)
        );
        
        // Clear current tunnel if it's the deleted tunnel
        if (state.currentTunnel.get()?.id === tunnelId) {
          state.currentTunnel.set(null);
        }
        
        return { success: true, message: data.message || "Tunnel deleted successfully" };
      } catch (error: any) {
        const errorMessage = error.message || "Failed to delete tunnel";
        state.errorMessage.set(errorMessage);
        console.error('Delete tunnel error:', error);
        throw new Error(errorMessage);
      } finally {
        state.deletingTunnel.set(false);
      }
    },

    // Clear current tunnel
    clearCurrentTunnel: () => {
      state.currentTunnel.set(null);
    },

    // Clear messages
    clearMessages: () => {
      state.errorMessage.set("");
      state.successMessage.set("");
    },

    // Actions only - state values are handled in useTunnelState
  };
};

export const useTunnelState = () => {
  const hookState = useHookstate(state);
  
  // Use useMemo to prevent function recreation on every render
  const actions = useMemo(() => wrapState(), []);
  
  // Return stable reference with hookstate values
  return {
    ...actions,
    // Use hookstate values directly to maintain reactivity
    loading: hookState.loading,
    errorMessage: hookState.errorMessage,
    successMessage: hookState.successMessage,
    tunnels: hookState.tunnels,
    currentTunnel: hookState.currentTunnel,
    loadingTunnels: hookState.loadingTunnels,   
    loadingTunnel: hookState.loadingTunnel,
    creatingTunnel: hookState.creatingTunnel,
    updatingTunnel: hookState.updatingTunnel,
    deletingTunnel: hookState.deletingTunnel,
  };
};
export type { Tunnel, TunnelQuery };