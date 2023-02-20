declare interface Window {
  electron: {
    toggleFullscreen(): void;
    close(): void;
    minimize(): void;
  };
}
