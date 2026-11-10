import { CircularFlag } from "@/components/LanguageCard";
import { TodayPlanRow } from "@/components/TodayPlanRow";
import { images } from "@/constants/images";
import {
  DEFAULT_LANGUAGE,
  getDefaultLanguage,
  getLanguageById,
} from "@/data/languages";
import {
  getDefaultLessonForLanguage,
  getLessonsByUnit,
} from "@/data/lessons";
import { getDefaultUnitForLanguage } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { useLanguageStore } from "@/store/languageStore";
import { TodayPlanItem } from "@/types/learning";
import { useUser } from "@clerk/expo";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function toSvgDataUri(svg: string): string {
  let output = "";
  for (let i = 0; i < svg.length; i += 3) {
    const b1 = svg.charCodeAt(i) & 0xff;
    const b2 = i + 1 < svg.length ? svg.charCodeAt(i + 1) & 0xff : 0;
    const b3 = i + 2 < svg.length ? svg.charCodeAt(i + 2) & 0xff : 0;
    const triplet = (b1 << 16) | (b2 << 8) | b3;

    output += BASE64_CHARS[(triplet >> 18) & 0x3f];
    output += BASE64_CHARS[(triplet >> 12) & 0x3f];
    output += i + 1 < svg.length ? BASE64_CHARS[(triplet >> 6) & 0x3f] : "=";
    output += i + 2 < svg.length ? BASE64_CHARS[triplet & 0x3f] : "=";
  }
  return `data:image/svg+xml;base64,${output}`;
}

const BELL_ICON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path stroke="#1E2439" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M18 9.7A6 6 0 0 0 6 9.7c0 6.3-2.6 8.1-2.6 8.1h17.2S18 16 18 9.7ZM13.73 20.5a2 2 0 0 1-3.46 0"/>
  </svg>`
);

const VIDEO_ICON_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6.5" width="12.5" height="11" rx="2.5" fill="#FFFFFF"/>
    <path fill="#FFFFFF" d="M16.8 10.1 20.2 7.9c.65-.42 1.5.05 1.5.82v6.56c0 .77-.85 1.24-1.5.82l-3.4-2.2v-3.8Z"/>
  </svg>`
);

