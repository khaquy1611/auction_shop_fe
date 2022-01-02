import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./HoverVideo.module.sass";
import Skeleton from "react-loading-skeleton";
import BeatLoader from "react-spinners/BeatLoader";
const HoverVideo = (props, ref) => {
  const videoRef = useRef();
  const [loader, setLoader] = useState(false);
  const [loaderVideo, setLoaderVideos] = useState(true)
  const { img, type, item } = props;

  const dataImg =
    item?.nftCollection[0]?.imageURL?.length > 0
      ? item?.nftCollection[0]?.imageURL
      : item?.nftCollection[0]?.mediaUrl;

  const isVideo = (video) =>
    video?.current !== undefined &&
    video?.current !== null &&
    video?.current?.readyState > 2;

  useImperativeHandle(ref, () => ({
    play() {
      if (isVideo(videoRef)) {
        videoRef?.current?.play();
      }
    },
    pause() {
      if (isVideo(videoRef)) {
        videoRef?.current?.pause();
      }
    },
  }));
  const handleLoad = (img) => {
    if (img) {
      setLoader(true);
    }
  };
  const handleLoadVideo = (video) => {
    if (video) {
      setLoaderVideos(false)
    }
  }
  return (
    <>
      {item?.nftCollection[0]?.mime_type === "video/mp4" ? (
        <>
          {
            loaderVideo && <div style={{ width: '513px', height: '295px', display: 'flex', backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center',borderRadius: "25px" }}>
              <BeatLoader loading={loaderVideo} color="#ee4e00" size={10} />
            </div>
          }
          {/* {loader && ( */}
          <video
            controls
            playsInline
            ref={videoRef}
            loop
            className={styles.videoContainer}
            width="100%"
            height="100%"
            muted
            poster={item?.nftCollection[0]?.thumbURL}
            onLoadedData={handleLoadVideo}
            style={{ display: loaderVideo ? "none" : "", transition: '1s' }}
          >
            <source
              src={dataImg}
              type={item?.nftCollection[0]?.mime_type}
            />
          </video>
        </>
      ) : (
        <>
          {!loader && <div style={{ width: '100%', height: '150px', display: 'flex', backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center', }}>
            <BeatLoader loading={loaderVideo} color="#ee4e00" size={10} />
          </div>}
          <img
            src={dataImg}
            width="100%"
            height="100%"
            alt="preview"
            className={styles.ImGBid}
            onLoad={handleLoad}
            style={{ display: !loader ? "none" : "" }}
          />
        </>
      )}
    </>
  );
};
export default forwardRef(HoverVideo);
