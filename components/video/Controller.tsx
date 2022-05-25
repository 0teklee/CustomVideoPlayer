import { memo } from "react";
import ProgressBar from "./ProgressBar";

import ControlBtn from "./ControlBtn";
import styled from "styled-components";
import { ControllerInterface } from "util/PropsInterface";
import { useEffect, useState } from "react";

const Controller = ({
  videoContainerRef,
  videoRef,
  srcRef,
  srcOrigin,
  srcAd,
}: ControllerInterface) => {
  const [showControl, setShowControl] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isAdPlayed, setIsAdPlayed] = useState(false);
  const [adTime, setAdTime] = useState({
    originTime: 0,
    adTime: 0,
    adLoaded: false,
  });
  const [current, setCurrent] = useState(0);
  const totalTime = videoRef?.current?.duration;

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    switch (e.code) {
      case "ArrowLeft":
        videoRef.current!.currentTime -= 5;
        break;
      case "ArrowRight":
        videoRef.current!.currentTime += 5;
        break;
      case "Space":
        if (videoRef.current!.paused) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }

        break;
      default:
        return;
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current!.paused) {
      videoRef.current!.play();
    } else {
      videoRef.current!.pause();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setShowControl(true);
    setHideCursor(false);
    setCoords({ x: e.screenX, y: e.screenY });
  };

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
    if (30 < current) {
      setAdTime({ ...adTime, originTime: current + 5 });
      setIsAdPlayed(true);
    }
  }, [current]);

  // 광고 로드
  useEffect(() => {
    if (!adTime.adLoaded && isAdPlayed) {
      setTimeout(() => {
        srcRef.current!.src = srcAd;
        videoRef?.current?.load();
        videoRef?.current?.play();
        setAdTime({ ...adTime, adLoaded: true });
      }, 5000);
    }
  }, [isAdPlayed]);

  // 광고 종료 이후 원래 위치로 돌아가기
  useEffect(() => {
    if (srcRef.current!.src === srcAd && current === totalTime) {
      srcRef.current!.src = srcOrigin;
      videoRef.current!.load();
      videoRef.current!.currentTime = adTime.originTime;
      videoRef.current!.play();
      setIsAdPlayed(true);
    }
  }, [current]);
  // 광고 카운터
  // const adCounter = (a : number) : number => {

  // }

  useEffect(() => {
    videoContainerRef.current?.addEventListener("mouseenter", () => {
      setShowControl(true);
    });
    videoRef?.current?.addEventListener("click", handleVideoClick);

    videoRef.current?.addEventListener("timeupdate", () => {
      setCurrent(videoRef.current!.currentTime);
    });

    return () => {
      return videoContainerRef?.current?.addEventListener("mouseenter", () => {
        setShowControl(true);
      });
    };
  }, [videoContainerRef, videoRef]);
  return (
    <Container showControl={showControl}>
      <ProgressBar videoRef={videoRef} />
      <ControlBtn videoRef={videoRef} />
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

export default Controller;
