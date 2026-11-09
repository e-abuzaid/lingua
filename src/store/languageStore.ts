import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LanguageState {
  selectedLanguageId: string | null;
  hasHydrated: boolean;
  setSelectedLanguage: (languageId: string) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setSelectedLanguage: (languageId) => set({ selectedLanguageId: languageId }),
      clearSelectedLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the selected language, not hydration flags or actions.
      partialize: (state) => ({ selectedLanguageId: state.selectedLanguageId }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

