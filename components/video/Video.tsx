import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEventHandler,
  memo,
} from "react";
import { Layout } from "components/common/Layout";
import styled from "styled-components";
import Controls from "./Controls";
import { ControllerInterface } from "util/PropsInterface";

const Video = () => {
<<<<<<< HEAD
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isAdPlayed, setIsAdPlayed] = useState(false);
  const [adTime, setAdTime] = useState({
    originTime: 0,
    adTime: 0,
    adLoaded: false,
  });
  const ref = useRef<HTMLVideoElement>(null);
  const videoElement = ref && ref.current;
  // const currentTime = ref && ref.current && Math.floor(ref.current.currentTime);
  const totalTime = ref && ref.current && Math.floor(ref.current.duration);
=======
  const controllerRef = useRef<ControllerInterface>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
>>>>>>> refactor
  const srcRef = useRef<HTMLSourceElement>(null);

  // video source 링크
  const srcOrigin =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const srcAd =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  // container Props & handlers
  const containerProps = {
    ref: containerRef,
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (controllerRef.current) controllerRef.current.handleKeyDown(e);
    },
    onMouseEnter: () => {
      if (controllerRef.current) controllerRef.current.handleMouseIn();
    },
    onMouseLeave: () => {
      if (controllerRef.current) controllerRef.current.handleMouseLeave();
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (controllerRef.current) controllerRef.current.handleMouseMove(e);
    },
  };

<<<<<<< HEAD
  //  클릭시 setState 이벤트 핸들러
  const playEventHandler = () => {
    if (!isPlaying) {
      videoElement?.play();
      setIsPlaying((prev) => !prev);
    } else {
      videoElement?.pause();
      setIsPlaying((prev) => !prev);
    }
  };

  // // 키보드 이벤트 핸들러
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

  // 마우스 움직임 3초 이상 없으면 컨트롤 표시 X

  // 핸들러
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
=======
  // video Prop & handlers
  const videoProps = {
    ref: videoRef,
    width: "100%",
    controls: false,
    onTimeUpdate: () => {
      if (controllerRef.current) controllerRef.current.handleTimeUpdate();
    },
    onClick: () => {
      if (controllerRef.current) controllerRef.current.handleVideoClick();
    },
  };
>>>>>>> refactor

  // Controls Props
  const controlProps = {
    ref: controllerRef,
    containerRef: containerRef,
    videoRef: videoRef,
    srcRef: srcRef,
    srcOrigin: srcOrigin,
    srcAd: srcAd,
  };
  return (
    <Layout>
<<<<<<< HEAD
      <Container
        id="container"
        onMouseEnter={() => setShowControl(true)}
        onMouseLeave={() => setShowControl(false)}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        hideCursor={hideCursor}
        tabIndex={0}
      >
        {videoLoading === 2 ? <Spinner /> : null}
        <VideoWrapper
          ref={ref}
          width="100%"
          onClick={() => playEventHandler()}
          onTimeUpdate={() => {
            if (currentTime === totalTime && videoElement) {
              setIsPlaying(false);
            }
          }}
          controls={false}
        >
          <source ref={srcRef} src={srcOrigin} type="video/mp4" />
        </VideoWrapper>
        {isAdPlayed && !adTime.adLoaded && <AdNotice time={1} />}
        <Controller
          totalTime={totalTime}
          currentTime={currentTime}
          videoElement={videoElement}
          srcElement={srcElement}
          srcOrigin={srcOrigin}
          srcAd={srcAd}
          isPlaying={isPlaying}
          showControl={showControl}
          setIsPlaying={setIsPlaying}
        />
=======
      <Container {...containerProps}>
        <VideoWrapper {...videoProps}>
          <source ref={srcRef} src={srcOrigin} type="video/mp4" />
        </VideoWrapper>
        <Controls {...controlProps} />
>>>>>>> refactor
      </Container>
    </Layout>
  );
};

export default Video;

const Container = styled.div`
  position: relative;
<<<<<<< HEAD
  ${(props) => {
    if (props.hideCursor) return "cursor : none;";
  }}
=======
>>>>>>> refactor
  &:focus {
    border: none;
    outline: none;
  }
`;

const VideoWrapper = styled.video`
  &::-webkit-media-controls {
    display: none !important;
  }
`;
