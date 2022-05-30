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
  const controllerRef = useRef<ControllerInterface>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      <Container {...containerProps}>
        <VideoWrapper {...videoProps}>
          <source ref={srcRef} src={srcOrigin} type="video/mp4" />
        </VideoWrapper>
        <Controls {...controlProps} />
      </Container>
    </Layout>
  );
};

export default Video;

const Container = styled.div`
  position: relative;
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
