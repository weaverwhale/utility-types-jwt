import React from "react";
import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from "@mantine/core";
import type { Size, TwBaseProps, FormattedColor } from "../types";
import { ButtonStyleComputer } from "./ButtonStyleComputer";
import { PropsWithChildren, forwardRef } from "react";
import { styled } from "../utils";

export type ButtonRadius = "default" | "round";

// TODO: Think about this - maybe it's still better to just use Mantine name instead of custom
export type ButtonVariant = "primary" | "secondary" | "white";

interface BaseButtonProps
  extends TwBaseProps,
    PropsWithChildren,
    Pick<MantineButtonProps, "type" | "disabled" | "leftIcon" | "rightIcon"> {
  variant?: ButtonVariant;
  radius?: ButtonRadius;
  size?: Size;
  color?: FormattedColor;
}

export interface ButtonDefaultProps extends BaseButtonProps {
  as?: "button";
  onClick?: () => any;
}

export interface ButtonLinkProps extends BaseButtonProps {
  as: "a";
  href: string;
}

export type ButtonProps = ButtonDefaultProps | ButtonLinkProps;

// abstracting MantineButton as ButtonBase, so we can still
// pass any MantineButtonProps in the exposed component
const ButtonBase = styled(MantineButton)<MantineButtonProps>(() => ({}));

export const Button: React.FC<ButtonProps> = forwardRef((props, ref) => {
  // set defaults for relevant props
  const {
    as = "button",
    variant = "primary",
    radius = "default",
    size = "sm",
    color = "one.6",
    "data-testid": dataTestId = "button",
    ...other
  } = props;

  const mantineVariant = {
    primary: "filled",
    secondary: "outline",
    white: "default",
  }[variant];

  return (
    <ButtonBase
      {...{
        variant: mantineVariant,
        component: as,
        size,
        color,
        "data-testid": dataTestId,
        // overridden - use "styles" to override specific targeted areas of the element based on Mantine's StyleAPI
        // this is different than "sx", which is just a general object that overrides all styles
        styles: (theme) => {
          const bsc = new ButtonStyleComputer(theme, props);
          return bsc.customStyles;
        },
        ...other,
      }}
      ref={ref}
    />
  );
});
