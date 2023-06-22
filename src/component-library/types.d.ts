import React from "react";

/**
 * Contains uniform types for component library.
 */

import type { CSSProperties } from "react";
import colors from "./constants/colors";

export interface TwBaseProps {
  id?: string;
  "data-testid"?: string;
}

export interface TwPolymorphicComponent {
  as?: React.ElementType<any>;
}

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// TODO: See if this is necessary
export type SpacingSize =
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "big"
  | "xbig"
  | "xxbig"
  | "xxxbig"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "huge"
  | "xhuge"
  | "xxhuge"
  | "xxxhuge";

export type FormattedColor = `${keyof typeof colors}.${NumRange<0, 10>}`;

export type TwSpacingConfig = Record<SpacingSize, string>;

export type EventHandler<T extends React.HTMLAttributes<HTMLElement>> =
  PickStartsWith<T, "on">;

export interface TwStyleSystemProps {
  m?: Size;
  my?: Size;
  mx?: Size;
  mt?: Size;
  mb?: Size;
  ml?: Size;
  mr?: Size;
  p?: Size;
  py?: Size;
  px?: Size;
  pt?: Size;
  pb?: Size;
  pl?: Size;
  pr?: Size;
  bg?: FormattedColor;
  c?: FormattedColor;
  opacity?: CSSProperties["opacity"];
  ff?: CSSProperties["fontFamily"];
  fz?: Size;
  fw?: CSSProperties["fontWeight"];
  lts?: CSSProperties["letterSpacing"];
  ta?: CSSProperties["textAlign"];
  lh?: CSSProperties["lineHeight"];
  fs?: CSSProperties["fontStyle"];
  tt?: CSSProperties["textTransform"];
  td?: CSSProperties["textDecoration"];
  w?: CSSProperties["width"];
  miw?: CSSProperties["minWidth"];
  maw?: CSSProperties["maxWidth"];
  h?: CSSProperties["height"];
  mih?: CSSProperties["minHeight"];
  mah?: CSSProperties["maxHeight"];
  bgsz?: CSSProperties["backgroundSize"];
  bgp?: CSSProperties["backgroundPosition"];
  bgr?: CSSProperties["backgroundRepeat"];
  bga?: CSSProperties["backgroundAttachment"];
  pos?: CSSProperties["position"];
  top?: CSSProperties["top"];
  left?: CSSProperties["left"];
  bottom?: CSSProperties["bottom"];
  right?: CSSProperties["right"];
  inset?: CSSProperties["inset"];
  display?: CSSProperties["display"];
}
