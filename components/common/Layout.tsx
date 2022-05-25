import { ReactNode } from "react";
import styled from "styled-components";

interface StyleInterface {
  width?: string;
  alignCenter?: string;
}

interface LayoutInterface extends StyleInterface {
  children: ReactNode;
}

export const Layout = ({ children, width, alignCenter }: LayoutInterface) => {
  return (
    <Container width={width} alignCenter={alignCenter}>
      {children}
    </Container>
  );
};

const Container = styled.div<StyleInterface>`
  width: ${(props) => (props.width ? props.width : "100%")};
  ${(props) => {
    if (props.alignCenter) {
      return `margin : ${props.alignCenter}`;
    }
  }}
`;
