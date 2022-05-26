import React, { memo } from "react";
import ProgressBar from "./ProgressBar";
import ControlBtn from "./ControlBtn";
import styled from "styled-components";
import { ControllerInterface } from "util/PropsInterface";
import { useEffect, useState } from "react";

const ControllerComponent = (
  { srcOrigin, srcAd, srcRef }: ControllerInterface,
  ref: React.RefObject<HTMLVideoElement>
) => {
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
  const videoRef = ref.current;
  const videoContainerRef = ref.current!.parentElement;
  const totalTime = videoRef!.duration;

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    switch (e.code) {
      case "ArrowLeft":
        videoRef!.currentTime -= 5;
        break;
      case "ArrowRight":
        videoRef!.currentTime += 5;
        break;
      case "Space":
        if (videoRef!.paused) {
          videoRef!.play();
        } else {
          videoRef!.pause();
        }

        break;
      default:
        return;
    }
  };

  const handleVideoClick = () => {
    if (videoRef!.paused) {
      videoRef!.play();
    } else {
      videoRef!.pause();
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
        videoRef!.load();
        videoRef!.play();
        setAdTime({ ...adTime, adLoaded: true });
      }, 5000);
    }
  }, [isAdPlayed]);

  // 광고 종료 이후 원래 위치로 돌아가기
  useEffect(() => {
    if (srcRef.current!.src === srcAd && current === totalTime) {
      srcRef.current!.src = srcOrigin;
      videoRef!.load();
      videoRef!.currentTime = adTime.originTime;
      videoRef!.play();
      setIsAdPlayed(true);
    }
  }, [current]);
  // 광고 카운터
  // const adCounter = (a : number) : number => {

  // }

  useEffect(() => {
    videoContainerRef!.addEventListener("mouseenter", () => {
      setShowControl(true);
    });
    videoRef!.addEventListener("click", handleVideoClick);

    videoRef!.addEventListener("timeupdate", () => {
      setCurrent(videoRef!.currentTime);
    });

    return () => {
      return videoContainerRef!.addEventListener("mouseenter", () => {
        setShowControl(true);
      });
    };
  }, [videoContainerRef, videoRef]);
  return (
    <>
      <button onClick={() => console.log(ref)}>클릭</button>

      <Container showControl={showControl}>
        <ProgressBar ref={videoRef} />
        <ControlBtn ref={videoRef} />
      </Container>
    </>
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

const Controller = React.forwardRef(ControllerComponent);

export default Controller;
