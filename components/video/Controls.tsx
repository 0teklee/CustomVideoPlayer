/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ControlsInterface, VideoPropInterface } from "util/PropsInterface";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
import Image from "next/image";
import Button from "components/common/Button";
import FlexBox from "components/common/FlexBox";
import AdNotice from "./AdNotice";

const Controls = forwardRef(
  (
    { containerRef, videoRef, srcRef, srcAd, srcOrigin }: ControlsInterface,
    ref
  ) => {
    const [showControl, setShowControl] = useState(false);
    const [hideCursor, setHideCursor] = useState(false);
    const [coords, setCoords] = useState({ x: 0 });
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isSound, setIsSound] = useState(true);
    const [isVolume, setIsVolume] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [adCountDown, setAdCountDown] = useState(5);
    const [isAdPlayed, setIsAdPlayed] = useState(false);
    const [adTime, setAdTime] = useState({
      originTime: 0,
      adPopUp: false,
      adLoaded: false,
    });

    const containerElement = containerRef.current;
    const videoElement = videoRef.current;
    const srcElement = srcRef.current;
    const videoLoading = videoRef?.current?.networkState;
    const totalTime = videoElement?.duration;
    const volumeRef = useRef<HTMLInputElement>(null);

    // volume 조절 핸들러
    const volumeCallback = useCallback((value: number) => {
      setVolume(value);
    }, []);

    // 현재 / 전체 시간 표시 함수
    const timeUpdate = (a: number | null | undefined): string => {
      if (!a) a = 0;
      a = Math.floor(a);
      let min: number | string = Math.floor(a / 60);
      let sec: number | string = Math.floor(a % 60);

      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;

      return `${min}:${sec}`;
    };

    // 비디오 재생 키보드 이벤트 핸들러
    const handleKeyDown = (e: React.KeyboardEvent): void => {
      switch (e.code) {
        case "ArrowLeft":
          videoElement!.currentTime -= 5;
          break;
        case "ArrowRight":
          videoElement!.currentTime += 5;
          break;
        case "Space":
          if (videoElement!.paused) {
            videoElement!.play();
            setIsPlaying(true);
          } else {
            videoElement!.pause();
            setIsPlaying(false);
          }
          break;
        default:
          return;
      }
    };

    const handleVideoClick = () => {
      if (videoElement) {
        if (videoElement.paused) {
          videoElement.play();
          setIsPlaying(true);
        } else {
          videoElement.pause();
          setIsPlaying(false);
        }
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      setShowControl(true);
      setHideCursor(false);
      setCoords({ x: e.screenX });
    };

    const handleMouseIn = () => {
      setShowControl(true);
    };

    const handleMouseLeave = () => {
      setShowControl(false);
    };

    const handleTimeUpdate = () => {
      setCurrent(videoElement?.currentTime || 0);
    };

    // 타임아웃 useEffect
    useEffect(() => {
      const timeOut = setTimeout(() => {
        setShowControl(false);
        setHideCursor(true);
      }, 3000);
      return () => clearTimeout(timeOut);
    }, [coords]);

    // volume toggle에 현재 volume 업데이트 useEffect
    useEffect(() => {
      if (volumeRef && volumeRef.current) {
        volumeRef.current.value = String(volume);
      }
    }, [isVolume]);

    ///// 광고 기능 /////

    // 30초 이후 광고 불러오도록 트리거
    useEffect(() => {
      if (isAdPlayed) return;
      if (30 < current) {
        setAdTime({ ...adTime, originTime: current + 5, adLoaded: true });
      }
    }, [current]);

    // 광고 안내 문구 마운트 & 5초 후 광고 로드
    useEffect(() => {
      if (srcElement && videoElement) {
        setAdTime({ ...adTime, adPopUp: true });
        let countdown = setInterval(
          () => setAdCountDown((prev) => prev - 1),
          1000
        );
        setTimeout(() => {
          setAdTime({ ...adTime, adPopUp: false });
          srcElement!.src = srcAd;
          videoElement!.load();
          videoElement!.play();
          clearInterval(countdown);
        }, 5000);
      }
    }, [adTime.adLoaded]);

    // 광고 종료 이후 기존 비디오의 위치로 돌아가기
    useEffect(() => {
      if (isAdPlayed) return;
      if (srcElement?.src === srcAd && current === totalTime) {
        srcElement!.src = srcOrigin;
        videoElement!.load();
        videoElement!.currentTime = adTime.originTime;
        videoElement!.play();
        setIsAdPlayed(true);
      }
    }, [current]);

    // 부모 컴포넌트로 핸들러 함수 올리기
    useImperativeHandle(ref, () => ({
      handleVideoClick,
      handleKeyDown,
      handleMouseIn,
      handleMouseLeave,
      handleMouseMove,
      handleTimeUpdate,
    }));
    return (
      <>
        {videoLoading === 2 ? <Spinner /> : null}
        {adTime.adPopUp && <AdNotice time={adCountDown} />}
        {showControl && (
          <Container>
            <RangeStyle
              type="range"
              value={current}
              max={String(totalTime)}
              onChange={(e) => {
                videoElement!.currentTime = Number(e.target.value);
              }}
            />
            <FlexBox justifyContent="space-between">
              <FlexBox>
                <Button
                  onClick={() => {
                    if (videoElement) videoElement.currentTime = 0;
                  }}
                >
                  <Image
                    src="/images/icons8-start-50.png"
                    width={20}
                    height={20}
                    alt="start"
                  />
                </Button>
                <Button
                  onClick={() => {
                    if (videoElement) videoElement.currentTime -= 5;
                  }}
                >
                  <Image
                    src="/images/icons8-backward-50.png"
                    width={15}
                    height={15}
                    alt="go_back"
                  />
                </Button>
                <Button
                  onClick={() => {
                    if (isPlaying) {
                      videoElement?.pause();
                      setIsPlaying(false);
                    } else {
                      videoElement?.play();
                      setIsPlaying(true);
                    }
                  }}
                >
                  <Image
                    src={
                      isPlaying
                        ? "/images/icons8-pause-50.png"
                        : "/images/icons8-play-50.png"
                    }
                    width={20}
                    height={20}
                    alt="play/pause"
                  />
                </Button>
                <Button
                  onClick={() => {
                    if (videoElement) videoElement.currentTime += 5;
                  }}
                >
                  <Image
                    src="/images/icons8-reset-50.png"
                    width={15}
                    height={15}
                    alt="go_forawrd"
                  />
                </Button>
                <Button
                  onClick={() => {
                    if (videoElement)
                      videoElement.currentTime = videoElement.duration;
                  }}
                >
                  <Image
                    src="/images/icons8-end-50.png"
                    width={20}
                    height={20}
                    alt="end"
                  />
                </Button>
                <TimeStamp>
                  {`${timeUpdate(current)} / ${timeUpdate(totalTime)}`}
                </TimeStamp>
              </FlexBox>
              <FlexBox>
                <SoundEventWrapper
                  onMouseEnter={() => {
                    setIsVolume(true);
                  }}
                  onMouseLeave={() => {
                    setIsVolume(false);
                  }}
                >
                  <Button
                    onClick={() => {
                      if (videoElement) {
                        if (isSound) {
                          videoElement.muted = true;
                          setIsSound(false);
                        } else {
                          videoElement.muted = false;
                          setIsSound(true);
                        }
                      }
                    }}
                  >
                    <Image
                      src={
                        isSound
                          ? "/images/icons8-sound-50.png"
                          : "/images/icons8-no-audio-50.png"
                      }
                      width={20}
                      height={20}
                      alt="sound"
                    />
                  </Button>
                  {isVolume && (
                    <SoundToggleWrapper>
                      <SoundToggle
                        type="range"
                        ref={volumeRef}
                        onChange={(e) => {
                          volumeCallback(Number(e.target.value));
                          if (videoElement) {
                            videoElement.volume = Number(e.target.value) / 100;
                          }
                        }}
                      />
                    </SoundToggleWrapper>
                  )}
                </SoundEventWrapper>
                <Button
                  onClick={() => {
                    if (containerElement) {
                      if (isFull) {
                        document.exitFullscreen();
                        setIsFull(false);
                      } else {
                        containerElement.requestFullscreen();
                        setIsFull(true);
                      }
                    }
                  }}
                >
                  <Image
                    src={
                      isFull
                        ? "/images/icons8-collapse-50.png"
                        : "/images/icons8-full-screen-24.png"
                    }
                    width={20}
                    height={20}
                    alt="fullscreen"
                  />
                </Button>
              </FlexBox>
            </FlexBox>
          </Container>
        )}
      </>
    );
  }
);

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-top: 10px;
  background: #00000061;
  position: absolute;
  bottom: 1px;
`;

const RangeStyle = styled.input`
  width: 100%;
`;

const TimeStamp = styled.p`
  color: #fff;
  font-weight: 600;
`;

const SoundEventWrapper = styled.div`
  display: inline-block;
`;

const SoundToggleWrapper = styled.div`
  display: inline-block;
  padding: 5px;
  border-radius: 10px;
  background: #717171ce;
`;

const SoundToggle = styled.input`
  width: 100px;
`;

export default Controls;
