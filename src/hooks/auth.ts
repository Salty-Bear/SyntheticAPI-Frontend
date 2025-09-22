import { hookstate, State, useHookstate } from "@hookstate/core";
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useUserState } from "./user";

interface FirebaseAuthState {
  user: FirebaseUser | null;
  loading: boolean;
  initializing: boolean;
  errorMessage: string;
  successMessage: string;
  signingIn: boolean;
  signingOut: boolean;
  creatingAccount: boolean;
  onUserChanged?: (user: FirebaseUser | null) => Promise<void>;
}

const state = hookstate<FirebaseAuthState>({
  user: null,
  loading: false,
  initializing: true,
  errorMessage: "",
  successMessage: "",
  signingIn: false,
  signingOut: false,
  creatingAccount: false,
  onUserChanged: undefined,
});

const wrapState = () => {
  return {

    stateUser: useUserState(),

    // Initialize auth state listener
    initializeAuth: () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        state.user.set(user);
        state.initializing.set(false);
        
        // Set or remove auth cookie for middleware
        if (user) {
          try {
            const token = await user.getIdToken();
            document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Strict`;
            
            // Call user changed callback if provided
            const onUserChanged = state.get().onUserChanged;
            if (onUserChanged) {
              try {
                await onUserChanged(user);
              } catch (error) {
                console.error('Error in user changed callback:', error);
              }
            }
          } catch (error) {
            console.error('Error getting ID token:', error);
            state.errorMessage.set('Error setting up authentication');
          }
        } else {
          document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          
          // Call user changed callback if provided
          const onUserChanged = state.get().onUserChanged;
          if (onUserChanged) {
            try {
              await onUserChanged(null);
            } catch (error) {
              console.error('Error in user changed callback:', error);
            }
          }
        }
      });

      return unsubscribe;
    },

    // Sign in with Google
    signInWithGoogle: async () => {
      state.signingIn.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const result = await signInWithPopup(auth, googleProvider);
        state.successMessage.set("Successfully signed in with Google");
        
        const userState = useUserState();
        await userState.createUser({
          email: result.user.email || '',
          name: result.user.displayName || '',
          phone: result.user.phoneNumber || '',
          profile_pic: result.user.photoURL || '',
        });

        
        
        return result.user;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to sign in with Google");
        throw error;
      } finally {
        state.signingIn.set(false);

      }
    },

    // Sign in with email and password
    signInWithEmail: async (email: string, password: string) => {
      state.signingIn.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        state.successMessage.set("Successfully signed in");
        return result.user;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to sign in");
        throw error;
      } finally {
        state.signingIn.set(false);
      }
    },

    // Create account with email and password
    createAccount: async (email: string, password: string) => {
      state.creatingAccount.set(true);
      state.errorMessage.set("");
      state.successMessage.set("");

      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        state.successMessage.set("Account created successfully");
        return result.user;
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to create account");
        throw error;
      } finally {
        state.creatingAccount.set(false);
      }
    },

    // Sign out
    signOut: async () => {
      state.signingOut.set(true);
      state.errorMessage.set("");

      try {
        await firebaseSignOut(auth);
        document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        state.successMessage.set("Successfully signed out");
        
        // Call user changed callback if provided
        const onUserChanged = state.get().onUserChanged;
        if (onUserChanged) {
          try {
            await onUserChanged(null);
          } catch (error) {
            console.error('Error in user changed callback:', error);
          }
        }
      } catch (error: any) {
        state.errorMessage.set(error.message || "Failed to sign out");
        throw error;
      } finally {
        state.signingOut.set(false);
      }
    },

    // Clear messages
    clearMessages: () => {
      state.errorMessage.set("");
      state.successMessage.set("");
    },

    // Set user changed callback
    setOnUserChanged: (callback: (user: FirebaseUser | null) => Promise<void>) => {
      state.set(prev => ({ ...prev, onUserChanged: callback }));
    },

    // Get current user token
    getCurrentUserToken: async () => {
      const user = state.user.get();
      if (user) {
        try {
          return await user.getIdToken();
        } catch (error) {
          console.error('Error getting user token:', error);
          return null;
        }
      }
      return null;
    },

    // State getters
    user: state.user,
    loading: state.loading,
    initializing: state.initializing,
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    signingIn: state.signingIn,
    signingOut: state.signingOut,
    creatingAccount: state.creatingAccount,
  };
};

export const useAuth = () => wrapState();
