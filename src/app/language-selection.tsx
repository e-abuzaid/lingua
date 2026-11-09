import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { images } from "@/constants/images";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  getPopularLanguages,
} from "@/data/languages";
import { LanguageCard } from "@/components/LanguageCard";
import { Language } from "@/types/learning";

export default function LanguageSelectionScreen() {
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(
    DEFAULT_LANGUAGE.id
  );
  const [searchQuery, setSearchQuery] = useState("");

  const popularLanguages = useMemo(() => getPopularLanguages(), []);

  const filteredLanguages = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return popularLanguages;
    }
    return SUPPORTED_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(trimmed) ||
        lang.nativeName.toLowerCase().includes(trimmed)
    );
  }, [searchQuery, popularLanguages]);

  const handleSelectLanguage = (language: Language) => {
    setSelectedLanguageId(language.id);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleConfirm = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            {/* Header: Back Button + Centered Title */}
            <View className="flex-row items-center justify-between px-6 pt-2 pb-2">
              <TouchableOpacity
                onPress={handleBack}
                activeOpacity={0.7}
                className="w-10 h-10 items-start justify-center"
              >
                <View
                  style={{
                    width: 11,
                    height: 11,
                    borderLeftWidth: 2.5,
                    borderBottomWidth: 2.5,
                    borderColor: "#0D132B",
                    transform: [{ rotate: "45deg" }],
                  }}
                />
              </TouchableOpacity>

              <Text className="font-poppins-bold text-[19px] leading-[26px] text-neutral-text-primary text-center">
                Choose a language
              </Text>

              {/* Right spacer to keep title perfectly centered */}
              <View className="w-10 h-10" />
            </View>

            {/* Search Input */}
            <View className="mx-6 mt-3 flex-row items-center rounded-full border border-neutral-border bg-white px-4 py-3">
              {/* Magnifying Glass Icon */}
              <View className="items-center justify-center mr-2.5">
                <View
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: "#9CA3AF",
                  }}
                />
                <View
                  style={{
                    width: 6,
                    height: 2,
                    backgroundColor: "#9CA3AF",
                    position: "absolute",
                    bottom: -2,
                    right: -3,
                    transform: [{ rotate: "45deg" }],
                    borderRadius: 1,
                  }}
                />
              </View>

              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search languages"
                placeholderTextColor="#9CA3AF"
                className="flex-1 font-poppins text-[15px] text-neutral-text-primary p-0"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {isSearching && (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  activeOpacity={0.7}
                  className="w-5 h-5 rounded-full bg-neutral-surface items-center justify-center ml-2"
                >
                  <Text className="text-xs font-poppins text-neutral-text-secondary">
                    ✕
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Section Header */}
            <View className="px-6 mt-6 mb-3">
              <Text className="font-poppins-semibold text-lg text-neutral-text-primary">
                {isSearching ? "Search Results" : "Popular"}
              </Text>
            </View>

            {/* Language Cards List */}
            <View className="px-6 gap-3">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language) => (
                  <LanguageCard
                    key={language.id}
                    language={language}
                    isSelected={selectedLanguageId === language.id}
                    onSelect={handleSelectLanguage}
                  />
                ))
              ) : (
                <View className="items-center justify-center py-10 px-4">
                  <Text className="font-poppins-semibold text-base text-neutral-text-primary">
                    No languages found
                  </Text>
                  <Text className="font-poppins text-sm text-neutral-text-secondary mt-1 text-center">
                    We couldn&apos;t find any language matching &quot;{searchQuery}&quot;.
                  </Text>
                </View>
              )}
            </View>

            {/* Confirmation Button */}
            <View className="px-6 mt-4">
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleConfirm}
                className="w-full flex-row items-center justify-center rounded-2xl bg-primary-lingua-purple py-4 px-6 shadow-md"
                style={{
                  shadowColor: "#6C4EF5",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 10,
                  elevation: 3,
                }}
              >
                <Text className="text-center font-poppins-semibold text-base text-white">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Earth Illustration */}
          <View
            className="w-full items-center justify-end overflow-hidden mt-6"
            style={{ height: 160 }}
          >
            <Image
              source={images.earth}
              style={{
                width: "100%",
                height: 380,
                marginBottom: -90,
              }}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

