import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: (value?: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: true,
  toggleTheme: (value?: boolean) => set((state) => ({
    isDarkMode: value !== undefined ? value : !state.isDarkMode
  })),
}));
