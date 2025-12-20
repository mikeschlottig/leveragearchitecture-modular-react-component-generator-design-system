import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('auth-storage');
      },
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'auth-storage' }
  )
);
// Pre-fill demo logic for Phase 5 visibility
export const DEMO_USER: User = {
  id: 'demo-1',
  name: 'Archie Tech',
  email: 'archie@leverage.build',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Archie',
};