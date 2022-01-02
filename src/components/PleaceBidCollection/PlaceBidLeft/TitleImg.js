import React, { useState, useEffect, useRef } from "react";
import HoverVideo from "../../HoverVideo/HoverVideo";
import useHoverVideo from "../../../hooks/useHover";
import styles from "./TitleImg.module.sass"
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
      <button
            className={styles.plus}
            target="_black"
            onClick={() => window.open(data?.nftCollection[0].mediaUrl)}
          ><img
          className={styles.search}
          src="/images/ipfs.svg"
          alt="Search"
        />
      </button>
    </div>
  );
}

export default TitleImg;
