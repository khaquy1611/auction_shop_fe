import React, { useEffect, useState, useRef } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import TimeCountdown2 from "../../components/TimeCountdown2";
import CreatMaket from "../CreatMaket";
import Modal from "../Modal";
import IntlMessages from "../../i18n/IntlMessages";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HoverVideo from "../../components/HoverVideoMarket";
import useHoverVideo from "../../hooks/useHover";
import InformationMarketPlace from "../InformationMarketPlace";
import { useParams } from "react-router-dom";
const Card = (props) => {
  const { className, id, itemTemp, dataTemp, currentUser } = props;
  const { userName } = useParams();
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [information, setInformation] = useState(false);
  const [dataInformation, setDataInformation] = useState();
  const checkLogin = useSelector((state) => state.app.user, shallowEqual);
  let history = useHistory();
  const videoRef = useRef();
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();

  const handleOnClickModal = () => {
    setVisibleModalBid(true);
  };

  const handleInformation = (item) => {
    setDataInformation(item);
    setInformation(true);
  };
  return (
    <div
      onMouseOver={() => hoverPlayVideo(videoRef)}
      onMouseLeave={() => hoverPauseVideo(videoRef)}
      className={cn(styles.card, className)}
      id={"card-" + id}
    >
      <div className={styles.preview}>
        <HoverVideo item={dataTemp} ref={videoRef} />
        <div className={styles.control}>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>
          {/*{item.video ? <button*/}
          {/*    className={styles.videoButton}*/}
          {/*>*/}
          {/*    <Icon name="camera" size="20"/>*/}
          {/*</button> : ''}*/}
        </div>
      </div>
      {/* <Link
        className={styles.link}
        onClick={() => {
          history.push(`/item/${dataTemp.id}`);
        }}
      > */}
      <div className={styles.body} style={{ height: "120px" }}>
        <div className={styles.line}>
          <div
            className={styles.title}
            style={{ padding: "18px" }}
            onClick={() => {
              handleInformation(dataTemp);
            }}
          >
            {dataTemp?.name}
          </div>
          <div className={styles.price}>{dataTemp?.minimum_price}</div>
        </div>

        {checkLogin?.userName === userName && (
          <button
            className={cn("button-small", styles.buttonCreat)}
            onClick={() => handleOnClickModal()}
          >
            <span className={styles.buttonCreatText}> 
              <IntlMessages id="card.createListing" />
            </span>
          </button>
        )}

        <div className={styles.time}>
          {/* <div className={styles.logTime}>
              <TimeCountdown2
                startDate={item?.end_time * 1000}
                fontSizeNumber={"12px"}
              />
            </div> */}
        </div>
      </div>
      {/* </Link> */}
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        {/*<Connect/>*/}
        <CreatMaket
          data={dataTemp}
          onCancel={() => setVisibleModalBid(false)}
        />
      </Modal>
      <Modal visible={information} onClose={() => setInformation(false)}>
        {/*<Connect/>*/}
        <InformationMarketPlace dataInformation={dataInformation} />
      </Modal>
    </div>
  );
};

export default React.memo(Card);
