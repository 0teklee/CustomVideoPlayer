/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FlexBox from "components/common/FlexBox";
import Button from "components/common/Button";
import { PropInterface } from "util/PropsInterface";
import Timer from "./Timer";

const ControlBtn = ({ videoElement }: PropInterface) => {
  // play icon state
  const [isPlaying, setIsPlaying] = useState(false);

  // buttonState
  const [isSound, setIsSound] = useState(true);
  const [isVolume, setIsVolume] = useState(false);

  // 시간 표시 함수

  // 재생 state
  const handlePlayEent = () => {
    if (videoElement) {
      if (!isPlaying) {
        videoElement?.play();
        setIsPlaying((prev) => !prev);
      } else {
        videoElement?.pause();
        setIsPlaying((prev) => !prev);
      }
    }
  };

  // volume 조절
  const [volume, setVolume] = useState(0);
  const volumeCallback = useCallback((value: number) => {
    setVolume(value);
  }, []);
  const volumeRef = useRef<HTMLInputElement>(null);

  // 볼륨 저장 ref useEffect - 추후 수정
  useEffect(() => {
    if (volumeRef && volumeRef.current) {
      volumeRef.current.value = String(volume);
    }
  }, [isVolume]);

  // 재생 / 정지 이벤트 추가
  useEffect(() => {
    videoElement?.addEventListener("click", handlePlayEent);
  }, []);

  return (
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
        {isPlaying ? (
          <Button
            onClick={() => {
              if (setIsPlaying && videoElement) {
                setIsPlaying(false);
                videoElement?.pause();
              }
            }}
          >
            <Image
              src="/images/icons8-pause-50.png"
              width={20}
              height={20}
              alt="pause"
            />
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (setIsPlaying && videoElement) {
                setIsPlaying(true);
                videoElement?.play();
              }
            }}
          >
            <Image
              src="/images/icons8-play-50.png"
              width={20}
              height={20}
              alt="play"
            />
          </Button>
        )}
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
            if (videoElement) videoElement.currentTime = videoElement.duration;
          }}
        >
          <Image
            src="/images/icons8-end-50.png"
            width={20}
            height={20}
            alt="end"
          />
        </Button>
        <Timer videoElement={videoElement} />
      </FlexBox>
      <FlexBox>
        <SoundEventWrapper
          onMouseOver={() => {
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
            style={SoundBtn}
          >
            {isSound ? (
              <Image
                src="/images/icons8-sound-50.png"
                width={20}
                height={20}
                alt="sound"
              />
            ) : (
              <Image
                src="/images/icons8-no-audio-50.png"
                width={20}
                height={20}
                alt="sound"
              />
            )}
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
            if (videoElement) {
              videoElement.parentElement?.requestFullscreen();
            }
          }}
        >
          <Image
            src="/images/icons8-full-screen-24.png"
            width={20}
            height={20}
            alt="fullscreen"
          />
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

const SoundBtn = `
position: relative;
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

export default ControlBtn;
