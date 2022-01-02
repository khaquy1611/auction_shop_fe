import React, { useRef } from "react";
import styles from "./InformationMaketPlace.module.sass";
import HoverVideoMarket from "../HoverVideoMarket";
import useHoverVideo from "../../hooks/useHover";
import IntlMessages from "../../i18n/IntlMessages";
function InformationMarketPlace(props) {
  const { dataInformation } = props;
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();
  const videoRef = useRef();
  console.log("dataInformation", dataInformation);
  return (
    <>
      <div className={styles.ImgContainerNA}>
        <h1>
          <IntlMessages id="informationMarket.h1" />
        </h1>
        <div className={styles.TitleImgContainer}>
          <div className={styles.TitleImg}>
            <div
              className={styles.PlayVideo}
              onMouseOver={() => hoverPlayVideo(videoRef)}
              onMouseOut={() => hoverPauseVideo(videoRef)}
            >
              <HoverVideoMarket ref={videoRef} item={dataInformation} />
            </div>
          </div>
          <div className={styles.ContainerImgTitle}>
            <div className={styles.ImgContentTitleContainer}>
              <div className={styles.TitleImgTitle}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <IntlMessages id="informationMarket.name" />:
                    <i>{dataInformation?.name}</i>
                  </div>

                  <h5>
                    # {dataInformation?.edition}/{dataInformation?.editionSize}
                    <IntlMessages id="item.placeBid.edition" />
                  </h5>
                </div>
              </div>
              <div>
                <IntlMessages id="informationMarket.desc" />:
              </div>
              <div
                style={{
                  marginLeft: 5,
                  display: "block",
                }}
              >
                <i>{dataInformation?.description}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InformationMarketPlace;
