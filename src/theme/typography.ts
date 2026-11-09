export const typography = {
  fontFamilies: {
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    semiBold: "Poppins-SemiBold",
    bold: "Poppins-Bold",
  },
  styles: {
    h1: {
      fontSize: 32,
      lineHeight: 38.4, // 32 * 1.2
      fontFamily: "Poppins-Bold",
      fontWeight: "700",
    },
    h2: {
      fontSize: 24,
      lineHeight: 31.2, // 24 * 1.3
      fontFamily: "Poppins-SemiBold",
      fontWeight: "600",
    },
    h3: {
      fontSize: 20,
      lineHeight: 26, // 20 * 1.3
      fontFamily: "Poppins-SemiBold",
      fontWeight: "600",
    },
    h4: {
      fontSize: 16,
      lineHeight: 22.4, // 16 * 1.4
      fontFamily: "Poppins-Medium",
      fontWeight: "500",
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: 25.6, // 16 * 1.6
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 22.4, // 14 * 1.6
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
    },
    bodySmall: {
      fontSize: 13,
      lineHeight: 20.8, // 13 * 1.6
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
    },
    caption: {
      fontSize: 11,
      lineHeight: 15.4, // 11 * 1.4
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
    },
  },
} as const;

export type Typography = typeof typography;

