import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
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
}

export function VerificationModal({
  visible,
  onClose,
  onVerifySuccess,
  email = "alex@gmail.com",
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInputInstance>(null);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setCode("");
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleChangeCode = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(cleaned);
    if (cleaned.length === 6) {
      setTimeout(() => {
        onVerifySuccess();
      }, 300);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: "rgba(13, 19, 43, 0.45)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
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

            {/* Hidden Input for actual typing */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              keyboardType="number-pad"
              maxLength={6}
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                opacity: 0.01,
              }}
              autoFocus
            />

            {/* 6 Digits Boxes UI */}
            <Pressable
              onPress={() => inputRef.current?.focus()}
              className="mt-6 flex-row items-center justify-between"
            >
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const digit = code[index] || "";
                const isFocused = code.length === index;
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
            </Pressable>

            {/* Resend Code link */}
            <View className="mt-6 flex-row items-center justify-center gap-1">
              <Text className="font-poppins text-xs text-neutral-text-secondary">
                {"Didn't receive the code?"}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setCode("")}>
                <Text className="font-poppins-semibold text-xs text-primary-lingua-purple">
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
