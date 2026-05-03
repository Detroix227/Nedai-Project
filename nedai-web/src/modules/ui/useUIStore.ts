import { create } from 'zustand';

interface UIState {
  // Sidebar collapse state
  isSidebarCollapsed: boolean;
  currentSection: string;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial states
  isSidebarCollapsed: false,
  currentSection: 'chat',

  // Actions
  toggleSidebar: () => {
    const { isSidebarCollapsed } = get();
    set({ isSidebarCollapsed: !isSidebarCollapsed });
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ isSidebarCollapsed: collapsed });
  },

  setCurrentSection: (section: string) => {
    set({ currentSection: section });
  },
}));
