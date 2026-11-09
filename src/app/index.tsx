import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";
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
