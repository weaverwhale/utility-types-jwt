import EmotionStyled from '@emotion/styled'

export const styled = (WrappedComponent: any) => {
  return function <T extends {}>(cb: any) {
    // TODO: See if we can make types better
    return EmotionStyled(WrappedComponent)<T & { ref?: any }>(cb)
  }
}
