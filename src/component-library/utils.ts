import EmotionStyled from "@emotion/styled";

export const styled = (WrappedComponent) => {
  return function <T extends {}>(cb) {
    // TODO: See if we can make types better
    return EmotionStyled(WrappedComponent)<T & { ref?: any }>(cb);
  };
};
