import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./Player.module.sass";
import useHoverVideo from "../../hooks/useHover";
import HoverVideo from "../../components/HoverVideoHome/HoverVideo";
const Player = ({ className, item, id }) => {
  const videoRef = useRef();
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();
  return (
    <div
      onMouseOver={(e) => hoverPlayVideo(videoRef)}
      onMouseOut={(e) => hoverPauseVideo(videoRef)}
      className={cn(styles.player, className)}
      id={`card-` + id}
    >
      <div className={styles.preview}>
        <div className={styles.videoContainer}>
          <HoverVideo ref={videoRef} item={item} />
        </div>
      </div>
    </div>
  );
};

export default Player;
