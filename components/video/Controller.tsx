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
}: // isPlaying,
// setIsPlaying,
PropInterface) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isAdPlayed, setIsAdPlayed] = useState(false);
  const [adTime, setAdTime] = useState({
    originTime: 0,
    adTime: 0,
    adLoaded: false,
  });

  const playEventHandler = () => {
    if (!isPlaying) {
      videoElement?.play();
      setIsPlaying((prev) => !prev);
    } else {
      videoElement?.pause();
      setIsPlaying((prev) => !prev);
    }
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    switch (e.code) {
      case "ArrowLeft":
        if (videoElement) videoElement.currentTime -= 5;
        break;
      case "ArrowRight":
        if (videoElement) videoElement.currentTime += 5;
        break;
      case "Space":
        if (videoElement) {
          if (isPlaying) {
            videoElement.pause();
            setIsPlaying && setIsPlaying(false);
          } else {
            videoElement.play();
            setIsPlaying && setIsPlaying(true);
          }
        }
        break;
      default:
        return;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setShowControl(true);
    setHideCursor(false);
    setCoords({ x: e.screenX, y: e.screenY });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowControl(false);
      setHideCursor(true);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [coords]);

  // 타임아웃 useEffect
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowControl(false);
      setHideCursor(true);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [coords]);

  // 광고 기능

  // 30초 이후 광고 불러오도록 트리거
  useEffect(() => {
    if (isAdPlayed) return;
    if (currentTime && 30 < currentTime) {
      setAdTime({ ...adTime, originTime: currentTime + 5 });
      setIsAdPlayed(true);
    }
  }, [currentTime]);

  // 광고 로드
  useEffect(() => {
    if (!adTime.adLoaded && srcElement) {
      setTimeout(() => {
        srcElement.src = srcCommercial;
        videoElement?.load();
        videoElement?.play();
        setAdTime({ ...adTime, adLoaded: true });
      }, 5000);
    }
  }, [isAdPlayed]);

  // 광고 종료 이후 원래 위치로 돌아가기
  useEffect(() => {
    if (
      videoElement &&
      srcElement &&
      srcElement.src === srcCommercial &&
      currentTime === totalTime
    ) {
      srcElement.src = srcOrigin;
      videoElement?.load();
      videoElement.currentTime = adTime.originTime;
      videoElement?.play();
      setIsAdPlayed(true);
      setIsPlaying(true);
    }
  }, [currentTime]);
  // 광고 카운터
  // const adCounter = (a : number) : number => {

  // }

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
