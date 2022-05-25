import { DefaultTheme } from "styled-components";
export const theme: DefaultTheme = {
  flexBox: (
    direction = "row",
    alignItems = "center",
    justifyContent = "center"
  ) => {
    return `
    display: flex;
    flex-direction: ${direction};
    align-items : ${alignItems};
    justify-content: ${justifyContent}
    `;
  },
};
