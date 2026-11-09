import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AITeacherScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <View className="flex-1 items-center justify-center">
        <Text className="typography-h2 text-neutral-text-primary">AI Teacher</Text>
      </View>
    </SafeAreaView>
  );
}

