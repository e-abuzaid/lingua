import androidIconBackground from "@/assets/images/android-icon-background.png";
import androidIconForeground from "@/assets/images/android-icon-foreground.png";
import androidIconMonochrome from "@/assets/images/android-icon-monochrome.png";
import earth from "@/assets/images/earth.png";
import favicon from "@/assets/images/favicon.png";
import icon from "@/assets/images/icon.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import moscotLogo from "@/assets/images/moscot-logo.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";

const aiTeacherAvatar = {
  uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
};

export const images = {
  androidIconBackground,
  androidIconForeground,
  androidIconMonochrome,
  earth,
  favicon,
  icon,
  mascotAuth,
  mascotWelcome,
  moscotLogo,
  palace,
  streakFire,
  treasure,
  aiTeacherAvatar,
} as const;

export type Images = typeof images;

