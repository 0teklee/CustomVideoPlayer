import styled from "styled-components";
import { theme } from "styles/theme";
import { ReactNode } from "react";

interface StyleInterface {
  direction?: string;
  alignItems?: string;
  justifyContent?: string;
}

interface FlexBoxInterface extends StyleInterface {
  children: ReactNode;
}

const FlexBox = ({
  children,
  direction,
  alignItems,
  justifyContent,
}: FlexBoxInterface) => {
  return (
    <FlexContainer
      direction={direction}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </FlexContainer>
  );
};

const FlexContainer = styled.div<StyleInterface>`
  ${(props) =>
    theme.flexBox(props.direction, props.alignItems, props.justifyContent)}
`;

export default FlexBox;
