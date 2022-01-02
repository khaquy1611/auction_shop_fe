import React, { useState } from "react";
const useHoverVideo = () => {
  const hoverPlayVideo = (ref) => {
    if (
      ref.current !== undefined &&
      ref.current !== null 
    ) {
      ref.current.play();
    }
  };

  const hoverPauseVideo = (ref) => {
    if (
      ref.current !== undefined &&
      ref.current !== null 
   
    ) {
      ref.current.pause();
    }
  };

  return { hoverPlayVideo, hoverPauseVideo };
};

export default useHoverVideo;
