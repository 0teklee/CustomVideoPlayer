import styled from "styled-components";
import { VideoPropInterface } from "util/PropsInterface";
import { memo, useEffect, useState } from "react";

const ProgressBar = ({
  videoRef,
}: //  totalTime
VideoPropInterface) => {
  // const currentTime = videoElement && Math.floor(videoElement.currentTime);
  // const totalTime =
  //   videoElement && videoElement.duration && Math.floor(videoElement.duration);

  // const [current, setCurrent] = useState(currentTime);
  const timeUpdate = (a: number | null | undefined) => {
    if (typeof a === "number") return a;
    return;
  };

  const total = timeUpdate(totalTime);
  const current = timeUpdate(currentTime);

  return (
    <RangeStyle
      type="range"
      defaultValue={current}
      max={total}
      onChange={(e) => {
        if (videoElement) videoElement.currentTime = Number(e.target.value);
      }}
    />
  );
};

export default ProgressBar;

const RangeStyle = styled.input`
  width: 100%;
`;
