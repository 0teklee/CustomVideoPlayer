import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    flexBox: (
      direction?: string,
      alignItems?: string,
      justifyContent?: string
    ) => string;
  }
}
