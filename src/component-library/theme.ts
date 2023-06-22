import {
  DefaultMantineColor,
  MantineThemeOverride,
  Tuple,
  useMantineTheme,
} from "@mantine/core";
import colors from "./constants/colors";
import headings from "./constants/headings";
import { SpacingSize } from "./types";

/**
 * @description Don't use this in the exported component!  It creates a depedency
 * on Mantine. Should only be used in "Root" of each component.
 */
export const useTheme = useMantineTheme;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<"one" | "two" | DefaultMantineColor, Tuple<string, 10>>;
  }

  export interface MantineThemeOther {
    spacing: Record<SpacingSize, string>;
  }
}

// NOTE: Base size "rem" is 16px
export const theme: MantineThemeOverride = {
  colors,
  primaryColor: "one",
  primaryShade: 6,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  headings,
  radius: {
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    round: "2rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem", // this is base
    lg: "1.125rem",
    xl: "1.25rem",
  },
  // NOTE: Only use spacing here internally
  other: {
    // TODO: See if this should be converted to `rem`
    spacing: {
      xxs: "4px",
      xs: "8px",
      sm: "12px",
      md: "16px",
      big: "20px",
      xbig: "24px",
      xxbig: "28px",
      xxxbig: "32px",
      lg: "40px",
      xl: "48px",
      xxl: "64px",
      xxxl: "80px",
      huge: "96px",
      xhuge: "128px",
      xxhuge: "160px",
      xxxhuge: "192px",
    },
  },
};
