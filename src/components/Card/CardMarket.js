import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Bid from "../Bid";
import Modal from "../Modal";
import TimeCountdown2 from "../../components/TimeCountdown2";
import { getProfileUser } from "../../services/WalletService";
import * as _ from "lodash";
import HoverVideo from "../../components/HoverVideo/HoverVideo";
import useHoverVideo from "../../hooks/useHover";
import { useSelector } from "react-redux";
import IntlMessages from "../../i18n/IntlMessages";
import ModalSignIp from "../../components/ModalSignIUP";
import { bidWithCharacter } from "../../constants/Utils";
import Skeleton from "react-loading-skeleton";
const CardMarket = (props) => {
  const { className, item, id, callData } = props;
  const user = useSelector((state) => state.app.user);
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [dataHistory, setDataHistory] = useState();
  const [data, setData] = useState();
  const [dataUser, setDataUser] = useState();
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();
  const videoRef = useRef();
  useEffect(() => {
    if (item?.nftCollection[0].subItem.length > 5) {
      setData({
        ...item?.nftCollection[0],
        subItem: JSON.parse(
          item?.nftCollection[0]?.subItem?.replace(/\\/g, "")
        ),
      });
    }
  }, [item]);

  useEffect(() => {
    const data = [];
    for (let index = item?.history?.length; index > 0; index--) {
      if (
        item?.history[index] &&
        !data.includes(item?.history[index]?.bidderAddress)
      ) {
        data.push(item?.history[index]?.bidderAddress);
      }
    }

    setDataHistory(data);
  }, []);

  useEffect(() => {
    if (dataHistory) {
      const data = [];
      dataHistory.map(async (item) => {
        const dataTemp = await getProfileUser(item);
        data.push(dataTemp);
      });
      setDataUser(data);
    }
  }, [dataHistory]);

  return (
    <div
      onMouseOver={(e) => hoverPlayVideo(videoRef)}
      onMouseLeave={(e) => hoverPauseVideo(videoRef)}
      className={cn(styles.card, className)}
    >
      <div className={styles.preview}>
        <HoverVideo ref={videoRef} item={item} />
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
            onClick={() => window.open(item.nftCollection[0].mediaUrl)}
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
              onClick={() => setVisibleModalBid(true)}
            >
              <span>
                <IntlMessages id="cardMarket.btn" />
                {/* Place a bid */}
              </span>
              <Icon name="scatter-up" size="16" />
            </button>
          )}
        </div>
      </div>
      <Link className={styles.link} to={`/item/${item.auctionID}`}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>
              {!item?.nftCollection[0].name ? <Skeleton width={100} /> : <div className={styles.titleTextContent}>
                {item?.nftCollection[0].name}
              </div>}
              {item ? <div className={styles.titlePrice}>
                {parseInt(item?.currentBid) > 0
                  ? `$${bidWithCharacter(item?.currentBid)}`
                  : "No Bid"}
              </div> : <Skeleton width={50} />}
            </div>
          </div>
          <div className={styles.time}>
            <div className={styles.logTime}>
              {
                !item.endTime ? <Skeleton width={130} /> : <TimeCountdown2
                  startDate={item?.endTime * 1000}
                  fontSizeNumber={"12px"}
                />
              }
            </div>
            <div className={styles.ImGNewBid}>
              {item?.history?.length > 4 ? (
                <>
                  <img src="./images/content/fire.svg"></img>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className={styles.des}>
              <div className={styles.DesImg}>
                {dataUser?.length > 0 &&
                  dataUser?.map((item, index) => {
                    return (
                      <img
                        className={styles.desImgRow2}
                        key={index}
                        src={
                          item?.listen_user?.avatar?.length > 0
                            ? item?.listen_user?.avatar
                            : "/images/photo_2021-11-26_15-52-36.jpg"
                        }
                        alt="img"
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 5,
                        }}
                      />
                    );
                  })}
              </div>
              <span className={styles.spaB}>
                {
                  !item.nftCollection[0].edition ? <Skeleton width={50} /> :
                    <>
                      #&nbsp;{item.nftCollection[0].edition}
                      {item.nftCollection[0]?.editionSize ? `/${item.nftCollection[0].editionSize}` : ''}&nbsp;
                      <IntlMessages id="item.placeBid.edition" /></>
                }
              </span>
            </div>
            {
              // parseInt(item?.currentBid) > 0 ? (
              //   <div className={styles.desRow2}>
              //     <div className={styles.DesImgRow2}>
              //       <span className={styles.desTextOpaRow2}>
              //         <IntlMessages id="cardMarket.desc" />
              //         {/* Highest bid */}
              //       </span>
              //       <span className={styles.desTextRow2}>
              //         $
              //         {parseFloat(item.currentBid)
              //           ?.toFixed(2)
              //           ?.toString()
              //           ?.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
              //       </span>
              //     </div>
              //     <div className={styles.ImGNewBid}>
              //       {item?.history?.length > 4 ? (
              //         <>
              //           <img src="./images/content/fire.svg"></img>
              //         </>
              //       ) : (
              //         ""
              //       )}
              //     </div>
              //   </div>
              // ) : (
              //   ""
              // )
            }
          </div>
        </div>
      </Link>
      {user && user ? (
        <Modal
          visible={visibleModalBid}
          onClose={() => setVisibleModalBid(false)}
        >
          <Bid
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
      {/* <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Bid
          data={item}
          onCancel={() => setVisibleModalBid(false)}
          callData={callData}
        />
      </Modal> */}
    </div>
  );
};

export default React.memo(CardMarket);
