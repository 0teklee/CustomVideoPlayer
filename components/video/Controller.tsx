import { memo } from "react";
import ProgressBar from "./ProgressBar";

import ControlBtn from "./ControlBtn";
import styled from "styled-components";
import { PropInterface } from "util/PropsInterface";
import { useEffect, useState } from "react";

const Controller = ({
  currentTime,
  totalTime,
  showControl,
  videoElement,
  isPlaying,
  setIsPlaying,
}: PropInterface) => {
  return (
    <Container showControl={showControl}>
      <ProgressBar
        currentTime={currentTime}
        totalTime={totalTime}
        videoElement={videoElement}
      />
      <ControlBtn
        videoElement={videoElement}
        currentTime={currentTime}
        totalTime={totalTime}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </Container>
  );
};

const Container = styled.div<{ showControl?: boolean }>`
  display: ${(props) => (props.showControl ? "block" : "none")};
  width: 100%;
  padding: 0 20px;
  padding-top: 10px;
  background: #00000061;
  position: absolute;
  bottom: 1px;
`;

export default memo(Controller);
