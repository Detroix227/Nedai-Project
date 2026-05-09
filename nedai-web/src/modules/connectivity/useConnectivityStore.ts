import { create } from 'zustand';

interface ConnectivityState {
  isOnline: boolean;
  isChecking: boolean;
  lastChecked: Date | null;
  checkConnection: () => Promise<void>;
}

export const useConnectivityStore = create<ConnectivityState>((set) => ({
  isOnline: true, // Default to true, heartbeat will correct it
  isChecking: false,
  lastChecked: null,
  checkConnection: async () => {
    set({ isChecking: true });
    try {
      // Ping the Render health endpoint
      const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/health`, {
        method: 'GET',
        cache: 'no-store',
      });
      set({ isOnline: response.ok, lastChecked: new Date(), isChecking: false });
    } catch (error) {
      set({ isOnline: false, lastChecked: new Date(), isChecking: false });
    }
  },
}));
