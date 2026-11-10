import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import { useAuth, useSignIn, useSSO } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

export default function SignInScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert("Required Field", "Please enter your email address.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email.trim(),
      });

      if (error) {
        if (error.code === "form_identifier_not_found") {
          Alert.alert(
            "Account Not Found",
            "No account was found with this email. Please create an account first."
          );
        } else {
          Alert.alert(
            "Sign In Failed",
            error.longMessage ||
              error.message ||
              "Unable to sign in. Please try again."
          );
        }
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsVerificationVisible(true);
    } catch (err: any) {
      setIsLoading(false);
      Alert.alert(
        "Sign In Error",
        err?.message || "An unexpected error occurred during sign in."
      );
    }
  };

  const handleVerifyCode = async (code: string) => {
    try {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        return {
          success: false,
          error:
            error.longMessage ||
            error.message ||
            "Invalid verification code.",
        };
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          return {
            success: false,
            error:
              finalizeError.longMessage ||
              finalizeError.message ||
              "Failed to complete sign in.",
          };
        }
      }

      posthog?.capture("sign_in_completed", {
        authentication_method: "email_code",
      });
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || "Verification failed.",
      };
    }
  };

  const handleResendCode = async () => {
    try {
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email.trim(),
      });
      if (error) {
        return {
          success: false,
          error:
            error.longMessage ||
            error.message ||
            "Failed to resend code.",
        };
      }
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || "Failed to resend code.",
      };
    }
  };

  const handleVerifySuccess = () => {
    setIsVerificationVisible(false);
    router.replace("/");
  };

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_facebook" | "oauth_apple"
  ) => {
    if (socialLoading || isLoading) return;
    setSocialLoading(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog?.capture("sign_in_completed", {
          authentication_method: strategy.replace("oauth_", ""),
        });
        router.replace("/");
      }
    } catch (err: any) {
      if (
        err?.code === "SIGN_IN_CANCELLED" ||
        err?.message?.includes("cancelled") ||
        err?.message?.includes("dismissed")
      ) {
        // User cancelled the auth session; no alert needed
        return;
      }
      Alert.alert(
        "Social Sign In",
        err?.message || "Failed to sign in with social provider."
      );
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 8,
            paddingBottom: 24,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            {/* Top Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-10 h-10 items-start justify-center"
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderLeftWidth: 2.5,
                  borderBottomWidth: 2.5,
                  borderColor: "#0D132B",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </TouchableOpacity>

            {/* Title & Subtitle */}
            <View className="mt-3">
              <Text className="font-poppins-bold text-[28px] leading-[36px] text-neutral-text-primary">
                Welcome back
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="font-poppins text-[15px] text-neutral-text-secondary">
                  Continue your language journey today
                </Text>
                <Text className="ml-1 text-[15px]">✨</Text>
              </View>
            </View>

            {/* Mascot Character Illustration */}
            <View className="items-center justify-center my-2">
              <Image
                source={images.mascotAuth}
                className="w-[180px] h-[120px]"
                resizeMode="contain"
              />
            </View>

            {/* Form Inputs (Email only, no password) */}
            <View className="gap-3.5">
              <View className="rounded-2xl border border-neutral-border bg-white px-4 py-2.5">
                <Text className="font-poppins text-xs text-neutral-text-secondary">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="font-poppins-medium text-base text-neutral-text-primary pt-0.5 pb-0"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Main Sign In CTA Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              activeOpacity={0.88}
              disabled={isLoading}
              className="mt-5 w-full items-center justify-center rounded-2xl bg-primary-lingua-purple py-4 shadow-md"
              style={{
                shadowColor: "#6C4EF5",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 3,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="font-poppins-semibold text-lg text-white">
                  Log In
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider "or continue with" */}
            <View className="my-6 flex-row items-center justify-center">
              <View className="flex-1 h-[1px] bg-neutral-border" />
              <Text className="mx-3 font-poppins text-xs text-neutral-text-secondary">
                or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-neutral-border" />
            </View>

            {/* Social Logins */}
            <View className="gap-3">
              {/* Google */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSocialAuth("oauth_google")}
                disabled={Boolean(socialLoading) || isLoading}
                className="w-full flex-row items-center justify-center rounded-2xl border border-neutral-border bg-white py-3.5 px-4"
              >
                {socialLoading === "oauth_google" ? (
                  <ActivityIndicator size="small" color="#6C4EF5" />
                ) : (
                  <>
                    <View className="mr-3 h-5 w-5 items-center justify-center rounded-full">
                      <Text className="text-base font-bold text-[#EA4335]">G</Text>
                    </View>
                    <Text className="font-poppins-medium text-[15px] text-neutral-text-primary">
                      Continue with Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Facebook */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSocialAuth("oauth_facebook")}
                disabled={Boolean(socialLoading) || isLoading}
                className="w-full flex-row items-center justify-center rounded-2xl border border-neutral-border bg-white py-3.5 px-4"
              >
                {socialLoading === "oauth_facebook" ? (
                  <ActivityIndicator size="small" color="#6C4EF5" />
                ) : (
                  <>
                    <View className="mr-3 h-5 w-5 items-center justify-center rounded-full bg-[#1877F2]">
                      <Text className="text-xs font-bold text-white">f</Text>
                    </View>
                    <Text className="font-poppins-medium text-[15px] text-neutral-text-primary">
                      Continue with Facebook
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Apple */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSocialAuth("oauth_apple")}
                disabled={Boolean(socialLoading) || isLoading}
                className="w-full flex-row items-center justify-center rounded-2xl border border-neutral-border bg-white py-3.5 px-4"
              >
                {socialLoading === "oauth_apple" ? (
                  <ActivityIndicator size="small" color="#6C4EF5" />
                ) : (
                  <>
                    <View className="mr-3 h-5 w-5 items-center justify-center">
                      <Text className="text-base text-black"></Text>
                    </View>
                    <Text className="font-poppins-medium text-[15px] text-neutral-text-primary">
                      Continue with Apple
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Switcher: Don't have an account? Sign up */}
          <View className="mt-8 flex-row items-center justify-center pb-2">
            <Text className="font-poppins text-sm text-neutral-text-secondary">
              {"Don't have an account? "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.replace("/(auth)/sign-up")}
            >
              <Text className="font-poppins-semibold text-sm text-primary-lingua-purple">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Code Modal */}
      <VerificationModal
        visible={isVerificationVisible}
        onClose={() => setIsVerificationVisible(false)}
        onVerifySuccess={handleVerifySuccess}
        email={email}
        onVerifyCode={handleVerifyCode}
        onResendCode={handleResendCode}
      />
    </SafeAreaView>
  );
}
