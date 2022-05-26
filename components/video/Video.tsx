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
import Controller from "./Controller";
import Spinner from "components/common/Spinner";
import AdNotice from "./AdNotice";

const Video = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcRef = useRef<HTMLSourceElement>(null);
  // const forwardRefProp = {
  //   container: videoContainerRef,
  //   video: videoRef,
  //   src: srcRef,
  // };

  // // video source 링크
  const srcOrigin =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const srcAd =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  // 로딩 시 네트워크 상태. 1일 시 로딩 완료, 2일 시 로딩 중.
  const videoLoading = videoRef?.current?.networkState;
  return (
    <Layout>
      <Container id="container" tabIndex={0} ref={videoContainerRef}>
        {videoLoading === 2 ? <Spinner /> : null}
        <VideoWrapper ref={videoRef} width="100%" controls={false}>
          <source ref={srcRef} src={srcOrigin} type="video/mp4" />
        </VideoWrapper>
        {/* {isAdPlayed && !adTime.adLoaded && <AdNotice time={1} />} */}
        <Controller
          // videoContainerRef={videoContainerRef}
          // videoRef={videoRef}
          srcRef={srcRef}
          srcOrigin={srcOrigin}
          srcAd={srcAd}
          ref={videoRef}
        />
      </Container>
    </Layout>
  );
};

export default Video;

const Container = styled.div<{ hideCursor?: boolean }>`
  position: relative;
  /* ${(props) => {
    if (props.hideCursor) return "cursor : none;";
  }} */
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
