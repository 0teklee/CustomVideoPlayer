import { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

interface StyleInterface {
  style?: string;
}

interface PropInterface<T, V> extends StyleInterface {
  children: ReactNode;
  onClick: () => void;
  onMouseEnter?: T;
  onMouseLeave?: T;
  onKeyDown?: V;
}

const Button = ({
  children,
  onClick,
  style,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
}: PropInterface<MouseEventHandler, KeyboardEventHandler>) => {
  return (
    <ButtonContainer
      onClick={onClick}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
    >
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<StyleInterface>`
  all: unset;
  ${(props) => props.style}
  margin-right: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    border-radius: 10px;
    background: #7171717a;
  }
`;

export default Button;
