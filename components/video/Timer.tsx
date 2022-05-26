import { useEffect, useState } from "react";
import styled from "styled-components";
import { PropInterface } from "util/PropsInterface";

const Timer = ({ videoElement }: PropInterface) => {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  // 시간 업데이트 함수
  const timeConvert = (a: number | null | undefined): string => {
    if (!a) a = 0;
    let min: number | string = Math.floor(a / 60);
    let sec: number | string = Math.floor(a % 60);

    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    return `${min}:${sec}`;
  };

  useEffect(() => {
    videoElement?.addEventListener("onTimeUpdate", (e) => {
      setCurrent(videoElement.currentTime);
    });
    return () =>
      videoElement?.removeEventListener("onTimeUpdate", (e) => {
        setCurrent(videoElement.currentTime);
      });
  }, [videoElement]);
  return (
    <TimeStamp>
      {" "}
      {timeConvert(current)} / {timeConvert(videoElement?.duration)}
    </TimeStamp>
  );
};

export default Timer;

const TimeStamp = styled.p`
  color: #fff;
  font-weight: 600;
`;
