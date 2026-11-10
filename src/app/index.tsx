import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { useAuth } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );
  const clearSelectedLanguage = useLanguageStore(
    (state) => state.clearSelectedLanguage
  );

  // For testing: wipe AsyncStorage and reset the in-memory language state.
  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    clearSelectedLanguage();
  };

  const handleSignOut = async () => {
    await signOut();
    posthog?.reset();
  };

  if (!isLoaded || (isSignedIn && !hasHydrated)) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#6C4EF5" />
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

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
          <Link href="/(tabs)/home" asChild>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4"
            >
              <Text className="font-poppins-semibold text-base text-neutral-text-primary">
                Open Tabs Screen
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

          <Link href="/language-selection" asChild>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4"
            >
              <Text className="font-poppins-semibold text-base text-neutral-text-primary">
                Open Language Selection Screen
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

          {/* Clear Async Storage Button (testing only) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClearStorage}
            className="flex-row items-center justify-between rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4"
          >
            <Text className="font-poppins-semibold text-base text-neutral-text-primary">
              Clear Async Storage
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

          {/* Sign Out Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignOut}
            className="flex-row items-center justify-between rounded-2xl border border-semantic-error/30 bg-semantic-error/10 px-5 py-4"
          >
            <Text className="font-poppins-semibold text-base text-semantic-error">
              Sign Out
            </Text>
            <View
              style={{
                width: 8,
                height: 8,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderColor: "#FF4D4F",
                transform: [{ rotate: "45deg" }],
              }}
            />
          </TouchableOpacity>
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
