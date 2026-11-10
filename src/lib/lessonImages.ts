import { images } from "@/constants/images";
import { Lesson } from "@/types/learning";
import { ImageSourcePropType } from "react-native";

type LessonImagePair = {
  hero: ImageSourcePropType;
  card: ImageSourcePropType;
};

const ICON_IMAGE_MAP: Record<string, LessonImagePair> = {
  coffee: {
    hero: images.lessonCafeHero,
    card: images.lessonCafeThumb,
  },
  "hand-wave": {
    hero: images.lessonGreetings,
    card: images.mascotWelcome,
  },
  sun: {
    hero: images.lessonDailyLife,
    card: images.lessonDailyLife,
  },
  map: {
    hero: images.lessonTravel,
    card: images.palace,
  },
  "shopping-bag": {
    hero: images.lessonShopping,
    card: images.treasure,
  },
  users: {
    hero: images.lessonFamily,
    card: images.lessonFamily,
  },
  soup: {
    hero: images.lessonFood,
    card: images.lessonFood,
  },
  sparkles: {
    hero: images.lessonGreetings,
    card: images.mascotAuth,
  },
  music: {
    hero: images.lessonHobbies,
    card: images.lessonHobbies,
  },
};

export function getLessonHeroImage(lesson?: Lesson): ImageSourcePropType {
  if (!lesson?.icon) {
    return images.lessonCafeHero;
  }
  return ICON_IMAGE_MAP[lesson.icon]?.hero ?? images.lessonCafeHero;
}

export function getLessonCardImage(lesson?: Lesson): ImageSourcePropType {
  if (!lesson?.icon) {
    return images.lessonCafeThumb;
  }
  return ICON_IMAGE_MAP[lesson.icon]?.card ?? images.lessonCafeThumb;
}
