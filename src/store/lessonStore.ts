import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Lesson, LessonStatus } from "@/types/learning";

interface LessonState {
  lessonStatusOverrides: Record<string, LessonStatus>;
  selectedLessonByLanguage: Record<string, string>;
  selectedUnitByLanguage: Record<string, string>;
  bookmarkedUnitIds: string[];
  totalXp: number;
  hasHydrated: boolean;
  openLesson: (lesson: Lesson) => void;
  completeLesson: (lesson: Lesson) => void;
  selectUnit: (languageId: string, unitId: string) => void;
  toggleBookmarkUnit: (unitId: string) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      lessonStatusOverrides: {},
      selectedLessonByLanguage: {},
      selectedUnitByLanguage: {},
      bookmarkedUnitIds: [],
      totalXp: 30,
      hasHydrated: false,

      openLesson: (lesson) => {
        const currentOverride = get().lessonStatusOverrides[lesson.id];
        const effectiveStatus = currentOverride ?? lesson.status;

        set((state) => ({
          selectedLessonByLanguage: {
            ...state.selectedLessonByLanguage,
            [lesson.languageId]: lesson.id,
          },
          selectedUnitByLanguage: {
            ...state.selectedUnitByLanguage,
            [lesson.languageId]: lesson.unitId,
          },
          lessonStatusOverrides:
            effectiveStatus === "completed"
              ? state.lessonStatusOverrides
              : {
                  ...state.lessonStatusOverrides,
                  [lesson.id]: "in_progress",
                },
        }));
      },

      completeLesson: (lesson) => {
        const currentOverride = get().lessonStatusOverrides[lesson.id];
        const wasCompleted = (currentOverride ?? lesson.status) === "completed";

        set((state) => ({
          lessonStatusOverrides: {
            ...state.lessonStatusOverrides,
            [lesson.id]: "completed",
          },
          totalXp: wasCompleted
            ? state.totalXp
            : state.totalXp + lesson.xpReward,
        }));
      },

      selectUnit: (languageId, unitId) =>
        set((state) => ({
          selectedUnitByLanguage: {
            ...state.selectedUnitByLanguage,
            [languageId]: unitId,
          },
        })),

      toggleBookmarkUnit: (unitId) =>
        set((state) => {
          const exists = state.bookmarkedUnitIds.includes(unitId);
          return {
            bookmarkedUnitIds: exists
              ? state.bookmarkedUnitIds.filter((id) => id !== unitId)
              : [...state.bookmarkedUnitIds, unitId],
          };
        }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "lesson-progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        lessonStatusOverrides: state.lessonStatusOverrides,
        selectedLessonByLanguage: state.selectedLessonByLanguage,
        selectedUnitByLanguage: state.selectedUnitByLanguage,
        bookmarkedUnitIds: state.bookmarkedUnitIds,
        totalXp: state.totalXp,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export function getEffectiveLessonStatus(
  lesson: Lesson,
  overrides: Record<string, LessonStatus>
): LessonStatus {
  return overrides[lesson.id] ?? lesson.status;
}

