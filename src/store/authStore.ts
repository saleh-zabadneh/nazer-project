import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isSessionExpired, LoginResponse } from "@/lib/auth";

interface AuthState {
  session: LoginResponse | null;
  setSession: (session: LoginResponse | null) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
      isAuthenticated: () => {
        const { session } = get();
        if (!session) return false;
        if (isSessionExpired(session.expiresAt)) {
          get().clearSession();
          return false;
        }
        return true;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
