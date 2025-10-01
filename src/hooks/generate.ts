import { hookstate, useHookstate } from "@hookstate/core";
import { useMemo } from "react";
import { fetchClient } from "@/lib/fetchClient";
import API_SERVER from "../../config/server";

interface Generate {
  id?: string;
  name: string;
  description?: string;
  data_type: string; // json, csv, xml, sql, etc.
  count: number;
  schema?: any; // JSON schema for data structure
  format?: string; // output format specifications
  status?: string; // active, completed, failed, pending
  enabled?: boolean;
  user_id: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  output_data?: any; // generated data result
}

interface GenerateQuery {
  status?: string;
  data_type?: string;
  enabled?: boolean;
  user_id: string;
  page?: number;
  limit?: number;
  offset?: number;
}

interface GenerateState {
  loading: boolean;
  generates: Generate[];
  currentGenerate: Generate | null;
  loadingGenerates: boolean;
  loadingGenerate: boolean;
  creatingGenerate: boolean;
  updatingGenerate: boolean;
  deletingGenerate: boolean;
  executingGenerate: boolean;
}

const state = hookstate<GenerateState>({
  loading: false,
  generates: [],
  currentGenerate: null,
  loadingGenerates: false,
  loadingGenerate: false,
  creatingGenerate: false,
  updatingGenerate: false,
  deletingGenerate: false,
  executingGenerate: false,
});

const createGenerate = async (generateData: Generate) => {
  state.creatingGenerate.set(true);

  try {
    const response = await fetchClient(`${API_SERVER}/generate/v1/`, {
      method: "POST",
      body: JSON.stringify(generateData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create generate task");
    }

    const successMessage = data.message || "Generate task created successfully";
    
    if (data.data) {
      state.generates.set(prev => [...prev, data.data]);
      state.currentGenerate.set(data.data);
    }
    
    return { 
      success: true, 
      data: data.data, 
      message: successMessage,
      generate: data.data 
    };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to create generate task";
    console.error('Create generate error:', error);
    throw new Error(errorMessage);
  } finally {
    state.creatingGenerate.set(false);
  }
};

const wrapState = () => {
  return {
    createGenerate,

    // Get all generate tasks for user
    fetchAllGenerates: async (query: GenerateQuery) => {
      state.loadingGenerates.set(true);

      try {
        let url = `${API_SERVER}/generate/v1/`;
        if (query) {
          const queryParams = new URLSearchParams();
          queryParams.append('user_id', query.user_id);
          if (query.status) queryParams.append('status', query.status);
          if (query.data_type) queryParams.append('data_type', query.data_type);
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
          throw new Error(data.message || "Failed to fetch generate tasks");
        }

        const generatesData = data.generates || data.data || [];
        state.generates.set(generatesData);
      } catch (error: any) {
        state.generates.set([]);
        console.error('Failed to fetch generates:', error);
      } finally {
        state.loadingGenerates.set(false);
      }
    },

    // Get generate task by ID
    fetchGenerateById: async (generateId: string, userId: string) => {
      state.loadingGenerate.set(true);

      try {
        const response = await fetchClient(`${API_SERVER}/generate/v1/${generateId}?user_id=${userId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch generate task");
        }

        state.currentGenerate.set(data.data || null);
        return data.data;
      } catch (error: any) {
        state.currentGenerate.set(null);
        console.error('Failed to fetch generate:', error);
        throw error;
      } finally {
        state.loadingGenerate.set(false);
      }
    },

    // Update generate task by ID
    updateGenerate: async (generateId: string, generateData: Partial<Generate>) => {
      state.updatingGenerate.set(true);

      try {
        const response = await fetchClient(`${API_SERVER}/generate/v1/${generateId}`, {
          method: "PUT",
          body: JSON.stringify(generateData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to update generate task");
        }
        
        if (data.data) {
          state.generates.set(prev => 
            prev.map(generate => generate.id === generateId ? { ...generate, ...data.data } : generate)
          );
          
          if (state.currentGenerate.get()?.id === generateId) {
            state.currentGenerate.set(data.data);
          }
        }
        
        return data.data;
      } catch (error: any) {
        console.error('Failed to update generate:', error);
        throw error;
      } finally {
        state.updatingGenerate.set(false);
      }
    },

    // Delete generate task by ID
    deleteGenerate: async (generateId: string, userId: string) => {
      state.deletingGenerate.set(true);

      try {
        const response = await fetchClient(`${API_SERVER}/generate/v1/${generateId}?user_id=${userId}`, {
          method: "DELETE",
        });

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = { message: await response.text() };
        }

        if (!response.ok) {
          throw new Error(data.message || `Failed to delete generate task. Status: ${response.status}`);
        }
        
        state.generates.set(currentGenerates => 
          currentGenerates.filter(generate => generate.id !== generateId)
        );
        
        if (state.currentGenerate.get()?.id === generateId) {
          state.currentGenerate.set(null);
        }
        
        return { success: true, message: data.message || "Generate task deleted successfully" };
      } catch (error: any) {
        const errorMessage = error.message || "Failed to delete generate task";
        console.error('Delete generate error:', error);
        throw new Error(errorMessage);
      } finally {
        state.deletingGenerate.set(false);
      }
    },

    // Execute generate task to produce data
    executeGenerate: async (generateId: string, userId: string) => {
      state.executingGenerate.set(true);

      try {
        const response = await fetchClient(`${API_SERVER}/generate/v1/${generateId}/execute`, {
          method: "POST",
          body: JSON.stringify({ user_id: userId }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to execute generate task");
        }

        // Update the generate task with execution results
        if (data.data) {
          state.generates.set(prev => 
            prev.map(generate => generate.id === generateId ? { ...generate, ...data.data } : generate)
          );
          
          if (state.currentGenerate.get()?.id === generateId) {
            state.currentGenerate.set(data.data);
          }
        }
        
        return { 
          success: true, 
          data: data.data, 
          message: data.message || "Generate task executed successfully" 
        };
      } catch (error: any) {
        console.error('Execute generate error:', error);
        throw error;
      } finally {
        state.executingGenerate.set(false);
      }
    },

    // Clear current generate task
    clearCurrentGenerate: () => {
      state.currentGenerate.set(null);
    },
  };
};

export const useGenerateState = () => {
  const hookState = useHookstate(state);
  
  const actions = useMemo(() => wrapState(), []);
  
  return {
    ...actions,
    loading: hookState.loading,
    generates: hookState.generates,
    currentGenerate: hookState.currentGenerate,
    loadingGenerates: hookState.loadingGenerates,   
    loadingGenerate: hookState.loadingGenerate,
    creatingGenerate: hookState.creatingGenerate,
    updatingGenerate: hookState.updatingGenerate,
    deletingGenerate: hookState.deletingGenerate,
    executingGenerate: hookState.executingGenerate,
  };
};

export type { Generate, GenerateQuery };
