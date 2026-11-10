import { LessonCard } from "@/components/LessonCard";
import {
  DEFAULT_LANGUAGE,
  getDefaultLanguage,
  getLanguageById,
} from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getDefaultUnitForLanguage, getUnitsByLanguage } from "@/data/units";
import { getLessonHeroImage } from "@/lib/lessonImages";
import { posthog } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { toSvgDataUri } from "@/lib/svg";
import { useLanguageStore } from "@/store/languageStore";
import { getEffectiveLessonStatus, useLessonStore } from "@/store/lessonStore";
import { Lesson } from "@/types/learning";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image as RNImage,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ActiveTab = "lessons" | "practice";

const BACK_CHEVRON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path stroke="#0D132B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M15 5.5 8.5 12 15 18.5"/>
  </svg>`
);

function getBookmarkUri(isBookmarked: boolean): string {
  const fillColor = isBookmarked ? "#5B3BF6" : "#FFFFFF";
  const strokeColor = isBookmarked ? "#5B3BF6" : "#1E2439";
  return toSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="#F59E0B" d="M9 3.5h8.5a1.5 1.5 0 0 1 1.5 1.5v13.5l-3.5-2.6-3.5 2.6V5a1.5 1.5 0 0 1 1.5-1.5Z" opacity="0.9"/>
      <path fill="${fillColor}" stroke="${strokeColor}" stroke-width="1.8" stroke-linejoin="round" d="M6.5 5.5A1.5 1.5 0 0 1 8 4h8a1.5 1.5 0 0 1 1.5 1.5v14.8l-5.5-3.9-5.5 3.9V5.5Z"/>
    </svg>`
  );
}

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("lessons");
  const [unitModalVisible, setUnitModalVisible] = useState(false);

  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );
  const selectedLanguage = useMemo(
    () =>
      getLanguageById(selectedLanguageId ?? DEFAULT_LANGUAGE.id) ??
      getDefaultLanguage(),
    [selectedLanguageId]
  );

  const lessonStatusOverrides = useLessonStore(
    (state) => state.lessonStatusOverrides
  );
  const selectedLessonByLanguage = useLessonStore(
    (state) => state.selectedLessonByLanguage
  );
  const selectedUnitByLanguage = useLessonStore(
    (state) => state.selectedUnitByLanguage
  );
  const bookmarkedUnitIds = useLessonStore((state) => state.bookmarkedUnitIds);
  const openLesson = useLessonStore((state) => state.openLesson);
  const selectUnit = useLessonStore((state) => state.selectUnit);
  const toggleBookmarkUnit = useLessonStore(
    (state) => state.toggleBookmarkUnit
  );

  const languageUnits = useMemo(
    () => getUnitsByLanguage(selectedLanguage.id),
    [selectedLanguage.id]
  );

  const currentUnit = useMemo(() => {
    const storedUnitId = selectedUnitByLanguage[selectedLanguage.id];
    if (storedUnitId) {
      const matched = languageUnits.find((u) => u.id === storedUnitId);
      if (matched) return matched;
    }
    return getDefaultUnitForLanguage(selectedLanguage.id) ?? languageUnits[0];
  }, [languageUnits, selectedLanguage.id, selectedUnitByLanguage]);

  const unitLessons = useMemo(
    () => (currentUnit ? getLessonsByUnit(currentUnit.id) : []),
    [currentUnit]
  );

  const activeLesson = useMemo(() => {
    const storedLessonId = selectedLessonByLanguage[selectedLanguage.id];
    if (storedLessonId) {
      const matched = unitLessons.find((l) => l.id === storedLessonId);
      if (matched) return matched;
    }
    return (
      unitLessons.find(
        (l) => getEffectiveLessonStatus(l, lessonStatusOverrides) === "in_progress"
      ) ?? unitLessons[0]
    );
  }, [
    lessonStatusOverrides,
    selectedLessonByLanguage,
    selectedLanguage.id,
    unitLessons,
  ]);

  const progressCount = useMemo(() => {
    let completed = 0;
    let hasInProgress = false;
    for (const lesson of unitLessons) {
      const status = getEffectiveLessonStatus(lesson, lessonStatusOverrides);
      if (status === "completed") completed += 1;
      if (status === "in_progress") hasInProgress = true;
    }
    return Math.min(unitLessons.length, completed + (hasInProgress ? 1 : 0));
  }, [lessonStatusOverrides, unitLessons]);

  const isBookmarked = currentUnit
    ? bookmarkedUnitIds.includes(currentUnit.id)
    : false;

  const heroImage = useMemo(
    () => getLessonHeroImage(activeLesson),
    [activeLesson]
  );

  const practiceVocab = useMemo(
    () => unitLessons.flatMap((lesson) => lesson.vocabulary).slice(0, 8),
    [unitLessons]
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleOpenLesson = (lesson: Lesson) => {
    openLesson(lesson);
    posthog?.capture("lesson_opened", {
      lesson_id: lesson.id,
      language_id: lesson.languageId,
      unit_id: lesson.unitId,
    });
    posthogLog.info("lesson opened", {
      lesson_id: lesson.id,
      language_id: lesson.languageId,
    });
    router.push({
      pathname: "/(tabs)/ai-teacher",
      params: { lessonId: lesson.id },
    });
  };

  const handleSelectUnit = (unitId: string) => {
    selectUnit(selectedLanguage.id, unitId);
    setUnitModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Top Header */}
      <View className="flex-row items-center justify-between bg-white px-5 pt-2 pb-3">
        <View className="flex-row items-center gap-3 flex-1 pr-3">
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={10}
            accessibilityLabel="Go back"
            className="w-8 h-9 items-start justify-center"
          >
            <ExpoImage
              source={{ uri: BACK_CHEVRON_URI }}
              style={styles.backIcon}
              contentFit="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={languageUnits.length > 1 ? 0.7 : 1}
            onPress={() => {
              if (languageUnits.length > 1) setUnitModalVisible(true);
            }}
            className="flex-1"
          >
            <Text
              className="font-poppins-semibold text-[18px] leading-[24px] text-neutral-text-primary"
              numberOfLines={1}
            >
              {currentUnit?.title ?? selectedLanguage.name}
            </Text>
            <Text
              className="font-poppins text-[13.5px] leading-[19px] text-neutral-text-secondary mt-0.5"
              numberOfLines={1}
            >
              Unit {currentUnit?.unitNumber ?? 1} • {progressCount} /{" "}
              {unitLessons.length} lessons
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => currentUnit && toggleBookmarkUnit(currentUnit.id)}
          accessibilityLabel={isBookmarked ? "Remove bookmark" : "Bookmark unit"}
          className="w-9 h-9 items-center justify-center"
        >
          <ExpoImage
            source={{ uri: getBookmarkUri(isBookmarked) }}
            style={styles.bookmarkIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Illustration Banner */}
        <View className="w-full h-[210px] bg-[#EEF1F8] overflow-hidden">
          <RNImage
            source={heroImage}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Overlapping Segmented Tabs: Lessons | Practice */}
        <View className="-mt-7 mx-5 z-10">
          <View
            className="flex-row rounded-[20px] bg-[#F3F4F8] p-1"
            style={styles.segmentedContainer}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveTab("lessons")}
              className={`flex-1 rounded-[16px] pt-3 pb-2.5 items-center justify-center relative overflow-hidden ${
                activeTab === "lessons" ? "bg-white" : "bg-transparent"
              }`}
              style={activeTab === "lessons" ? styles.activeSegment : undefined}
            >
              <Text
                className={`text-[15px] leading-[20px] ${
                  activeTab === "lessons"
                    ? "font-poppins-semibold text-primary-lingua-deep-purple"
                    : "font-poppins-medium text-[#4B5563]"
                }`}
              >
                Lessons
              </Text>
              {activeTab === "lessons" && (
                <View className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-primary-lingua-deep-purple" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveTab("practice")}
              className={`flex-1 rounded-[16px] pt-3 pb-2.5 items-center justify-center relative overflow-hidden ${
                activeTab === "practice" ? "bg-white" : "bg-transparent"
              }`}
              style={
                activeTab === "practice" ? styles.activeSegment : undefined
              }
            >
              <Text
                className={`text-[15px] leading-[20px] ${
                  activeTab === "practice"
                    ? "font-poppins-semibold text-primary-lingua-deep-purple"
                    : "font-poppins-medium text-[#4B5563]"
                }`}
              >
                Practice
              </Text>
              {activeTab === "practice" && (
                <View className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-primary-lingua-deep-purple" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === "lessons" ? (
          <View className="px-5 mt-5 gap-3.5">
            {unitLessons.length > 0 ? (
              unitLessons.map((lesson) => {
                const status = getEffectiveLessonStatus(
                  lesson,
                  lessonStatusOverrides
                );
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    status={status}
                    totalUnitLessons={unitLessons.length}
                    onPress={handleOpenLesson}
                  />
                );
              })
            ) : (
              <View className="rounded-[18px] border border-neutral-border bg-white p-6 items-center">
                <Text className="font-poppins-semibold text-base text-neutral-text-primary">
                  No lessons yet for {selectedLanguage.name}
                </Text>
                <Text className="font-poppins text-sm text-neutral-text-secondary text-center mt-1">
                  Switch languages from Home to explore other courses.
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className="px-5 mt-5 gap-3.5">
            {/* Quick AI Practice Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/ai-teacher",
                  params: activeLesson ? { lessonId: activeLesson.id } : undefined,
                })
              }
              className="rounded-[18px] border-[1.5px] border-[#826CF6] bg-[#FAF8FF] p-5"
              style={styles.activeSegment}
            >
              <Text className="font-poppins-medium text-[12.5px] text-primary-lingua-deep-purple">
                AI Speaking Practice
              </Text>
              <Text className="font-poppins-semibold text-[17px] text-neutral-text-primary mt-1">
                Roleplay: {activeLesson?.title ?? currentUnit?.title}
              </Text>
              <Text className="font-poppins text-[13.5px] text-neutral-text-secondary mt-1">
                {activeLesson?.aiTeacherPrompt.scenario ??
                  "Practice speaking with your AI teacher in real time."}
              </Text>
            </TouchableOpacity>

            {/* Unit Vocabulary Review */}
            <View className="rounded-[18px] border border-[#ECEEF4] bg-white p-5">
              <Text className="font-poppins-semibold text-[16px] text-neutral-text-primary mb-3">
                Unit Vocabulary ({practiceVocab.length})
              </Text>
              <View className="gap-3">
                {practiceVocab.map((vocab) => (
                  <View
                    key={vocab.id}
                    className="flex-row items-center justify-between border-b border-[#F3F4F8] pb-2.5"
                  >
                    <View className="flex-1 pr-3">
                      <Text className="font-poppins-semibold text-[15px] text-neutral-text-primary">
                        {vocab.word}
                      </Text>
                      {vocab.phonetic ? (
                        <Text className="font-poppins text-[12px] text-primary-lingua-purple">
                          {vocab.phonetic}
                        </Text>
                      ) : null}
                    </View>
                    <Text className="font-poppins text-[13.5px] text-neutral-text-secondary">
                      {vocab.translation}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Unit Switcher Modal (when language has multiple units) */}
      <Modal
        visible={unitModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setUnitModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setUnitModalVisible(false)}
        >
          <Pressable
            style={styles.modalCard}
            className="w-full max-w-[360px] rounded-[24px] bg-white p-5"
          >
            <Text className="font-poppins-semibold text-[18px] text-neutral-text-primary">
              {selectedLanguage.name} Units
            </Text>
            <Text className="font-poppins text-[13px] text-neutral-text-secondary mt-0.5 mb-4">
              Choose a unit to view its lessons
            </Text>

            <View className="gap-2.5">
              {languageUnits.map((unit) => {
                const isSelected = unit.id === currentUnit?.id;
                const lessonsInUnit = getLessonsByUnit(unit.id);
                return (
                  <TouchableOpacity
                    key={unit.id}
                    activeOpacity={0.8}
                    onPress={() => handleSelectUnit(unit.id)}
                    className={`rounded-[16px] p-4 border ${
                      isSelected
                        ? "border-primary-lingua-purple bg-[#FAF8FF]"
                        : "border-neutral-border bg-white"
                    }`}
                  >
                    <Text className="font-poppins text-[12px] text-neutral-text-secondary">
                      Unit {unit.unitNumber} • {unit.level}
                    </Text>
                    <Text className="font-poppins-semibold text-[15.5px] text-neutral-text-primary mt-0.5">
                      {unit.title}
                    </Text>
                    <Text className="font-poppins text-[12.5px] text-neutral-text-secondary mt-0.5">
                      {lessonsInUnit.length} lessons
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 28,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  segmentedContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  activeSegment: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.16,
        shadowRadius: 24,
      },
      android: { elevation: 10 },
    }),
  },
});
