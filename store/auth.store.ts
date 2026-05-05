// imports libraries
import { create} from 'zustand'

// imports types
import {User} from "@/type";

// imports functions
import {getCurrentUser} from "@/lib/appwrite";

// defines interface for auth state
type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}


// creates custom hook(store) for authentication data
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,


    // state setters
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({isLoading: value}),

    // fetcher function
    fetchAuthenticatedUser: async () => {
        set({isLoading: true});

        // try catch block to handle errors while fetching user data
        try {

            // destructures user data using getCurrentUser function
            const user = await getCurrentUser();

            // sets user data and authentication state
            if(user) set({ isAuthenticated: true, user: user as unknown as User })
            else set( { isAuthenticated: false, user: null } );
        } catch (e) {
            // logs error and sets default values if error occurs
            console.log('fetchAuthenticatedUser error', e);
            set({ isAuthenticated: false, user: null })
        }
        // in any case changes loading state to false
        finally {
            set({ isLoading: false });
        }
    }
}))

export default useAuthStore;