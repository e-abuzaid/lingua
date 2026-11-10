import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getLessonHeroImage } from "@/lib/lessonImages";
import { posthog } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { toSvgDataUri } from "@/lib/svg";
import { getEffectiveLessonStatus, useLessonStore } from "@/store/lessonStore";
import { Image as ExpoImage } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image as RNImage,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BACK_CHEVRON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path stroke="#0D132B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M15 5.5 8.5 12 15 18.5"/>
  </svg>`
);

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = useMemo(
    () => (typeof id === "string" ? getLessonById(id) : undefined),
    [id]
  );

  const lessonStatusOverrides = useLessonStore(
    (state) => state.lessonStatusOverrides
  );
  const completeLesson = useLessonStore((state) => state.completeLesson);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="font-poppins-semibold text-lg text-neutral-text-primary">
            Lesson not found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 rounded-2xl bg-primary-lingua-purple px-6 py-3"
          >
            <Text className="font-poppins-semibold text-sm text-white">
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const language = getLanguageById(lesson.languageId);
  const status = getEffectiveLessonStatus(lesson, lessonStatusOverrides);
  const isCompleted = status === "completed";
  const heroImage = getLessonHeroImage(lesson);
  const firstQuiz = lesson.activities.find(
    (activity) => activity.options && activity.options.length > 0
  );

  const handleComplete = () => {
    completeLesson(lesson);
    posthog?.capture("lesson_completed", {
      lesson_id: lesson.id,
      language_id: lesson.languageId,
      xp_reward: lesson.xpReward,
    });
    posthogLog.info("lesson completed", {
      lesson_id: lesson.id,
      xp_reward: lesson.xpReward,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3 bg-white border-b border-[#F3F4F8]">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={10}
          accessibilityLabel="Back to lessons"
          className="w-9 h-9 items-start justify-center"
        >
          <ExpoImage
            source={{ uri: BACK_CHEVRON_URI }}
            style={styles.backIcon}
            contentFit="contain"
          />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="font-poppins-semibold text-[16px] text-neutral-text-primary">
            Lesson {lesson.lessonNumber}
          </Text>
          <Text className="font-poppins text-[12px] text-neutral-text-secondary">
            {language?.name ?? "Language"} • {lesson.estimatedMinutes} min
          </Text>
        </View>

        <View className="rounded-full bg-[#FAF8FF] border border-[#E5DFFF] px-3 py-1">
          <Text className="font-poppins-semibold text-[12.5px] text-primary-lingua-deep-purple">
            +{lesson.xpReward} XP
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Lesson Hero Card */}
        <View className="rounded-[22px] overflow-hidden border border-[#ECEEF4] bg-white">
          <View className="w-full h-[180px] bg-[#EEF1F8]">
            <RNImage
              source={heroImage}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          <View className="p-5">
            <View className="flex-row items-center justify-between">
              <View
                className={`rounded-full px-3 py-1 ${
                  isCompleted ? "bg-[#EAF8E6]" : "bg-[#F0ECFE]"
                }`}
              >
                <Text
                  className={`font-poppins-medium text-[12px] ${
                    isCompleted
                      ? "text-[#389B24]"
                      : "text-primary-lingua-deep-purple"
                  }`}
                >
                  {isCompleted ? "Completed" : "In progress"}
                </Text>
              </View>
              <Text className="font-poppins text-[12.5px] text-neutral-text-secondary">
                {lesson.vocabulary.length} words • {lesson.phrases.length}{" "}
                phrases
              </Text>
            </View>

            <Text className="font-poppins-bold text-[22px] leading-[29px] text-neutral-text-primary mt-3">
              {lesson.title}
            </Text>
            <Text className="font-poppins text-[14px] leading-[21px] text-neutral-text-secondary mt-1.5">
              {lesson.description}
            </Text>
          </View>
        </View>

        {/* Lesson Goals */}
        <View className="mt-5 rounded-[20px] border border-[#ECEEF4] bg-white p-5">
          <Text className="font-poppins-semibold text-[16px] text-neutral-text-primary mb-3">
            What you&apos;ll learn
          </Text>
          <View className="gap-2.5">
            {lesson.goals.map((goal, index) => (
              <View key={index} className="flex-row items-start gap-2.5">
                <View className="w-2 h-2 rounded-full bg-primary-lingua-purple mt-2" />
                <Text className="flex-1 font-poppins text-[14px] leading-[21px] text-[#374151]">
                  {goal}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Key Vocabulary */}
        <View className="mt-4 rounded-[20px] border border-[#ECEEF4] bg-white p-5">
          <Text className="font-poppins-semibold text-[16px] text-neutral-text-primary mb-3">
            Key Vocabulary
          </Text>
          <View className="gap-3">
            {lesson.vocabulary.map((item) => (
              <View
                key={item.id}
                className="rounded-[14px] bg-[#FAFBFD] border border-[#F0F2F7] p-3.5"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="font-poppins-semibold text-[15px] text-neutral-text-primary">
                    {item.word}
                  </Text>
                  <Text className="font-poppins-medium text-[13.5px] text-primary-lingua-deep-purple">
                    {item.translation}
                  </Text>
                </View>
                {item.phonetic ? (
                  <Text className="font-poppins text-[12px] text-neutral-text-secondary mt-0.5">
                    /{item.phonetic}/
                  </Text>
                ) : null}
                {item.exampleSentence ? (
                  <Text className="font-poppins text-[13px] text-[#4B5563] mt-1.5">
                    {item.exampleSentence} — {item.exampleTranslation}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Practice Activity */}
        {firstQuiz && firstQuiz.options ? (
          <View className="mt-4 rounded-[20px] border border-[#ECEEF4] bg-white p-5">
            <Text className="font-poppins-medium text-[12.5px] text-primary-lingua-deep-purple">
              Quick Check
            </Text>
            <Text className="font-poppins-semibold text-[15.5px] text-neutral-text-primary mt-1">
              {firstQuiz.prompt}
            </Text>
            {firstQuiz.question ? (
              <Text className="font-poppins-bold text-[18px] text-neutral-text-primary mt-2 mb-3">
                {firstQuiz.question}
              </Text>
            ) : null}

            <View className="gap-2.5 mt-1">
              {firstQuiz.options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === firstQuiz.correctAnswer;
                let styleClasses = "border-[#E5E7EB] bg-white";
                if (isSelected) {
                  styleClasses = isCorrect
                    ? "border-[#56B83B] bg-[#F2FBF0]"
                    : "border-[#FF4D4F] bg-[#FFF5F5]";
                }
                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.8}
                    onPress={() => setSelectedOption(option)}
                    className={`rounded-[14px] border px-4 py-3 ${styleClasses}`}
                  >
                    <Text className="font-poppins-medium text-[14.5px] text-neutral-text-primary">
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedOption ? (
              <Text
                className={`mt-3 font-poppins-medium text-[13px] ${
                  selectedOption === firstQuiz.correctAnswer
                    ? "text-[#389B24]"
                    : "text-[#D9363E]"
                }`}
              >
                {selectedOption === firstQuiz.correctAnswer
                  ? `Correct! ${firstQuiz.explanation ?? ""}`
                  : "Try another option!"}
              </Text>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        className="px-5 pt-3 pb-4 bg-white border-t border-[#F3F4F8] gap-2.5"
        style={styles.bottomBar}
      >
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleComplete}
          className="w-full rounded-[16px] bg-primary-lingua-purple py-3.5 items-center justify-center"
        >
          <Text className="font-poppins-semibold text-[15.5px] text-white">
            {isCompleted
              ? "Mark Reviewed & Return"
              : `Complete Lesson (+${lesson.xpReward} XP)`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/ai-teacher",
              params: { lessonId: lesson.id },
            })
          }
          className="w-full rounded-[16px] border border-[#E5DFFF] bg-[#FAF8FF] py-3 items-center justify-center"
        >
          <Text className="font-poppins-semibold text-[14.5px] text-primary-lingua-deep-purple">
            Practice with AI Teacher
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  bottomBar: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
});