const HERO_CARD_BG_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="184" viewBox="0 0 360 184" fill="none">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="360" y2="184" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4B38EF"/>
        <stop offset="0.55" stop-color="#5E43F5"/>
        <stop offset="1" stop-color="#7A62F9"/>
      </linearGradient>
    </defs>
    <rect width="360" height="184" fill="url(#bg)"/>
    <path fill="#5237EC" fill-opacity="0.7" d="M188 184c20-52 46-96 76-96 28 0 54 38 96 58v38H188Z"/>
    <path fill="#452ADE" fill-opacity="0.75" d="M136 184c14-26 26-48 38-48 11 0 18 18 28 18 12 0 22-36 35-36 14 0 24 40 36 66H136Z"/>
  </svg>`
);

const DAILY_GOAL_XP = 20;
const DEFAULT_STREAK = 12;

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );

  const selectedLanguage = useMemo(
    () =>
      getLanguageById(selectedLanguageId ?? DEFAULT_LANGUAGE.id) ??
      getDefaultLanguage(),
    [selectedLanguageId]
  );

  const currentUnit = useMemo(
    () => getDefaultUnitForLanguage(selectedLanguage.id),
    [selectedLanguage.id]
  );

  const currentLesson = useMemo(
    () => getDefaultLessonForLanguage(selectedLanguage.id),
    [selectedLanguage.id]
  );

  const unitLessons = useMemo(
    () => (currentUnit ? getLessonsByUnit(currentUnit.id) : []),
    [currentUnit]
  );

  const firstName = useMemo(() => {
    const rawName =
      user?.firstName?.trim() ||
      user?.fullName?.trim()?.split(" ")[0] ||
      user?.username?.trim() ||
      user?.primaryEmailAddress?.emailAddress?.split("@")[0];
    return rawName && rawName.length > 0 ? rawName : "Alex";
  }, [user]);

  const dailyXp = currentLesson?.xpReward ?? 15;
  const progressPercent = Math.min(
    100,
    Math.round((dailyXp / DAILY_GOAL_XP) * 100)
  );
  const unitLevel = currentUnit?.level ?? selectedLanguage.level ?? "A1";
  const unitNumber = currentUnit?.unitNumber ?? 3;

  const todayPlanItems = useMemo<TodayPlanItem[]>(() => {
    const rawLessonTitle = currentLesson?.title ?? "At the café";
    const formattedLessonTitle =
      rawLessonTitle === "At the Café" ? "At the café" : rawLessonTitle;

    return [
      {
        id: "plan-lesson",
        title: "Lesson",
        subtitle: formattedLessonTitle,
        type: "lesson",
        completed: true,
        lessonId: currentLesson?.id,
        xpReward: dailyXp,
      },
      {
        id: "plan-ai-conversation",
        title: "AI Conversation",
        subtitle: "Talk about your day",
        type: "ai_conversation",
        completed: false,
        lessonId: unitLessons[1]?.id ?? currentLesson?.id,
      },
      {
        id: "plan-vocabulary",
        title: "New words",
        subtitle: "10 words",
        type: "vocabulary",
        completed: false,
        lessonId: currentLesson?.id,
      },
    ];
  }, [currentLesson, dailyXp, unitLessons]);

  const handlePlanItemPress = (item: TodayPlanItem) => {
    const destination =
      item.type === "ai_conversation" || item.type === "video_call"
        ? "ai_teacher"
        : "learn";

    posthog?.capture("learning_destination_selected", {
      plan_item_type: item.type,
      lesson_id: item.lessonId,
      destination,
    });
    posthogLog.info("learning destination selected", {
      plan_item_type: item.type,
      lesson_id: item.lessonId,
      destination,
    });
    router.push(destination === "ai_teacher" ? "/(tabs)/ai-teacher" : "/(tabs)/learn");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header: Language Flag + Greeting + Streak + Notification Bell */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/language-selection")}
              accessibilityLabel={`Selected language: ${selectedLanguage.name}`}
            >
              <CircularFlag language={selectedLanguage} />
            </TouchableOpacity>

            <Text
              className="font-poppins-semibold text-[19px] leading-[26px] text-neutral-text-primary shrink"
              numberOfLines={1}
            >
              {selectedLanguage.greeting}, {firstName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-3.5">
            {/* Streak Indicator */}
            <View className="flex-row items-center gap-1">
              <View className="w-7 h-7 rounded-full overflow-hidden items-center justify-center">
                <RNImage
                  source={images.streakFire}
                  style={styles.streakIcon}
                  resizeMode="contain"
                />
              </View>
              <Text className="font-poppins-medium text-[17px] leading-[22px] text-[#374151]">
                {DEFAULT_STREAK}
              </Text>
            </View>

            {/* Notification Bell */}
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityLabel="Notifications"
              className="w-8 h-8 items-center justify-center"
            >
              <ExpoImage
                source={{ uri: BELL_ICON_URI }}
                style={styles.bellIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Goal Card */}
        <View className="mt-5 flex-row items-center justify-between rounded-[24px] bg-[#FAF4EE] px-5 py-4">
          <View className="flex-1 pr-4">
            <Text className="font-poppins-medium text-[15px] leading-[21px] text-[#2D3142]">
              Daily goal
            </Text>

            <View className="flex-row items-baseline mt-1.5">
              <Text className="font-poppins-bold text-[28px] leading-[34px] text-neutral-text-primary">
                {dailyXp}
              </Text>
              <Text className="font-poppins text-[15px] leading-[22px] text-neutral-text-secondary ml-1.5">
                / {DAILY_GOAL_XP} XP
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="mt-3.5 h-2.5 w-full rounded-full bg-[#F1E4D3] overflow-hidden">
              <View
                className="h-full rounded-full bg-[#EA8938]"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          </View>

          <RNImage
            source={images.treasure}
            style={styles.treasureImage}
            resizeMode="contain"
          />
        </View>

        {/* Continue Learning Hero Card */}
        <View
          className="mt-4 rounded-[24px] bg-primary-lingua-deep-purple overflow-hidden relative"
          style={styles.heroCard}
        >
          <ExpoImage
            source={{ uri: HERO_CARD_BG_URI }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />

          <View className="px-5 py-5 justify-between z-10 items-start">
            <View>
              <Text className="font-poppins text-[14px] leading-[20px] text-white/90">
                Continue learning
              </Text>
              <Text className="font-poppins-semibold text-[26px] leading-[33px] text-white mt-1">
                {selectedLanguage.name}
              </Text>
              <Text className="font-poppins text-[15px] leading-[21px] text-white/90 mt-0.5">
                {unitLevel} • Unit {unitNumber}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => router.push("/(tabs)/learn")}
              className="mt-3.5 rounded-[16px] bg-white px-6 py-2.5 items-center justify-center"
            >
              <Text className="font-poppins-semibold text-[15px] leading-[21px] text-primary-lingua-deep-purple">
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          <RNImage
            source={images.palace}
            style={styles.palaceImage}
            resizeMode="contain"
          />
        </View>

        {/* Today's Plan Section */}
        <View className="mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-poppins-semibold text-[18px] leading-[24px] text-neutral-text-primary">
              Today&apos;s plan
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(tabs)/learn")}
            >
              <Text className="font-poppins-medium text-[15px] leading-[21px] text-primary-lingua-purple">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {todayPlanItems.map((item) => (
              <TodayPlanRow
                key={item.id}
                item={item}
                onPress={handlePlanItemPress}
              />
            ))}
          </View>
        </View>

        {/* Next Up: AI Video Call Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/ai-teacher")}
          className="mt-6 flex-row items-center justify-between rounded-[24px] bg-[#F1F6EC] px-5 py-3.5"
        >
          <View className="flex-1 pr-3">
            <Text className="font-poppins text-[13px] leading-[18px] text-[#4B5563]">
              Next up
            </Text>
            <Text className="font-poppins-semibold text-[17px] leading-[24px] text-neutral-text-primary mt-0.5">
              AI Video Call
            </Text>
            <Text className="font-poppins text-[13.5px] leading-[19px] text-neutral-text-secondary mt-0.5">
              Practice speaking
            </Text>
          </View>

          <View className="flex-row items-center gap-3.5">
            <View className="w-[74px] h-[74px] rounded-full overflow-hidden bg-[#DCECD5]">
              <RNImage
                source={images.aiTeacherAvatar}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>

            <View className="w-12 h-12 rounded-full bg-[#65B748] items-center justify-center">
              <ExpoImage
                source={{ uri: VIDEO_ICON_URI }}
                style={styles.videoIcon}
                contentFit="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
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
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 24,
  },
  streakIcon: {
    width: 44,
    height: 44,
    marginTop: 5,
  },
  bellIcon: {
    width: 22,
    height: 22,
  },
  treasureImage: {
    width: 96,
    height: 84,
  },
  heroCard: {
    minHeight: 176,
  },
  palaceImage: {
    position: "absolute",
    right: -16,
    bottom: -18,
    width: 205,
    height: 192,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  videoIcon: {
    width: 22,
    height: 22,
  },
});
