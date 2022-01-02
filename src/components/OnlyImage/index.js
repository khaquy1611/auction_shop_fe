import React from "react";
import $ from "jquery";
import styles from './OnlyImage.module.sass'
function OnlyImage(props) {
  const { data ,index } = props;

  const hoverVideo = (e) => {
    const video = $("#card-img-" + index + " video").get(0);
    if (video) {
      $(video).get(0).play();
    }
  };

  const hideVideo = (e) => {
    const video = $("#card-img-" + index + " video").get(0);
    if (video) {
      $(video).get(0).pause();
    }
  };

  $("#card-img-" + index).hover(hoverVideo, hideVideo);

  return (
   <div className={styles.card} id={"card-img-" + index}>
   {
     data.nftCollection[0].mime_type === "video/mp4" ? (
      <video
        width="100%"
        height="100%"
        controls
        playsInline
        loop
      >
        <source src={data.nftCollection[0].mediaUrl} type="video/mp4" />
      </video>
    ) : (
      <img src={data.nftCollection[0].mediaUrl} alt="Card" />
    )
   }
   </div>
  );
}
export default OnlyImage;
