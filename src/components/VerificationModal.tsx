import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { TextInputInstance } from "react-native";

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerifySuccess: () => void;
  email?: string;
  onVerifyCode?: (code: string) => Promise<{ success: boolean; error?: string }>;
  onResendCode?: () => Promise<{ success: boolean; error?: string }>;
}

export function VerificationModal({
  visible,
  onClose,
  onVerifySuccess,
  email = "alex@gmail.com",
  onVerifyCode,
  onResendCode,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const inputRef = useRef<TextInputInstance>(null);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setCode("");
        setErrorMessage(null);
        setInfoMessage(null);
        setIsVerifying(false);
        setIsResending(false);
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleChangeCode = async (text: string) => {
    if (isVerifying) return;
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(cleaned);
    setErrorMessage(null);
    setInfoMessage(null);

    if (cleaned.length === 6) {
      if (onVerifyCode) {
        setIsVerifying(true);
        try {
          const res = await onVerifyCode(cleaned);
          if (res.success) {
            onVerifySuccess();
          } else {
            setErrorMessage(res.error || "Invalid verification code.");
          }
        } catch (err: any) {
          setErrorMessage(err?.message || "Failed to verify code.");
        } finally {
          setIsVerifying(false);
        }
      } else {
        setTimeout(() => {
          onVerifySuccess();
        }, 300);
      }
    }
  };

  const handleResend = async () => {
    if (isResending || isVerifying) return;
    if (!onResendCode) {
      setCode("");
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setInfoMessage(null);
    try {
      const res = await onResendCode();
      if (res.success) {
        setInfoMessage("Verification code resent!");
        setCode("");
        inputRef.current?.focus();
      } else {
        setErrorMessage(res.error || "Failed to resend code.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to resend code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onShow={() => {
        inputRef.current?.focus();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          {/* Backdrop (tap to close) */}
          <Pressable
            onPress={onClose}
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(13, 19, 43, 0.45)" },
            ]}
          />

          {/* Modal Content Card */}
          <View
            className="w-full max-w-[360px] rounded-3xl bg-white p-6 shadow-xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            {/* Header / Close icon */}
            <View className="flex-row items-center justify-between pb-2">
              <Text className="font-poppins-bold text-xl text-neutral-text-primary">
                Verify Your Email
              </Text>
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="h-8 w-8 items-center justify-center rounded-full bg-neutral-surface"
              >
                <Text className="font-poppins-medium text-base text-neutral-text-secondary">
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text className="mt-2 font-poppins text-sm leading-5 text-neutral-text-secondary">
              We have sent a 6-digit verification code to{" "}
              <Text className="font-poppins-semibold text-neutral-text-primary">
                {email || "your email"}
              </Text>
              . Please enter it below.
            </Text>

            {/* 6 Digits Boxes with Transparent TextInput overlay */}
            <View className="relative mt-6">
              {/* Visual Boxes (pointerEvents="none" so touches pass through to TextInput) */}
              <View
                pointerEvents="none"
                className="flex-row items-center justify-between"
              >
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const digit = code[index] || "";
                  const isFocused = code.length === index && !isVerifying;
                  return (
                    <View
                      key={index}
                      className={`h-12 w-11 items-center justify-center rounded-xl border ${
                        isFocused
                          ? "border-primary-lingua-purple bg-[#F7F5FF]"
                          : digit
                          ? "border-neutral-border bg-white"
                          : "border-neutral-border bg-neutral-surface/60"
                      }`}
                    >
                      <Text className="font-poppins-bold text-lg text-neutral-text-primary">
                        {digit}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Real TextInput directly covering the entire boxes area */}
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChangeCode}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                maxLength={6}
                editable={!isVerifying}
                caretHidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                }}
              />
            </View>

            {/* Feedback messages */}
            {isVerifying ? (
              <View className="mt-3 flex-row items-center justify-center gap-2">
                <ActivityIndicator size="small" color="#6C4EF5" />
                <Text className="font-poppins text-xs text-neutral-text-secondary">
                  Verifying code...
                </Text>
              </View>
            ) : null}

            {errorMessage ? (
              <Text className="mt-3 text-center font-poppins text-xs text-semantic-error">
                {errorMessage}
              </Text>
            ) : null}

            {infoMessage ? (
              <Text className="mt-3 text-center font-poppins text-xs text-semantic-success">
                {infoMessage}
              </Text>
            ) : null}

            {/* Resend Code link */}
            <View className="mt-6 flex-row items-center justify-center gap-1">
              <Text className="font-poppins text-xs text-neutral-text-secondary">
                {"Didn't receive the code?"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleResend}
                disabled={isResending || isVerifying}
              >
                <Text className="font-poppins-semibold text-xs text-primary-lingua-purple">
                  {isResending ? "Resending..." : "Resend Code"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
