import React, { useRef, forwardRef, useState , useImperativeHandle } from "react";
import BeatLoader from "react-spinners/BeatLoader";
const HoverVideoMarket = (props, ref) => {
  const videoRef = useRef();
  const { item } = props;
  const [loader, setLoader] = useState(false);
  const [loaderVideo, setLoaderVideos] = useState(true);
  const dataImg = item?.imageURL?.length > 0 ? item?.imageURL : item?.mediaUrl;
  const isVideo = (video) =>
    video.current !== undefined &&
    video.current !== null &&
    video.current.readyState > 2;
  useImperativeHandle(ref, () => ({
    play() {
      if (isVideo(videoRef)) {
        videoRef.current.play();
      }
    },
    pause() {
      if (isVideo(videoRef)) {
        videoRef.current.pause();
      }
    },
  }));
  const handleLoadVideo = (video) => {
    if (video) {
      setLoaderVideos(false);
    }
  };

  return (
    <>
      {item?.mime_type === "video/mp4" ? (
        <>
          {loaderVideo && (
            <div
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                backgroundColor: "#eeeeee",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BeatLoader loading={loaderVideo} color="#ee4e00" size={10} />
            </div>
          )}
          <video
            controls
            playsInline
            ref={videoRef}
            loop
            muted
            width="100%"
            poster={item?.thumbURL}
            height="100%"
            onLoadedData={handleLoadVideo}
            style={{ display: loaderVideo ? "none" : "" ,transition: '1s'}}
          >
            <source src={dataImg} type={item?.mime_type} />
          </video>
        </>

      ) : (
        <img src={dataImg} width="600px" height="600px" alt="Video preview" />
      )}
    </>
  );
};
export default forwardRef(HoverVideoMarket);
