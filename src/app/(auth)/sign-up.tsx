import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { useState } from "react";
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

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);

  const handleSignUp = () => {
    setIsVerificationVisible(true);
  };

  const handleVerifySuccess = () => {
    setIsVerificationVisible(false);
    router.replace("/");
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
                Create your account
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="font-poppins text-[15px] text-neutral-text-secondary">
                  Start your language journey today
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

            {/* Form Inputs */}
            <View className="gap-3.5">
              {/* Email Input */}
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
                />
              </View>

              {/* Password Input */}
              <View className="flex-row items-center justify-between rounded-2xl border border-neutral-border bg-white px-4 py-2.5">
                <View className="flex-1 mr-2">
                  <Text className="font-poppins text-xs text-neutral-text-secondary">
                    Password
                  </Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="font-poppins-medium text-base text-neutral-text-primary pt-0.5 pb-0"
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  className="p-1"
                >
                  <Text className="text-xl text-neutral-text-secondary">
                    {showPassword ? "🙈" : "👁"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Main Sign Up CTA Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              activeOpacity={0.88}
              className="mt-5 w-full items-center justify-center rounded-2xl bg-primary-lingua-purple py-4 shadow-md"
              style={{
                shadowColor: "#6C4EF5",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="font-poppins-semibold text-lg text-white">
                Sign Up
              </Text>
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
                className="w-full flex-row items-center justify-center rounded-2xl border border-neutral-border bg-white py-3.5 px-4"
              >
                <View className="mr-3 h-5 w-5 items-center justify-center rounded-full">
                  <Text className="text-base font-bold text-[#EA4335]">G</Text>
                </View>
                <Text className="font-poppins-medium text-[15px] text-neutral-text-primary">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {/* Facebook */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-full flex-row items-center justify-center rounded-2xl border border-neutral-border bg-white py-3.5 px-4"
              >
                <View className="mr-3 h-5 w-5 items-center justify-center rounded-full bg-[#1877F2]">
                  <Text className="text-xs font-bold text-white">f</Text>
                </View>
                <Text className="font-poppins-medium text-[15px] text-neutral-text-primary">
                  Continue with Facebook
                </Text>
              </TouchableOpacity>

              {/* Apple */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-full flex-row items-center justify-center rounded-2xl border border-neutral-border bg-white py-3.5 px-4"
              >
                <View className="mr-3 h-5 w-5 items-center justify-center">
                  <Text className="text-base text-black"></Text>
                </View>
                <Text className="font-poppins-medium text-[15px] text-neutral-text-primary">
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Switcher: Already have an account? Log in */}
          <View className="mt-8 flex-row items-center justify-center pb-2">
            <Text className="font-poppins text-sm text-neutral-text-secondary">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              <Text className="font-poppins-semibold text-sm text-primary-lingua-purple">
                Log in
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
      />
    </SafeAreaView>
  );
}

