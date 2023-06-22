import { ButtonProps, ButtonRadius, ButtonVariant } from './Button'
import { FormattedColor, Size } from '../types'
import { StyleComputer } from '../interfaces/StyleComputer'
import { MantineTheme } from '@mantine/core'

type ExtractedButtonProps = Pick<
  ButtonProps,
  'size' | 'radius' | 'color' | 'variant'
>

export class ButtonStyleComputer implements StyleComputer {
  private readonly size: Size = 'sm'
  private readonly radius: ButtonRadius = 'default'
  private readonly color: FormattedColor = 'one.6'
  private readonly variant: ButtonVariant = 'primary'

  public constructor(
    private readonly theme: MantineTheme,
    props: ExtractedButtonProps
  ) {
    this.size = props.size ?? this.size
    this.radius = props.radius ?? this.radius
    this.color = props.color ?? this.color
    this.variant = props.variant ?? this.variant
  }

  // map our custom shapes to the radius's defined in the theme object
  private get borderRadius(): string {
    return {
      default: this.theme.radius.xs,
      round: this.theme.radius['round'],
    }[this.radius]
  }

  // convert the formatted color to the actual color string it represents in the theme object
  private get colorString(): string {
    const c = this.color.split('.') // like "orange.5" for example
    return this.theme.colors[c[0]][c[1] as any]
  }

  // override hover styles
  private get hoverStyles(): object | null {
    if (this.variant !== 'secondary') return null

    return {
      '&:hover': {
        backgroundColor: this.colorString,
        color: '#FFFFFF',
      },
    }
  }

  private get root_CustomStyles() {
    return {
      borderRadius: this.borderRadius,
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      '&:focus': {
        // TODO: Would be better for accessibility if we used "outline" instead of box-shadow - try to refactor when we have time
        boxShadow: `0px 1px 2px rgba(0, 0, 0, 0.05),
                    0px 0px 0px 2px #FFFFFF,
                    0px 0px 0px 4px ${this.colorString}`,
      },
      ...(!!this.hoverStyles && this.hoverStyles),
    }
  }

  // currently using the format for Mantine custom styles based on their style api for the button component
  public get customStyles() {
    return {
      root: this.root_CustomStyles,
    }
  }
}
