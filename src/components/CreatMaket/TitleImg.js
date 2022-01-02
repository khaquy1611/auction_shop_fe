import React, { useState, useEffect, useRef } from "react";
import HoverVideo from "../HoverVideo/HoverVideo";
import useHoverVideo from "../../hooks/useHover";
function TitleImg(props) {
  const { data } = props;
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();
  const videoRef = useRef();
  return (
    <div
      onMouseOver={() => hoverPlayVideo(videoRef)}
      onMouseOut={() => hoverPauseVideo(videoRef)}
    >
      <HoverVideo ref={videoRef} item={data} />
    </div>
  );
}

export default TitleImg;
