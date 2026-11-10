import { images } from "@/constants/images";
import { posthogLog } from "@/lib/posthog-log";
import { posthog } from "@/lib/posthog";
import { useAuth } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  const handleGetStarted = () => {
    posthog?.capture("onboarding_started");
    posthogLog.info("onboarding started", { flow: "onboarding" });
    router.push("/(auth)/sign-up");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 justify-between px-6 pt-3 pb-8">
        {/* Top Header Logo */}
        <View className="flex-row items-center justify-center gap-2">
          <Image
            source={images.moscotLogo}
            className="w-10 h-10"
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-3xl text-neutral-text-primary tracking-tight">
            lingua
          </Text>
        </View>

        {/* Center Content: Headline, Subtitle & Mascot Illustration */}
        <View className="items-center">
          {/* Headline */}
          <Text className="text-center font-poppins-bold text-[34px] leading-[42px] text-neutral-text-primary">
            Your AI language{"\n"}
            <Text className="text-primary-lingua-purple">teacher.</Text>
          </Text>

          {/* Subtitle */}
          <Text className="mt-3.5 text-center font-poppins text-[15px] leading-[23px] text-neutral-text-secondary max-w-[280px]">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>

          {/* Mascot Container with Speech Bubbles */}
          <View className="relative mt-8 items-center justify-center w-[320px] h-[300px]">
            {/* Top-Left Bubble: "Hello!" */}
            <View className="absolute left-1 top-4 z-10 rounded-2xl bg-[#EEF4FF] px-4 py-2 shadow-sm">
              <Text className="font-poppins-medium text-[15px] text-[#222B45]">
                Hello!
              </Text>
            </View>

            {/* Top-Right Bubble: "¡Hola!" */}
            <View className="absolute right-5 top-0 z-10 rounded-2xl bg-[#F0ECFE] px-4 py-2 shadow-sm">
              <Text className="font-poppins-medium text-[15px] text-primary-lingua-purple">
                ¡Hola!
              </Text>
            </View>

            {/* Middle-Right Bubble: "你好!" */}
            <View className="absolute right-0 top-24 z-10 rounded-2xl bg-[#FFF1EB] px-4 py-2 shadow-sm">
              <Text className="font-poppins-medium text-[15px] text-[#FF5A36]">
                你好!
              </Text>
            </View>

            {/* Mascot Image */}
            <Image
              source={images.mascotWelcome}
              className="w-[270px] h-[270px]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Bottom CTA Button */}
        <View className="w-full">
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleGetStarted}
            className="w-full flex-row items-center justify-center rounded-2xl bg-primary-lingua-purple py-4 px-6 shadow-md"
          >
            <Text className="flex-1 text-center font-poppins-semibold text-lg text-white">
              Get Started
            </Text>
            {/* Chevron Right Arrow */}
            <View className="absolute right-6 flex-row items-center justify-center">
              <View className="w-2.5 h-2.5 border-t-2 border-r-2 border-white rotate-45" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

