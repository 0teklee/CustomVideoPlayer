import React from "react";

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
  videoContainerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  srcRef: React.RefObject<HTMLSourceElement>;
  srcOrigin: string;
  srcAd: string;
}
