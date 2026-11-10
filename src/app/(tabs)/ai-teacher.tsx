import { images } from "@/constants/images";
import {
  DEFAULT_LANGUAGE,
  getDefaultLanguage,
  getLanguageById,
} from "@/data/languages";
import {
  getDefaultLessonForLanguage,
  getLessonById,
} from "@/data/lessons";
import { getLessonHeroImage } from "@/lib/lessonImages";
import { posthog } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { toSvgDataUri } from "@/lib/svg";
import { useLanguageStore } from "@/store/languageStore";
import { getEffectiveLessonStatus, useLessonStore } from "@/store/lessonStore";
import { Lesson } from "@/types/learning";
import { useUser } from "@clerk/expo";
import { Image as ExpoImage } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ComponentRef, useEffect, useMemo, useRef, useState } from "react";
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

type SessionStatus = "online" | "listening" | "speaking" | "ended";

interface BubbleTurn {
  primaryText: string;
  subtitleText: string;
}

const BACK_CHEVRON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path stroke="#0D132B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M15 5.5 8.5 12 15 18.5"/>
  </svg>`
);

const BELL_ICON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path stroke="#1E2439" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" d="M18 9.7A6 6 0 0 0 6 9.7c0 6.3-2.6 8.1-2.6 8.1h17.2S18 16 18 9.7ZM13.73 20.5a2 2 0 0 1-3.46 0"/>
  </svg>`
);

function getCameraIconUri(color: string): string {
  return toSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="6.5" width="12.5" height="11" rx="2.4" stroke="${color}" stroke-width="1.9"/>
      <path stroke="${color}" stroke-width="1.9" stroke-linejoin="round" d="M16 10.2 20.2 7.7c.55-.33 1.3.06 1.3.71v7.18c0 .65-.75 1.04-1.3.71L16 13.8v-3.6Z"/>
    </svg>`
  );
}

function getSolidCameraIconUri(color: string): string {
  return toSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6.5" width="13" height="11" rx="2.5" fill="${color}"/>
      <path fill="${color}" d="M16.8 10.1 20.2 7.9c.65-.42 1.5.05 1.5.82v6.56c0 .77-.85 1.24-1.5.82l-3.4-2.2v-3.8Z"/>
    </svg>`
  );
}

function getMicIconUri(color: string): string {
  return toSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3.5" width="6" height="10.5" rx="3" fill="${color}"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/>
    </svg>`
  );
}

function getSubtitlesIconUri(color: string): string {
  return toSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="m4.5 7 5 5M3.5 12l5-5 1.8-2M2.5 5h10M7 2.5V5M13.5 19.5l4-10 4 10M14.7 16.5h5.6"/>
    </svg>`
  );
}

const END_CALL_ICON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fill="#FFFFFF" d="M4.3 14.9c-.7-.7-.6-1.8.2-2.4 2.2-1.6 4.8-2.5 7.5-2.5s5.3.9 7.5 2.5c.8.6.9 1.7.2 2.4l-1.4 1.4c-.5.5-1.3.6-1.9.2l-1.9-1.2c-.5-.3-.8-.9-.8-1.5v-.7c-1.1-.2-2.3-.2-3.4 0v.7c0 .6-.3 1.2-.8 1.5l-1.9 1.2c-.6.4-1.4.3-1.9-.2l-1.4-1.4Z"/>
  </svg>`
);

function getSpeakerIconUri(color: string): string {
  return toSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="${color}" d="M4.5 9.5A1.5 1.5 0 0 1 6 8h3.2l4.4-3.6a.9.9 0 0 1 1.4.7v13.8a.9.9 0 0 1-1.4.7L9.2 16H6a1.5 1.5 0 0 1-1.5-1.5v-5Z"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" d="M17.5 9.2a4.2 4.2 0 0 1 0 5.6M19.8 6.8a7.4 7.4 0 0 1 0 10.4"/>
    </svg>`
  );
}

