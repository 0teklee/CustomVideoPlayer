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
  bottom: 80px;
  right: 10px;
  ${theme.flexBox()};
  height: 50px;
  padding: 0 10px;
  background: #00000069;
  color: #fff;
  text-align: center;
`;

export default AdNotice;
