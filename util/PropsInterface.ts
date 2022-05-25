export interface PropInterface {
  currentTime: number | null;
  totalTime?: number | null;
  videoElement?: HTMLVideoElement | null;
  srcElement?: HTMLSourceElement | null;
  showControl?: boolean;
  srcOrigin?: string;
  srcAd?: string;
  isPlaying?: boolean;
  clickHandle?: () => void;
  setIsPlaying?: (a: boolean) => void;
  setShowControl?: (a: boolean) => void;
}
