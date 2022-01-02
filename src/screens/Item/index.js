import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Control from "./Control";
import Options from "./Options";
import TimeCountdown2 from "../../components/TimeCountdown2";
import IntlMessages from "../../i18n/IntlMessages";
import OppComponent from "../../components/OOPS";
import { useParams } from "react-router-dom";
import HoverVideo from "../../components/HoverVideoViewItem/HoverVideo";
import {
  customeGetAucionMeta,
  customeGetAucions,
} from "../../apiContract/listenAuction";
import { LISTEN } from "../../constants/constants";
import { BidHistory } from "./BidHistory";
import useHoverVideo from "../../hooks/useHover";
import { getProfileUser, getWalletBase } from "../../services/WalletService";
import { connect, useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import TransactionDetail from "./BidHistory/ModelHistory/index";
import WarningComponent from "../../components/WarningComponent/index";
import { showPaymentModal } from "../../actions/AppActions";
import { customGetBalance } from "../../apiContract/listenUSD";
import * as _ from "lodash";
import ClipLoader from "react-spinners/ClipLoader";
function Item(props) {
  const [showMore, setShowMore] = useState(false);
  const [item, setItem] = useState();
  const [findId, setFindId] = useState(true);
  const [dataHistory, setDataHistory] = useState();
  const [dataHistoryModal, setDataHistoryModal] = useState();
  const [browerHistory, setBrowerHistory] = useState(false);
  const [higherBy, setHightBy] = useState();
  const [lengthHistory, setLengthHistory] = useState(5);
  const [loader, setLoader] = useState(true)
  const user = useSelector((state) => state.app.user);
  const [balance, setBalance] = useState();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { hoverPlayVideo, hoverPauseVideo } = useHoverVideo();

  useEffect(() => {
    handleCustomeGetAucionMeta();
  }, [id]);

  const handleCustomGetBalance = (addressFlow) => {
    customGetBalance(addressFlow).then((res) => {
      const balanceUser = res;
      setBalance(balanceUser);
    });
  };

  const checkWalletbase = (res) => {
    const getFlow = _.find(res, { wallet_base: { wallet_type: "FLOW" } });
    if (getFlow) {
      handleCustomGetBalance(getFlow?.wallet_address);
    }
  };

  const handleCustomeGetAucionMeta = () => {
    customeGetAucions().then((res) => {
      if (res?.find((element) => element == id) >= 0) {
        customeGetAucionMeta(id).then((res) => {
          setItem(res);
          setFindId(true);
          setLoader(false)
        });
      } else {
        setFindId(false);
      }
    });
  };

  useEffect(() => {
    const data = [];
    const dataModal = [];
    getHigherBid();
    getWalletBase().then((res) => {
      checkWalletbase(res);
    });
    item?.history?.reverse()?.map((i, index) => {
      if (index < lengthHistory) {
        data.push(i);
      }
    });
    setDataHistory(data);
    item?.history?.reverse()?.map((i, index) => {
      if (index < 100) {
        dataModal.push(i);
      }
    });
    setDataHistoryModal(dataModal);
  }, [item, lengthHistory]);

  const getHigherBid = async () => {
    const higher = await getProfileUser(
      item && item?.history[item?.history?.length - 1]?.bidderAddress
    );
    setHightBy(higher?.listen_user);
  };

  const showDescription = () => {
    if (showMore) {
      setShowMore(false);
    } else setShowMore(true);
  };

  const renderBidHistory = () => {
    const bidHistorys = dataHistory.map((history, index) => (
      <BidHistory bidder={history} key={index} />
    ));
    return <div>{bidHistorys}</div>;
  };

  const handleUpdateProfile = () => {
    window.location.replace("/my-profile");
  };
  const handleAddMoney = () => {
    const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    dispatch(showPaymentModal({ isShow: true, walletAddress }));
  };

  return (
    <>
      {
        loader && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
          <ClipLoader color="#ee4e00" loading={loader} size={50} />
        </div>
      }
      <div style={{ display: loader ? 'none' : '' }}>
        {findId ? (
          <>
            <div className={cn("section", styles.section)}>
              <div className={cn("container", styles.containerWrap)}>
                <div className={styles.previewBox}>
                  <div className={styles.preview}>
                    <div className={styles.categories}>
                      {/* {categories.map((x, index) => (
                <div className={styles.category} key={index}>
                  {x.content}
                </div>
              ))} */}
                    </div>
                    <div
                      className={styles.card}
                      onMouseOver={() => hoverPlayVideo(videoRef)}
                      onMouseOut={() => hoverPauseVideo(videoRef)}
                    >
                      <HoverVideo ref={videoRef} item={item} />
                    </div>
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

                    {/* <div
                    className={styles.numberItem}
                    style={{
                      backgroundImage: "url(/images/content/cd.svg)",
                    }}
                  >
                    <span>
                      1 <IntlMessages id="itemDetail.of" /> 10
                    </span>
                  </div> */}
                  </div>

                  <Options className={styles.options} />
                  <h1 className={cn("h3", styles.title)}>
                    {item?.nftCollection[0].name}
                  </h1>
                  <div className={styles.time}>
                    <TimeCountdown2
                      startDate={parseInt(item?.endTime) * 1000}
                      fontSizeNumber={"16px"}
                    />
                    <div
                      className={styles.timeDes}
                      style={{ color: "#EE4E00", textAlign: "right" }}
                    >
                      {item?.nftCollection[0]?.edition}
                      {item?.nftCollection[0]?.editionSize ? `/${item?.nftCollection[0]?.editionSize}` : ''}{" "}
                      <IntlMessages id="item.placeBid.edition" />
                    </div>
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.detailBox}>
                    <Control
                      className={styles.control}
                      dataItem={item}
                      higherBy={higherBy}
                      callData={handleCustomeGetAucionMeta}
                    />
                  </div>
                  <div>
                    {item && user?.zipcode < 1 ? (
                      <WarningComponent
                        title={<IntlMessages id="warningComponent.item.title" />}
                        content={
                          <IntlMessages id="warningComponent.item.content" />
                        }
                        onChange={handleUpdateProfile}
                      />
                    ) : (
                      item &&
                      parseFloat(balance) === 0 && (
                        <WarningComponent
                          title={
                            <IntlMessages id="warningComponent.item.noBalance.title" />
                          }
                          content={
                            <IntlMessages id="warningComponent.item.noBalance.content" />
                          }
                          onChange={handleAddMoney}
                        />
                      )
                    )}
                  </div>
                  <div className={styles.label}>
                    <div className={styles.history}>
                      <span>
                        <IntlMessages id="itemDetail.bidHistory" />
                      </span>
                      <div
                        className={styles.OnHistoryBid}
                        onClick={() => {
                          setBrowerHistory(true);
                        }}
                      >
                        <img
                          src="/images/content/iconZoom.png"
                          width="30"
                          height="25"
                          alt="iconZoom"
                        />
                      </div>
                    </div>
                    {dataHistory && renderBidHistory()}
                  </div>
                </div>
                <div className={styles.descriptionBox}>
                  <div className={styles.users}>
                    <div className={styles.label}>
                      <span>
                        <IntlMessages id="itemDetail.info" />
                      </span>
                    </div>
                    {/* <div className={styles.list}>
                    {itemBid?.data.map((x, index) => (
                      <div className={styles.item} key={index}>
                        <div className={styles.avatar}>
                          <img src={x.avatar} alt="Avatar" />
                          {x.reward && (
                            <div className={styles.reward}>
                              <img src={x.reward} alt="Reward" />
                            </div>
                          )}
                        </div>
                        <div className={styles.details}>
                          <div className={styles.position}>{x.position}</div>
                          <div className={styles.name}>{x.name}</div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                  </div>
                  <div
                    className={cn(showMore ? styles.showMore : "", styles.info)}
                  >
                    {/* <IntlMessages id="itemDetail.info.description" /> */}
                    {item?.nftCollection[0]?.description}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {item?.nftCollection[0]?.description?.length > 500 ? (
                      <button
                        className={cn(
                          "button-stroke",
                          styles.button,
                          styles.btnShow
                        )}
                        onClick={() => showDescription()}
                      >
                        {showMore ? (
                          <IntlMessages id="itemDetail.showLess" />
                        ) : (
                          <IntlMessages id="itemDetail.showMore" />
                        )}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.collections}>
                <div className={cn("container", styles.container)}>
                  {/* <Collections /> */}
                  <div className={styles.creator}>
                    <div className={styles.creatorName}>
                      <span>
                        <IntlMessages id="itemDetail.creator" />
                      </span>
                    </div>
                    <div className={styles.creatorContent}>
                      <div className={styles.creatorAvatar}>
                        <img src={"/images/content/avatar-2.jpg"} alt="Avatar" />
                        <span>{LISTEN}</span>
                      </div>
                      <div className={styles.description}>
                        <span>
                          <IntlMessages id="item.description" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Modal
                  visible={browerHistory}
                  onClose={() => setBrowerHistory(false)}
                >
                  <TransactionDetail
                    dataUser={dataHistoryModal}
                    onCancel={() => setBrowerHistory(false)}
                  />
                </Modal>
              </div>
            </div>
          </>
        ) : (
          <OppComponent />
        )}
      </div>
    </>

  );
}

export default Item;
