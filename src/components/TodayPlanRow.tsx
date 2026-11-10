import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TodayPlanItem, TodayPlanType } from "@/types/learning";

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

const PLAN_ICONS: Record<TodayPlanType, { bgClassName: string; svg: string }> = {
  lesson: {
    bgClassName: "bg-primary-lingua-purple",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="#FFFFFF" d="M11.25 5.6C9.35 4.55 6.8 4.25 4.45 4.65A1.2 1.2 0 0 0 3.5 5.83v11.15c0 .71.63 1.26 1.33 1.16 2.2-.3 4.55.02 6.42 1.06V5.6ZM12.75 19.2c1.87-1.04 4.22-1.36 6.42-1.06.7.1 1.33-.45 1.33-1.16V5.83a1.2 1.2 0 0 0-.95-1.18c-2.35-.4-4.9-.1-6.8.95v13.6Z"/>
    </svg>`,
  },
  ai_conversation: {
    bgClassName: "bg-primary-lingua-purple",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path stroke="#FFFFFF" stroke-width="2.1" stroke-linecap="round" d="M4.5 13.5V12a7.5 7.5 0 0 1 15 0v1.5"/>
      <rect x="3.5" y="12.5" width="3.6" height="6.5" rx="1.8" fill="#FFFFFF"/>
      <rect x="16.9" y="12.5" width="3.6" height="6.5" rx="1.8" fill="#FFFFFF"/>
    </svg>`,
  },
  vocabulary: {
    bgClassName: "bg-[#EE6B6B]",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="#FFFFFF" d="M7.5 5h9A3.5 3.5 0 0 1 20 8.5v6a3.5 3.5 0 0 1-3.5 3.5h-2.4l-1.5 1.9a.75.75 0 0 1-1.2 0L9.9 18H7.5A3.5 3.5 0 0 1 4 14.5v-6A3.5 3.5 0 0 1 7.5 5Z"/>
      <circle cx="9.6" cy="11.5" r="1.45" fill="#EE6B6B"/>
      <circle cx="14.4" cy="11.5" r="1.45" fill="#EE6B6B"/>
    </svg>`,
  },
  video_call: {
    bgClassName: "bg-primary-lingua-green",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6.5" width="12.5" height="11" rx="2.5" fill="#FFFFFF"/>
      <path fill="#FFFFFF" d="M16.8 10.1 20.2 7.9c.65-.42 1.5.05 1.5.82v6.56c0 .77-.85 1.24-1.5.82l-3.4-2.2v-3.8Z"/>
    </svg>`,
  },
};

const CHECKMARK_URI = toSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m3.1 7.3 2.4 2.4 5.4-5.4"/>
  </svg>`
);

interface TodayPlanRowProps {
  item: TodayPlanItem;
  onPress?: (item: TodayPlanItem) => void;
}

export function TodayPlanRow({ item, onPress }: TodayPlanRowProps) {
  const iconConfig = PLAN_ICONS[item.type] ?? PLAN_ICONS.lesson;
  const iconUri = toSvgDataUri(iconConfig.svg);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress?.(item)}
      className="flex-row items-center justify-between"
    >
      {/* Left: Colored Icon Tile + Title & Subtitle */}
      <View className="flex-row items-center gap-3.5 flex-1 pr-3">
        <View
          className={`w-12 h-12 rounded-[14px] items-center justify-center ${iconConfig.bgClassName}`}
        >
          <Image
            source={{ uri: iconUri }}
            style={styles.planIcon}
            contentFit="contain"
          />
        </View>

        <View className="flex-1 justify-center">
          <Text className="font-poppins-semibold text-[16px] leading-[22px] text-neutral-text-primary">
            {item.title}
          </Text>
          <Text className="font-poppins text-[14px] leading-[20px] text-neutral-text-secondary mt-0.5">
            {item.subtitle}
          </Text>
        </View>
      </View>

      {/* Right: Completion Status Circle */}
      {item.completed ? (
        <View className="w-6 h-6 rounded-full bg-primary-lingua-purple items-center justify-center">
          <Image
            source={{ uri: CHECKMARK_URI }}
            style={styles.checkIcon}
            contentFit="contain"
          />
        </View>
      ) : (
        <View className="w-6 h-6 rounded-full border-[1.8px] border-[#8D93A5]" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  planIcon: {
    width: 24,
    height: 24,
  },
  checkIcon: {
    width: 14,
    height: 14,
  },
});

