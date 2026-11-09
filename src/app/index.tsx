import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        {/* Brand Header */}
        <View className="flex-row items-center gap-3">
          <Image
            source={images.moscotLogo}
            style={{ width: 48, height: 48 }}
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-3xl text-neutral-text-primary">
            lingua
          </Text>
        </View>

        {/* Navigation Links */}
        <View className="gap-3">
          <Link href="/onboarding" asChild>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between rounded-2xl bg-primary-lingua-purple px-5 py-4"
              style={{
                shadowColor: "#6C4EF5",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <Text className="font-poppins-semibold text-base text-white">
                Open Onboarding Screen
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderTopWidth: 2,
                  borderRightWidth: 2,
                  borderColor: "#FFFFFF",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4"
            >
              <Text className="font-poppins-semibold text-base text-neutral-text-primary">
                Open Sign Up Screen
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderTopWidth: 2,
                  borderRightWidth: 2,
                  borderColor: "#0D132B",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4"
            >
              <Text className="font-poppins-semibold text-base text-neutral-text-primary">
                Open Sign In Screen
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderTopWidth: 2,
                  borderRightWidth: 2,
                  borderColor: "#0D132B",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Typography Preview */}
        <View className="gap-2">
          <Text className="typography-h1 text-neutral-text-primary">
            Lingua
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
