import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Language } from "@/types/learning";

interface LanguageCardProps {
  language: Language;
  isSelected: boolean;
  onSelect: (language: Language) => void;
}

export function CircularFlag({ language }: { language: Language }) {
  const { id } = language;

  switch (id.toLowerCase()) {
    case "es": // Spanish
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 bg-[#AA151B] relative justify-center items-center">
          <View className="w-full h-1/2 bg-[#F1BF00] justify-center items-start pl-2">
            <View className="w-2.5 h-3 bg-[#AA151B] rounded-sm border border-[#C68B00] items-center justify-center">
              <View className="w-1 h-1 bg-[#F1BF00] rounded-full" />
            </View>
          </View>
        </View>
      );
    case "fr": // French
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 flex-row">
          <View className="flex-1 bg-[#002654]" />
          <View className="flex-1 bg-white" />
          <View className="flex-1 bg-[#ED2939]" />
        </View>
      );
    case "ja": // Japanese
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 bg-white items-center justify-center">
          <View className="w-5 h-5 rounded-full bg-[#BC002D]" />
        </View>
      );
    case "ko": // Korean
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 bg-white items-center justify-center relative">
          <View className="absolute top-1.5 left-2 w-2 h-0.5 bg-black rotate-45" />
          <View className="absolute top-1.5 right-2 w-2 h-0.5 bg-black -rotate-45" />
          <View className="absolute bottom-1.5 left-2 w-2 h-0.5 bg-black -rotate-45" />
          <View className="absolute bottom-1.5 right-2 w-2 h-0.5 bg-black rotate-45" />
          <View className="w-5 h-5 rounded-full overflow-hidden items-center justify-center">
            <View className="w-full h-1/2 bg-[#C60C30]" />
            <View className="w-full h-1/2 bg-[#003478]" />
          </View>
        </View>
      );
    case "de": // German
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 flex-col">
          <View className="flex-1 bg-black" />
          <View className="flex-1 bg-[#DD0000]" />
          <View className="flex-1 bg-[#FFCE00]" />
        </View>
      );
    case "zh": // Chinese
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 bg-[#DE2910] p-1.5 items-center justify-center">
          <Text className="text-yellow-300 text-xs font-bold leading-none">★</Text>
        </View>
      );
    case "it": // Italian
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 flex-row">
          <View className="flex-1 bg-[#009246]" />
          <View className="flex-1 bg-white" />
          <View className="flex-1 bg-[#CE2B37]" />
        </View>
      );
    case "pt": // Portuguese
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 flex-row relative items-center">
          <View className="w-[40%] h-full bg-[#046A38]" />
          <View className="w-[60%] h-full bg-[#DA291C]" />
          <View className="absolute left-[30%] w-3 h-3 rounded-full bg-[#FFDA44] border border-[#DA291C]" />
        </View>
      );
    default:
      return (
        <View className="w-11 h-11 rounded-full overflow-hidden border border-neutral-border/60 bg-neutral-surface items-center justify-center">
          <Text className="text-xl">{language.flag}</Text>
        </View>
      );
  }
}

export function LanguageCard({
  language,
  isSelected,
  onSelect,
}: LanguageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onSelect(language)}
      className={`flex-row items-center justify-between rounded-2xl p-4 bg-white ${
        isSelected
          ? "border-2 border-primary-lingua-purple"
          : "border border-neutral-border"
      }`}
      style={
        isSelected
          ? {
              shadowColor: "#6C4EF5",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }
          : undefined
      }
    >
      {/* Left: Flag + Text Info */}
      <View className="flex-row items-center gap-3.5 flex-1">
        <CircularFlag language={language} />
        <View className="flex-1 justify-center">
          <Text className="font-poppins-semibold text-[17px] leading-[22px] text-neutral-text-primary">
            {language.name}
          </Text>
          <Text className="font-poppins text-[13px] leading-[18px] text-neutral-text-secondary mt-0.5">
            {language.learnersCount}
          </Text>
        </View>
      </View>

      {/* Right: Selected checkmark badge or chevron arrow */}
      {isSelected ? (
        <View className="w-6 h-6 rounded-full bg-primary-lingua-purple items-center justify-center">
          <View
            style={{
              width: 5,
              height: 9,
              borderBottomWidth: 2,
              borderRightWidth: 2,
              borderColor: "#FFFFFF",
              transform: [{ rotate: "45deg" }],
              marginBottom: 2,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: 8,
            height: 8,
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderColor: "#9CA3AF",
            transform: [{ rotate: "45deg" }],
            marginRight: 4,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

