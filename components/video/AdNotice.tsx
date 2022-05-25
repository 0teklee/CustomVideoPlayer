import { useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";

const AdNotice = ({ time }: { time: number }) => {
  return (
    <Container>
      <p>{time}초 후에 광고가 재생됩니다.</p>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${theme.flexBox()};
  width: 250px;
  height: 50px;
  background: #00000069;
  color: #fff;
  text-align: center;
`;

export default AdNotice;
