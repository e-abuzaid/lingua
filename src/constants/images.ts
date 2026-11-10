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

const lessonCafeHero = {
  uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
};

const lessonCafeThumb = {
  uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
};

const lessonDailyLife = {
  uri: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
};

const lessonGreetings = {
  uri: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
};

const lessonTravel = {
  uri: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80",
};

const lessonShopping = {
  uri: "https://images.unsplash.com/photo-1483985988635-f9376a527a3e?auto=format&fit=crop&w=900&q=80",
};

const lessonFamily = {
  uri: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
};

const lessonFood = {
  uri: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
};

const lessonHobbies = {
  uri: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
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
  lessonCafeHero,
  lessonCafeThumb,
  lessonDailyLife,
  lessonGreetings,
  lessonTravel,
  lessonShopping,
  lessonFamily,
  lessonFood,
  lessonHobbies,
} as const;

export type Images = typeof images;

