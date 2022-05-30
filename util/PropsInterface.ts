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

export interface ControlsInterface {
  containerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  srcRef: React.RefObject<HTMLSourceElement>;
  srcOrigin: string;
  srcAd: string;
}

export interface ControllerInterface {
  handleVideoClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleMouseIn: () => void;
  handleMouseLeave: () => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleTimeUpdate: () => void;
}
