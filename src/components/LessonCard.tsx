import { getLessonCardImage } from "@/lib/lessonImages";
import { toSvgDataUri } from "@/lib/svg";
import { Lesson, LessonStatus } from "@/types/learning";
import { Image as ExpoImage } from "expo-image";
import React from "react";
import {
  Image as RNImage,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CHECKMARK_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path stroke="#FFFFFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" d="m3.5 8.3 3 3 6-6.2"/>
  </svg>`
);

const LOCK_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="10.5" width="14" height="10" rx="3" stroke="#262D47" stroke-width="1.8"/>
    <path stroke="#262D47" stroke-width="1.8" stroke-linecap="round" d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7"/>
    <circle cx="12" cy="15.2" r="1.2" fill="#262D47"/>
    <path stroke="#262D47" stroke-width="1.6" stroke-linecap="round" d="M12 16v1.8"/>
  </svg>`
);

interface LessonCardProps {
  lesson: Lesson;
  status: LessonStatus;
  totalUnitLessons: number;
  onPress: (lesson: Lesson) => void;
}

export function LessonCard({
  lesson,
  status,
  totalUnitLessons,
  onPress,
}: LessonCardProps) {
  const isInProgress = status === "in_progress";
  const isCompleted = status === "completed";
  const lessonImage = getLessonCardImage(lesson);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(lesson)}
      accessibilityRole="button"
      accessibilityLabel={`Lesson ${lesson.lessonNumber}: ${lesson.title}`}
      className={`flex-row items-center justify-between rounded-[18px] px-5 py-4 ${
        isInProgress
          ? "border-[1.5px] border-[#826CF6] bg-[#FAF8FF]"
          : "border border-[#ECEEF4] bg-white"
      }`}
      style={isInProgress ? styles.activeCardShadow : styles.cardShadow}
    >
      <View className="flex-1 pr-3">
        <Text
          className={`text-[13px] leading-[18px] ${
            isInProgress
              ? "font-poppins-medium text-[#5B3BF6]"
              : "font-poppins text-[#6B7280]"
          }`}
        >
          Lesson {lesson.lessonNumber}
        </Text>

        <Text
          className={`mt-1 font-poppins-semibold ${
            isInProgress
              ? "text-[17px] leading-[23px] text-neutral-text-primary"
              : "text-[16px] leading-[22px] text-[#111827]"
          }`}
          numberOfLines={2}
        >
          {lesson.title}
        </Text>

        {isInProgress && (
          <Text className="mt-1 font-poppins-medium text-[13.5px] leading-[19px] text-[#5B3BF6]">
            In progress
          </Text>
        )}

        {!isInProgress && !isCompleted && (
          <Text className="mt-1 font-poppins text-[13px] leading-[18px] text-[#6B7280]">
            {status === "available"
              ? `${lesson.estimatedMinutes} min • +${lesson.xpReward} XP`
              : `0 / ${totalUnitLessons} lessons`}
          </Text>
        )}
      </View>

      {isCompleted ? (
        <View className="w-7 h-7 rounded-full bg-[#56B83B] items-center justify-center">
          <ExpoImage
            source={{ uri: CHECKMARK_URI }}
            style={styles.checkIcon}
            contentFit="contain"
          />
        </View>
      ) : isInProgress ? (
        <View className="w-[52px] h-[52px] rounded-[14px] overflow-hidden bg-[#EFEAFF] items-center justify-center">
          <RNImage
            source={lessonImage}
            style={styles.lessonImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View className="w-8 h-8 items-center justify-center">
          <ExpoImage
            source={{ uri: LOCK_URI }}
            style={styles.lockIcon}
            contentFit="contain"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  activeCardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#6C4EF5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },
  checkIcon: {
    width: 15,
    height: 15,
  },
  lockIcon: {
    width: 22,
    height: 22,
  },
  lessonImage: {
    width: 52,
    height: 52,
  },
});
