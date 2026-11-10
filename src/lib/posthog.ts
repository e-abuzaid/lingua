import Constants from "expo-constants";
import PostHog from "posthog-react-native";

const extra = Constants.expoConfig?.extra;
const projectToken = extra?.posthogProjectToken as string | undefined;
const host = extra?.posthogHost as string | undefined;

const missingConfigurationVariable = !projectToken
  ? "EXPO_PUBLIC_POSTHOG_KEY"
  : !host
    ? "EXPO_PUBLIC_POSTHOG_HOST"
    : undefined;

if (missingConfigurationVariable && __DEV__) {
  console.error(
    new Error(
      `${missingConfigurationVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingConfigurationVariable} is configured`,
    ),
  );
}

export const posthog =
  projectToken && host
    ? new PostHog(projectToken, {
        host,
        captureAppLifecycleEvents: true,
        debug: __DEV__,
        logs: {
          serviceName: "lingua-mobile",
          environment: __DEV__ ? "development" : "production",
          serviceVersion: Constants.expoConfig?.version,
        },
      })
    : undefined;