function buildLessonTurns(lesson: Lesson): BubbleTurn[] {
  const turns: BubbleTurn[] = [];

  for (const item of lesson.phrases) {
    turns.push({
      primaryText: item.phrase,
      subtitleText: item.translation,
    });
  }

  if (lesson.aiTeacherPrompt.sampleDialogues) {
    for (const turn of lesson.aiTeacherPrompt.sampleDialogues) {
      if (turn.speaker === "teacher") {
        turns.push({
          primaryText: turn.text,
          subtitleText: turn.translation ?? lesson.aiTeacherPrompt.scenario,
        });
      }
    }
  }

  if (turns.length === 0) {
    turns.push({
      primaryText: lesson.aiTeacherPrompt.keyPhrasesToElicit[0] ?? lesson.title,
      subtitleText: lesson.aiTeacherPrompt.welcomeMessage,
    });
  }

  return turns;
}

const FEEDBACK_LEVELS = [
  { speaking: "Excellent", pronunciation: "Great", grammar: "Good" },
  { speaking: "Great", pronunciation: "Excellent", grammar: "Great" },
  { speaking: "Excellent", pronunciation: "Excellent", grammar: "Great" },
] as const;

export default function AITeacherScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const { user } = useUser();

  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );
  const lessonStatusOverrides = useLessonStore(
    (state) => state.lessonStatusOverrides
  );
  const selectedLessonByLanguage = useLessonStore(
    (state) => state.selectedLessonByLanguage
  );
  const completeLesson = useLessonStore((state) => state.completeLesson);

  const activeLanguageId = selectedLanguageId ?? DEFAULT_LANGUAGE.id;

  const lesson = useMemo(() => {
    if (typeof lessonId === "string" && lessonId.length > 0) {
      const matched = getLessonById(lessonId);
      if (matched && matched.languageId === activeLanguageId) {
        return matched;
      }
    }
    const storedLessonId = selectedLessonByLanguage[activeLanguageId];
    if (storedLessonId) {
      const storedLesson = getLessonById(storedLessonId);
      if (storedLesson) return storedLesson;
    }
    return (
      getDefaultLessonForLanguage(activeLanguageId) ??
      getDefaultLessonForLanguage(DEFAULT_LANGUAGE.id)
    );
  }, [activeLanguageId, lessonId, selectedLessonByLanguage]);

  const language = useMemo(
    () =>
      getLanguageById(lesson?.languageId ?? activeLanguageId) ??
      getDefaultLanguage(),
    [activeLanguageId, lesson?.languageId]
  );

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="font-poppins-semibold text-lg text-neutral-text-primary">
            No audio lesson selected
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.replace("/(tabs)/learn")}
            className="mt-4 rounded-2xl bg-primary-lingua-purple px-6 py-3"
          >
            <Text className="font-poppins-semibold text-sm text-white">
              Browse Lessons
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isCompleted =
    getEffectiveLessonStatus(lesson, lessonStatusOverrides) === "completed";

  return (
    <AITeacherSession
      key={lesson.id}
      lesson={lesson}
      languageFlag={language.flag}
      languageName={language.name}
      isCompleted={isCompleted}
      userImageUrl={user?.imageUrl}
      onCompleteLesson={() => {
        completeLesson(lesson);
        posthog?.capture("lesson_completed", {
          lesson_id: lesson.id,
          language_id: lesson.languageId,
          xp_reward: lesson.xpReward,
          source: "ai_teacher_audio",
        });
        router.replace("/(tabs)/learn");
      }}
    />
  );
}

interface AITeacherSessionProps {
  lesson: Lesson;
  languageFlag: string;
  languageName: string;
  isCompleted: boolean;
  userImageUrl?: string;
  onCompleteLesson: () => void;
}

