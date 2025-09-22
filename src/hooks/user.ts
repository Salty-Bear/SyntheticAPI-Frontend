import { hookstate, State, useHookstate } from "@hookstate/core";
import { fetchClient } from "@/lib/fetchClient";
import { User as FirebaseUser } from "firebase/auth";
import API_SERVER from "../../config/server";



interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

interface CreateUserData {
  email: string;
  name: string;
  phone?: string;
  project_id?: string;
  profile_pic?: string;
}

interface UpdateUserData {
  email?: string;
  name?: string;
  phone?: string;
  role?: string;
  status?: string;
}

interface UserState {
  loading: boolean;
  errorMessage: string;
  successMessage: string;
  users: User[];
  currentUser: User | null;
  loadingUsers: boolean;
  loadingUser: boolean;
  creatingUser: boolean;
  updatingUser: boolean;
  deletingUser: boolean;
}

const state = hookstate<UserState>({
  loading: false,
  errorMessage: "",
  successMessage: "",
  users: [],
  currentUser: null,
  loadingUsers: false,
  loadingUser: false,
  creatingUser: false,
  updatingUser: false,
  deletingUser: false,
});

const wrapState = () => {
  return {
    // Create user (for signup)
    createUser: async (userData: CreateUserData) => {
      state.creatingUser.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/users/v1/`, {
          method: "POST",
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to create user");
        }

        state.successMessage.set(data.message || "User created successfully");
        
        // Add the new user to the users array if it exists in response
        if (data.data) {
          state.users.set(prev => [...prev, data.data]);
        }

        state.loadingUser.set(false);
        
        return data.data;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to create user");
        throw error;
      } finally {
        state.creatingUser.set(false);
      }
    },

    // Get all users
    fetchAllUsers: async () => {
      state.loadingUsers.set(true);
      state.errorMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/user/v1/`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        state.users.set(data.data || []);
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to fetch users");
        state.users.set([]);
      } finally {
        state.loadingUsers.set(false);
      }
    },

    // Get user by ID
    fetchUserById: async (userId: string) => {
      state.loadingUser.set(true);
      state.errorMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/user/v1/${userId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }

        state.currentUser.set(data.data || null);
        return data.data;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to fetch user");
        state.currentUser.set(null);
        throw error;
      } finally {
        state.loadingUser.set(false);
      }
    },

    // Update user by ID
    updateUser: async (userId: string, userData: UpdateUserData) => {
      state.updatingUser.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/user/v1/${userId}`, {
          method: "PUT",
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to update user");
        }

        state.successMessage.set(data.message || "User updated successfully");
        
        // Update the user in the users array
        if (data.data) {
          state.users.set(prev => 
            prev.map(user => user.id === userId ? { ...user, ...data.data } : user)
          );
          
          // Update current user if it's the same
          if (state.currentUser.get()?.id === userId) {
            state.currentUser.set(data.data);
          }
        }
        
        return data.data;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to update user");
        throw error;
      } finally {
        state.updatingUser.set(false);
      }
    },

    // Delete user by ID
    deleteUser: async (userId: string) => {
      state.deletingUser.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const response = await fetchClient(`${API_SERVER}/user/v1/${userId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to delete user");
        }

        state.successMessage.set(data.message || "User deleted successfully");
        
        // Remove the user from the users array
        state.users.set(prev => prev.filter(user => user.id !== userId));
        
        // Clear current user if it's the deleted user
        if (state.currentUser.get()?.id === userId) {
          state.currentUser.set(null);
        }
        
        return true;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to delete user");
        throw error;
      } finally {
        state.deletingUser.set(false);
      }
    },

    // Clear current user
    clearCurrentUser: () => {
      state.currentUser.set(null);
    },

    // Clear messages
    clearMessages: () => {
      state.errorMessage.set("");
      state.successMessage.set("");
    },

    // Clear all state
    clearAll: () => {
      state.users.set([]);
      state.currentUser.set(null);
      state.errorMessage.set("");
      state.successMessage.set("");
    },

    // State getters
    loading: state.loading,
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    users: state.users,
    currentUser: state.currentUser,
    loadingUsers: state.loadingUsers,
    loadingUser: state.loadingUser,
    creatingUser: state.creatingUser,
    updatingUser: state.updatingUser,
    deletingUser: state.deletingUser,
  };
};

export const useUserState = () => wrapState();
