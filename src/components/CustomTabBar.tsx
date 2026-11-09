import { Image } from "expo-image";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useEffect, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type TabName = "home" | "learn" | "ai-teacher" | "chat" | "profile";

type TabConfig = {
  label: string;
  getSvg: (color: string) => string;
};

const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function toSvgDataUri(svg: string): string {
  let output = "";
  for (let i = 0; i < svg.length; i += 3) {
    const b1 = svg.charCodeAt(i) & 0xff;
    const b2 = i + 1 < svg.length ? svg.charCodeAt(i + 1) & 0xff : 0;
    const b3 = i + 2 < svg.length ? svg.charCodeAt(i + 2) & 0xff : 0;
    const triplet = (b1 << 16) | (b2 << 8) | b3;

    output += BASE64_CHARS[(triplet >> 18) & 0x3f];
    output += BASE64_CHARS[(triplet >> 12) & 0x3f];
    output += i + 1 < svg.length ? BASE64_CHARS[(triplet >> 6) & 0x3f] : "=";
    output += i + 2 < svg.length ? BASE64_CHARS[triplet & 0x3f] : "=";
  }
  return `data:image/svg+xml;base64,${output}`;
}

const TABS: Record<TabName, TabConfig> = {
  home: {
    label: "Home",
    getSvg: (color) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill="${color}" fill-rule="evenodd" clip-rule="evenodd" d="M11.18 3.42a1.25 1.25 0 0 1 1.64 0l8.25 7.22c.68.6.26 1.71-.65 1.71H18.8v6.9c0 .97-.78 1.75-1.75 1.75h-3.05v-5.25c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1V21H6.95A1.75 1.75 0 0 1 5.2 19.25v-6.9H3.58c-.91 0-1.33-1.11-.65-1.71l8.25-7.22Z"/>
      </svg>`,
  },
  learn: {
    label: "Learn",
    getSvg: (color) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M12 6.4C9.9 5.1 6.9 4.7 4.2 5.2A1 1 0 0 0 3.4 6.2v11.3c0 .58.5 1.03 1.08.97 2.55-.27 5.37.13 7.52 1.43m0-13.5c2.1-1.3 5.1-1.7 7.8-1.2a1 1 0 0 1 .8.98v11.32c0 .58-.5 1.03-1.08.97-2.55-.27-5.37.13-7.52 1.43m0-13.5v13.5"/>
      </svg>`,
  },
  "ai-teacher": {
    label: "AI Teacher",
    getSvg: (color) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.6" stroke="${color}" stroke-width="1.85"/>
        <path stroke="${color}" stroke-width="1.75" stroke-linecap="round" d="M12 3.5c-1.3 3.1-4.1 5-8.1 5.5M12 3.5c1.3 3.1 4.1 5 8.1 5.5"/>
        <circle cx="9.25" cy="11.6" r="1.15" fill="${color}"/>
        <circle cx="14.75" cy="11.6" r="1.15" fill="${color}"/>
        <path stroke="${color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" d="M10.9 14.7c.65.45 1.55.45 2.2 0M7.8 18.8l2.2-2.7m6.2 2.7-2.2-2.7m-2 3.8v-1.9"/>
      </svg>`,
  },
  chat: {
    label: "Chat",
    getSvg: (color) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M12 3.8c-4.86 0-8.8 3.54-8.8 7.9 0 1.98.81 3.79 2.15 5.18l-1.15 3.12 3.42-1.14c1.31.6 2.8.94 4.38.94 4.86 0 8.8-3.54 8.8-7.9S16.86 3.8 12 3.8Z"/>
      </svg>`,
  },
  profile: {
    label: "Profile",
    getSvg: (color) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7.6" r="3.5" stroke="${color}" stroke-width="1.9"/>
        <path stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M6.6 19.8h10.8c.95 0 1.62-.82 1.38-1.74-.82-3.1-3.55-4.76-6.78-4.76s-5.96 1.66-6.78 4.76c-.24.92.43 1.74 1.38 1.74Z"/>
      </svg>`,
  },
};

const ACTIVE_COLOR = "#6C4EF5";
const INACTIVE_COLOR = "#6B7280";
const CIRCLE_SIZE = 56;

export function CustomTabBar({
  state,
  emitter,
  navigateToTab,
  insets,
}: BottomTabBarProps) {
  const [tabWidth, setTabWidth] = useState(0);
  const [translateX] = useState(() => new Animated.Value(0));

  // Place the circle instantly on first layout.
  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width / state.routes.length;
    setTabWidth(width);
    translateX.setValue(state.index * width);
  };

  // Slide the circle to the selected tab.
  useEffect(() => {
    if (!tabWidth) return;
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      stiffness: 220,
      damping: 22,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth, translateX]);

  return (
    <View
      className="bg-neutral-background px-3 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View
        className="h-[76px] flex-row rounded-[32px] border border-neutral-border bg-neutral-background"
        style={styles.bar}
        onLayout={handleLayout}
      >
        {/* Animated active circle */}
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.circleSlot,
              { width: tabWidth, transform: [{ translateX }] },
            ]}
          >
            <View
              className="rounded-full bg-primary-lingua-purple"
              style={styles.circle}
            />
          </Animated.View>
        )}

        {state.routes.map((route, index) => {
          const tab = TABS[route.name as TabName];
          if (!tab) return null;

          const isFocused = state.index === index;
          const iconColor = isFocused ? "#FFFFFF" : INACTIVE_COLOR;
          const iconUri = toSvgDataUri(tab.getSvg(iconColor));

          const handlePress = () => {
            const event = emitter.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigateToTab(route.key);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={handlePress}
              style={styles.tab}
            >
              <Image
                source={{ uri: iconUri }}
                style={styles.icon}
                contentFit="contain"
              />
              {!isFocused && (
                <Text
                  className="font-poppins-medium text-neutral-text-secondary"
                  style={styles.label}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  circleSlot: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    ...Platform.select({
      ios: {
        shadowColor: ACTIVE_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 11,
    lineHeight: 15,
  },
});