function AITeacherSession({
  lesson,
  languageFlag,
  languageName,
  isCompleted,
  userImageUrl,
  onCompleteLesson,
}: AITeacherSessionProps) {
  const turns = useMemo(() => buildLessonTurns(lesson), [lesson]);

  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("online");
  const [showPreview, setShowPreview] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [activeTurnIndex, setActiveTurnIndex] = useState(0);
  const [practiceTurnsCount, setPracticeTurnsCount] = useState(0);

  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearPendingTimer();
  }, []);

  const heroImage = getLessonHeroImage(lesson);
  const currentTurn = turns[activeTurnIndex % Math.max(turns.length, 1)] ?? {
    primaryText: lesson.title,
    subtitleText: lesson.aiTeacherPrompt.welcomeMessage,
  };
  const currentFeedback =
    FEEDBACK_LEVELS[practiceTurnsCount % FEEDBACK_LEVELS.length];

  const statusConfig: Record<
    SessionStatus,
    { label: string; dotColor: string }
  > = {
    online: { label: "Online", dotColor: "#56B83B" },
    listening: { label: "Listening...", dotColor: "#6C4EF5" },
    speaking: { label: "Speaking...", dotColor: "#4D8BFF" },
    ended: { label: "Session ended", dotColor: "#9CA3AF" },
  };
  const currentStatus = statusConfig[sessionStatus];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/learn");
    }
  };

  const handleScrollToContext = () => {
    scrollRef.current?.scrollTo({ y: 480, animated: true });
  };

  const handlePlayTeacherAudio = () => {
    clearPendingTimer();
    setSessionStatus("speaking");
    posthog?.capture("ai_teacher_audio_played", {
      lesson_id: lesson.id,
      language_id: lesson.languageId,
    });

    timerRef.current = setTimeout(() => {
      setSessionStatus("online");
    }, 1400);
  };

  const handleMicPress = () => {
    clearPendingTimer();

    if (sessionStatus === "ended") {
      setSessionStatus("online");
    }

    if (sessionStatus === "listening") {
      // Finish speaking turn and advance to next teacher response.
      setSessionStatus("speaking");
      setPracticeTurnsCount((count) => count + 1);
      if (turns.length > 1) {
        setActiveTurnIndex((index) => (index + 1) % turns.length);
      }
      posthog?.capture("ai_teacher_mic_turn_completed", {
        lesson_id: lesson.id,
        language_id: lesson.languageId,
      });

      timerRef.current = setTimeout(() => {
        setSessionStatus("online");
      }, 1200);
      return;
    }

    setSessionStatus("listening");
    posthogLog.info("audio mic started", {
      lesson_id: lesson.id,
      language_id: lesson.languageId,
    });
  };

  const handleSelectPhrase = (index: number) => {
    clearPendingTimer();
    setActiveTurnIndex(index);
    setSessionStatus("speaking");
    timerRef.current = setTimeout(() => {
      setSessionStatus("online");
    }, 1200);
  };

  const handleEndCall = () => {
    clearPendingTimer();
    setSessionStatus("ended");
    posthog?.capture("ai_teacher_session_ended", {
      lesson_id: lesson.id,
      turns_completed: practiceTurnsCount,
    });
  };

  const handleRestartSession = () => {
    clearPendingTimer();
    setSessionStatus("online");
    setActiveTurnIndex(0);
  };

  const previewSource = userImageUrl
    ? { uri: userImageUrl }
    : images.aiTeacherAvatar;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Top Header */}
      <View className="flex-row items-center justify-between bg-white px-5 pt-2 pb-3">
        <View className="flex-row items-center gap-3 flex-1 pr-2">
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

          <View className="flex-1">
            <Text
              className="font-poppins-semibold text-[18px] leading-[23px] text-neutral-text-primary"
              numberOfLines={1}
            >
              AI Teacher
            </Text>
            <View className="flex-row items-center gap-1.5 mt-0.5">
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: currentStatus.dotColor },
                ]}
              />
              <Text
                className="font-poppins text-[13px] leading-[18px] text-neutral-text-secondary"
                numberOfLines={1}
              >
                {currentStatus.label}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setShowPreview((prev) => !prev)}
            accessibilityLabel={
              showPreview
                ? "Hide visual preview placeholder"
                : "Show visual preview placeholder"
            }
            className={`w-10 h-10 rounded-full border items-center justify-center ${
              showPreview
                ? "border-[#E5E7EB] bg-white"
                : "border-[#D1D5DB] bg-[#F3F4F6]"
            }`}
          >
            <ExpoImage
              source={{
                uri: getCameraIconUri(showPreview ? "#1E2439" : "#6B7280"),
              }}
              style={styles.headerIcon}
              contentFit="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleScrollToContext}
            accessibilityLabel="Lesson streak and details"
            className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white items-center justify-center"
          >
            <Text className="font-poppins-medium text-[14px] text-neutral-text-primary">
              12
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleScrollToContext}
            accessibilityLabel="View lesson context and goals"
            className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white items-center justify-center"
          >
            <ExpoImage
              source={{ uri: BELL_ICON_URI }}
              style={styles.headerIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Audio Stage Card */}
        <View
          className="mx-4 rounded-[28px] overflow-hidden relative bg-[#DCD6CE]"
          style={styles.stageCard}
        >
          {/* Soft Blurred Lesson Environment Backdrop */}
          <RNImage
            source={heroImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            blurRadius={22}
          />
          <View style={styles.backdropTint} />

          {/* Top Bar inside Stage: Selected Lesson Pill + Visual Preview Placeholder */}
          <View className="flex-row items-start justify-between px-3.5 pt-3.5 z-10">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleScrollToContext}
              className="max-w-[205px] rounded-[16px] px-3 py-2"
              style={styles.lessonOverlayPill}
            >
              <Text
                className="font-poppins-medium text-[11.5px] leading-[15px] text-white/90"
                numberOfLines={1}
              >
                {languageFlag} {languageName} • Lesson {lesson.lessonNumber}
              </Text>
              <Text
                className="font-poppins-semibold text-[13.5px] leading-[18px] text-white mt-0.5"
                numberOfLines={1}
              >
                {lesson.title}
              </Text>
            </TouchableOpacity>

            {showPreview ? (
              <View
                className="w-[88px] h-[116px] rounded-[18px] overflow-hidden border-2 border-white/95 bg-[#E5E7EB]"
                style={styles.previewShadow}
              >
                <RNImage
                  source={previewSource}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <View style={styles.audioOnlyBadge}>
                  <Text className="font-poppins-medium text-[9.5px] text-white">
                    Audio only
                  </Text>
                </View>
              </View>
            ) : (
              <View className="w-[88px] h-[116px]" />
            )}
          </View>

          {/* AI Teacher Mascot */}
          <View className="items-center justify-end -mt-8 z-0">
            <RNImage
              source={images.mascotAuth}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Teacher Response Speech Bubble */}
          <View className="px-6 -mt-11 z-20">
            <View
              className="rounded-[20px] bg-white px-5 py-3.5 flex-row items-center justify-between gap-3 relative"
              style={styles.bubbleShadow}
            >
              <View className="flex-1">
                <Text
                  className="font-poppins-medium text-[16.5px] leading-[23px] text-neutral-text-primary"
                  numberOfLines={2}
                >
                  {sessionStatus === "ended"
                    ? "Great practice today!"
                    : sessionStatus === "listening"
                      ? `Say: "${currentTurn.primaryText}"`
                      : currentTurn.primaryText}
                </Text>

                {subtitlesEnabled ? (
                  <Text
                    className="font-poppins text-[14.5px] leading-[21px] text-[#374151] mt-0.5"
                    numberOfLines={2}
                  >
                    {sessionStatus === "ended"
                      ? `Tap Resume or complete ${lesson.title} for +${lesson.xpReward} XP.`
                      : currentTurn.subtitleText}
                  </Text>
                ) : (
                  <Text className="font-poppins text-[12.5px] leading-[18px] text-neutral-text-secondary mt-0.5">
                    Subtitles hidden
                  </Text>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handlePlayTeacherAudio}
                accessibilityLabel="Play AI teacher voice"
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  sessionStatus === "speaking" ? "bg-[#EFEAFF]" : "bg-transparent"
                }`}
              >
                <ExpoImage
                  source={{ uri: getSpeakerIconUri("#5B3BF6") }}
                  style={styles.speakerIcon}
                  contentFit="contain"
                />
              </TouchableOpacity>

              {/* Speech Bubble Pointer */}
              <View style={styles.bubbleTail} />
            </View>
          </View>

          {/* Audio Controls Row */}
          <View className="flex-row items-start justify-between px-5 mt-6 mb-4 z-10">
            {/* Visual Preview Toggle */}
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => setShowPreview((prev) => !prev)}
              accessibilityLabel="Toggle visual preview"
              className="items-center gap-1.5 flex-1"
            >
              <View
                className={`w-[56px] h-[56px] rounded-full items-center justify-center ${
                  showPreview ? "bg-white" : "bg-white/75"
                }`}
                style={styles.controlShadow}
              >
                <ExpoImage
                  source={{
                    uri: getSolidCameraIconUri(
                      showPreview ? "#0D132B" : "#6B7280"
                    ),
                  }}
                  style={styles.controlIcon}
                  contentFit="contain"
                />
              </View>
              <Text className="font-poppins-medium text-[12.5px] text-white">
                Camera
              </Text>
            </TouchableOpacity>

            {/* Mic Audio Control */}
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={handleMicPress}
              accessibilityLabel={
                sessionStatus === "listening"
                  ? "Stop speaking"
                  : "Start speaking"
              }
              className="items-center gap-1.5 flex-1"
            >
              <View
                className={`w-[56px] h-[56px] rounded-full items-center justify-center ${
                  sessionStatus === "listening"
                    ? "bg-primary-lingua-purple"
                    : "bg-white"
                }`}
                style={styles.controlShadow}
              >
                <ExpoImage
                  source={{
                    uri: getMicIconUri(
                      sessionStatus === "listening" ? "#FFFFFF" : "#0D132B"
                    ),
                  }}
                  style={styles.controlIcon}
                  contentFit="contain"
                />
              </View>
              <Text className="font-poppins-medium text-[12.5px] text-white">
                {sessionStatus === "listening" ? "Listening" : "Mic"}
              </Text>
            </TouchableOpacity>

            {/* Subtitles Toggle */}
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => setSubtitlesEnabled((prev) => !prev)}
              accessibilityLabel="Toggle subtitles"
              className="items-center gap-1.5 flex-1"
            >
              <View
                className={`w-[56px] h-[56px] rounded-full items-center justify-center ${
                  subtitlesEnabled ? "bg-white" : "bg-white/75"
                }`}
                style={styles.controlShadow}
              >
                <ExpoImage
                  source={{
                    uri: getSubtitlesIconUri(
                      subtitlesEnabled ? "#0D132B" : "#6B7280"
                    ),
                  }}
                  style={styles.controlIcon}
                  contentFit="contain"
                />
              </View>
              <Text className="font-poppins-medium text-[12.5px] text-white">
                Subtitles
              </Text>
            </TouchableOpacity>

            {/* End Call */}
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={
                sessionStatus === "ended" ? handleRestartSession : handleEndCall
              }
              accessibilityLabel={
                sessionStatus === "ended" ? "Resume call" : "End audio call"
              }
              className="items-center gap-1.5 flex-1"
            >
              <View
                className={`w-[56px] h-[56px] rounded-full items-center justify-center ${
                  sessionStatus === "ended" ? "bg-[#21C16B]" : "bg-[#E5483F]"
                }`}
                style={styles.controlShadow}
              >
                <ExpoImage
                  source={{
                    uri:
                      sessionStatus === "ended"
                        ? getMicIconUri("#FFFFFF")
                        : END_CALL_ICON_URI,
                  }}
                  style={styles.controlIcon}
                  contentFit="contain"
                />
              </View>
              <Text className="font-poppins-medium text-[12.5px] text-white">
                {sessionStatus === "ended" ? "Resume" : "End Call"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lesson Feedback Card */}
          <View
            className="mx-3.5 mb-3.5 rounded-[20px] bg-white px-3 py-3.5 flex-row items-center z-10"
            style={styles.feedbackShadow}
          >
            <View className="flex-1 items-center px-1">
              <Text className="font-poppins-medium text-[13.5px] text-neutral-text-primary">
                Speaking
              </Text>
              <Text className="font-poppins-medium text-[13.5px] text-[#45A832] mt-1">
                {currentFeedback.speaking}
              </Text>
            </View>

            <View className="w-[1px] h-9 bg-[#E5E7EB]" />

            <View className="flex-1 items-center px-1">
              <Text className="font-poppins-medium text-[13.5px] text-neutral-text-primary">
                Pronunciation
              </Text>
              <Text className="font-poppins-medium text-[13.5px] text-[#2B7BF6] mt-1">
                {currentFeedback.pronunciation}
              </Text>
            </View>

            <View className="w-[1px] h-9 bg-[#E5E7EB]" />

            <View className="flex-1 items-center px-1">
              <Text className="font-poppins-medium text-[13.5px] text-neutral-text-primary">
                Grammar
              </Text>
              <Text className="font-poppins-medium text-[13.5px] text-primary-lingua-deep-purple mt-1">
                {currentFeedback.grammar}
              </Text>
            </View>
          </View>
        </View>

        {/* Session Wrap-Up CTA when ended */}
        {sessionStatus === "ended" && (
          <View className="mx-4 mt-3.5 rounded-[20px] border border-[#E5DFFF] bg-[#FAF8FF] p-4 flex-row items-center justify-between gap-3">
            <View className="flex-1">
              <Text className="font-poppins-semibold text-[15px] text-neutral-text-primary">
                Audio lesson paused
              </Text>
              <Text className="font-poppins text-[12.5px] text-neutral-text-secondary mt-0.5">
                {isCompleted
                  ? "Lesson already completed — review anytime."
                  : `Finish to earn +${lesson.xpReward} XP.`}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCompleteLesson}
              className="rounded-[14px] bg-primary-lingua-purple px-4 py-2.5"
            >
              <Text className="font-poppins-semibold text-[13px] text-white">
                {isCompleted ? "Done" : `Finish +${lesson.xpReward} XP`}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Selected Lesson Context, Goals & Phrases */}
        <View className="px-4 pt-4 gap-3.5">
          {/* Lesson & AI Teacher Context Card */}
          <View className="rounded-[20px] border border-[#ECEEF4] bg-white p-4">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="font-poppins-medium text-[12.5px] text-primary-lingua-deep-purple">
                {languageFlag} {languageName} • Lesson {lesson.lessonNumber}
              </Text>
              <View className="rounded-full bg-[#FAF8FF] border border-[#E5DFFF] px-2.5 py-0.5">
                <Text className="font-poppins-semibold text-[11.5px] text-primary-lingua-deep-purple">
                  +{lesson.xpReward} XP
                </Text>
              </View>
            </View>

            <Text className="font-poppins-semibold text-[18px] leading-[24px] text-neutral-text-primary mt-1.5">
              {lesson.title}
            </Text>
            <Text className="font-poppins text-[13.5px] leading-[20px] text-neutral-text-secondary mt-1">
              {lesson.aiTeacherPrompt.scenario}
            </Text>

            <View className="mt-3 rounded-[14px] bg-[#FAF8FF] border border-[#ECE6FF] p-3">
              <Text className="font-poppins-medium text-[12px] text-primary-lingua-deep-purple">
                AI Teacher Context
              </Text>
              <Text className="font-poppins text-[13px] leading-[19px] text-[#374151] mt-1">
                {lesson.aiTeacherPrompt.welcomeMessage}
              </Text>
            </View>

            {lesson.aiTeacherPrompt.feedbackCriteria.length > 0 && (
              <View className="flex-row flex-wrap gap-1.5 mt-3">
                {lesson.aiTeacherPrompt.feedbackCriteria.map((criterion) => (
                  <View
                    key={criterion}
                    className="rounded-full bg-[#F3F4F8] px-2.5 py-1"
                  >
                    <Text className="font-poppins text-[11.5px] text-[#4B5563]">
                      {criterion}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Lesson Goal Card */}
          <View className="rounded-[20px] border border-[#ECEEF4] bg-white p-4">
            <Text className="font-poppins-semibold text-[16px] text-neutral-text-primary mb-2.5">
              Lesson Goal
            </Text>
            <View className="gap-2">
              {lesson.goals.map((goal, index) => (
                <View key={index} className="flex-row items-start gap-2.5">
                  <View className="w-2 h-2 rounded-full bg-primary-lingua-purple mt-2" />
                  <Text className="flex-1 font-poppins text-[13.5px] leading-[20px] text-[#374151]">
                    {goal}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Phrases Card */}
          <View className="rounded-[20px] border border-[#ECEEF4] bg-white p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-poppins-semibold text-[16px] text-neutral-text-primary">
                Lesson Phrases
              </Text>
              <Text className="font-poppins-medium text-[12px] text-primary-lingua-purple">
                Tap to practice
              </Text>
            </View>

            <View className="gap-2.5">
              {lesson.phrases.map((item, index) => {
                const isActive =
                  turns[activeTurnIndex % Math.max(turns.length, 1)]
                    ?.primaryText === item.phrase;
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => handleSelectPhrase(index)}
                    className={`rounded-[14px] border p-3.5 ${
                      isActive
                        ? "border-[#826CF6] bg-[#FAF8FF]"
                        : "border-[#F0F2F7] bg-[#FAFBFD]"
                    }`}
                  >
                    <View className="flex-row items-center justify-between gap-2">
                      <Text className="flex-1 font-poppins-semibold text-[15px] text-neutral-text-primary">
                        {item.phrase}
                      </Text>
                      <ExpoImage
                        source={{ uri: getSpeakerIconUri("#5B3BF6") }}
                        style={styles.phraseSpeakerIcon}
                        contentFit="contain"
                      />
                    </View>

                    {subtitlesEnabled && (
                      <Text className="font-poppins text-[13.5px] text-primary-lingua-deep-purple mt-0.5">
                        {item.translation}
                      </Text>
                    )}

                    {item.phonetic ? (
                      <Text className="font-poppins text-[12px] text-neutral-text-secondary mt-0.5">
                        /{item.phonetic}/
                      </Text>
                    ) : null}

                    {item.context ? (
                      <Text className="font-poppins text-[12px] text-[#6B7280] mt-1">
                        {item.context}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stageCard: {
    minHeight: 560,
  },
  backdropTint: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(38, 32, 28, 0.24)",
  },
  lessonOverlayPill: {
    backgroundColor: "rgba(13, 19, 43, 0.48)",
  },
  previewShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
      },
      android: { elevation: 6 },
    }),
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  audioOnlyBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    right: 6,
    borderRadius: 8,
    backgroundColor: "rgba(13, 19, 43, 0.6)",
    paddingVertical: 2,
    alignItems: "center",
  },
  mascotImage: {
    width: 280,
    height: 260,
  },
  bubbleShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
      },
      android: { elevation: 6 },
    }),
  },
  bubbleTail: {
    position: "absolute",
    right: 26,
    bottom: -7,
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
    borderRadius: 2,
  },
  speakerIcon: {
    width: 22,
    height: 22,
  },
  phraseSpeakerIcon: {
    width: 18,
    height: 18,
  },
  controlShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  controlIcon: {
    width: 24,
    height: 24,
  },
  feedbackShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
});
