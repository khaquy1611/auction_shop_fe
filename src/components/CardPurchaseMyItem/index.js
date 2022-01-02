import React, { useEffect, useState, useRef } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import TimeCountdown2 from "../../components/TimeCountdown2";
import Bid from "../Bid";
import Modal from "../Modal";
import IntlMessages from "../../i18n/IntlMessages";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HoverVideo from "../../components/HoverVideo/HoverVideo";
import useHoverVideo from "../../hooks/useHover";
const Card = (props) => {
  const { className, id, itemTemp } = props;
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const checkLogin = useSelector((state) => state.app, shallowEqual);
  const [item, setItem] = useState();
  let history = useHistory();
  const videoRef = useRef();
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();

  useEffect(() => {
    if (itemTemp) {
      setItem({
        ...itemTemp,
        subItem: JSON.parse(itemTemp?.subItem?.replace(/\\/g, "")),
      });
    }
  }, [itemTemp]);

  const handleOnClickModal = () => {
    if (checkLogin.isLogin) {
      setVisibleModalBid(true);
    } else {
      history.push("/sign-up");
    }
  };

  return (
    <div
      onMouseOver={() => hoverPlayVideo(videoRef)}
      onMouseLeave={() => hoverPauseVideo(videoRef)}
      className={cn(styles.card, className)}
      id={"card-" + id}
    >
      <div className={styles.preview}>
        <HoverVideo item={item} ref={videoRef} />
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
          <button
            className={cn("button-small", styles.button)}
            onClick={() => handleOnClickModal()}
          >
            {/* <span>Place a bid</span> */}
            <Icon name="scatter-up" size="16" />
          </button>
        </div>
      </div>
      <Link
        className={styles.link}
        onClick={() => {
          history.push(`/item/${item.id}`);
        }}
      >
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item?.subItem.name}</div>
            <div className={styles.price}>{item?.minimum_price}</div>
          </div>
          <div className={styles.time}>
            <div className={styles.logTime}>
              <TimeCountdown2
                startDate={item?.end_time * 1000}
                fontSizeNumber={"12px"}
              />
            </div>
          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              <div className={styles.avatar}>
                <img src="/images/content/avatar-1.jpg" alt="Avatar" />
              </div>
              <div className={styles.avatar}>
                <img src="/images/content/avatar-3.jpg" alt="Avatar" />
              </div>
              <div className={styles.avatar}>
                <img src="/images/content/avatar-4.jpg" alt="Avatar" />
              </div>
            </div>
            <div className={styles.counter}>
              <span>
                {item?.total_bid} <IntlMessages id="item.inStock" />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <Icon name="candlesticks-up" size="20" />
            <IntlMessages id="item.highestBid" />{" "}
            <span>{item?.current_highest_price}</span>
          </div>
          <div className={styles.bid}>
            <IntlMessages id="item.newBid" />
          </div>
        </div>
      </Link>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        {/*<Connect/>*/}
        <Bid item={item} onCancel={() => setVisibleModalBid(false)} />
      </Modal>
    </div>
  );
};

export default React.memo(Card);