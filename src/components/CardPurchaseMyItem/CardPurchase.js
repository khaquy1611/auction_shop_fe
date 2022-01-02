import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import BuyMarketPlace from "../BuyMarketPlaceMyItem";
import Modal from "../Modal";
import { bids } from "./hotbitbid";
import TimeCountdown2 from "../TimeCountdown2";
import { getProfileUser } from "../../services/WalletService";
// import Skeleton from 'react-loading-skeleton';
import * as _ from "lodash";
import HoverVideoMarket from "../HoverVideoMarket/index.js";
import useHoverVideo from "../../hooks/useHover";
import { useSelector } from "react-redux";
import IntlMessages from "../../i18n/IntlMessages";
import ModalSignIp from "../../components/ModalSignIUP";

const CardPurchase = (props) => {
  const { className, item, id, callData } = props;
  const user = useSelector((state) => state.app.user);
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();
  const videoRef = useRef();
  const handleModalCard = () => {
    setVisibleModalBid(true);
  };
  return (
    <>
      {!item?.mpItem?.purchased && item?.nft?.imageURL && (
        <div
          onMouseOver={(e) => hoverPlayVideo(videoRef)}
          onMouseLeave={(e) => hoverPauseVideo(videoRef)}
          className={cn(styles.card, className)}
        >
          <div className={styles.preview}>
            <HoverVideoMarket ref={videoRef} item={item?.nft} />
            <div className={styles.control}>
              <button
                className={cn(styles.favorite, { [styles.active]: visible })}
                onClick={() => setVisible(!visible)}
              >
                <Icon name="heart" size="20" />
              </button>

              {/* add icon plus */}
              <button
                className={cn(styles.plus)}
                target="_black"
                onClick={() => window.open(item?.nft?.mediaUrl)}
              >
                <img
                  className={styles.search}
                  src="/images/ipfs.svg"
                  alt="Search"
                />
              </button>

              {item.video ? (
                <button className={styles.videoButton}>
                  <Icon name="camera" size="20" />
                </button>
              ) : (
                ""
              )}
              {item.auctionState === "Complete" ||
              item.auctionState === "Upcoming" ? (
                ""
              ) : (
                <button
                  className={cn("button-small", styles.button)}
                  onClick={handleModalCard}
                >
                  <span>
                    {/* <IntlMessages id="cardPuchase.btn" /> */}
                    Buy
                    {/* Place a bid */}
                  </span>
                  <img src="/images/cart.svg" className={styles.ImgBid} />
                </button>
              )}
            </div>
          </div>
          <Link className={styles.link} to={"#!"}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>
                  <div className={styles.titleTextContent}>
                    {item?.nft?.name}
                  </div>
                  <div className={styles.titlePrice}>
                    $
                    {parseFloat(item?.mpItem?.salePrice)
                      .toFixed(2)
                      ?.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {user && user ? (
            <Modal
              visible={visibleModalBid}
              onClose={() => setVisibleModalBid(false)}
            >
              <BuyMarketPlace
                data={item}
                onCancel={() => setVisibleModalBid(false)}
                callData={callData}
              />
            </Modal>
          ) : (
            <Modal
              visible={visibleModalBid}
              onClose={() => setVisibleModalBid(false)}
              // title={user?.zipcode?.length === 0 && "Bidling Address"}
            >
              <ModalSignIp onCancel={() => setVisibleModalBid(false)} />
            </Modal>
          )}
        </div>
      )}{" "}
    </>
  );
};

export default CardPurchase;