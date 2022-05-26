import React, { ForwardedRef } from "react";

export interface PropInterface {
  videoContainerRef?: React.RefObject<HTMLDivElement>;
  videoRef?: React.RefObject<HTMLVideoElement>;
  srcRef?: React.RefObject<HTMLSourceElement>;
  showControl?: boolean;
  srcOrigin?: string;
  srcAd?: string;
  isPlaying?: boolean;
  clickHandle?: () => void;
  setIsPlaying?: (a: boolean) => void;
  setShowControl?: (a: boolean) => void;
}

export interface ControllerInterface {
  srcRef: React.RefObject<HTMLSourceElement>;
  srcOrigin: string;
  srcAd: string;
}

export interface VideoPropInterface {
  videoRef: React.RefObject<HTMLVideoElement>;
}

// export interface RefPropInterface {
//   container: React.ForwardedRef<HTMLDivElement>;
//   video: React.ForwardedRef<HTMLVideoElement>;
//   src: React.ForwardedRef<HTMLSourceElement>;
// }
