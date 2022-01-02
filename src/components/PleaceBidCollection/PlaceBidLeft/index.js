import React, { useEffect, useState } from "react";
import styles from "../PleaceBidCollection.module.sass";
import TitleImg from "./TitleImg";
import { currencies } from "currencies.json";
import IntlMessages from "../../../i18n/IntlMessages";
import InputNumberic from "../../InputNumberic";
import WarningComponent from "../../WarningComponent/index";
import { bidding } from "../../../services/Auction";
import { handleCheckJobId } from "../../../services/jobsId";
import { toast } from "react-toastify";
import cn from "classnames";
import * as _ from "lodash";
import {
  hanldeError,
  numberWithCharacter,
} from "../../../constants/Utils";
import { Link } from "react-router-dom";
import { useBid } from "../../../hooks/useBid";
import Skeleton from "react-loading-skeleton";
function PlaceBidLeft(props) {
  const { item, length, rate, balance, callData, cancelBid } = props;
  const firstNum = parseInt(item?.bidStep) + parseInt(item?.currentBid);
  const [checkDisable, setCheckDisable] = useState(false);
  const {
    handleInput,
    handleAddMoney,
    handleUpdateProfile,
    numberInput,
    discount,
    serviceFree,
    tax,
    total,
    user,
  } = useBid({ dataItem: item, balance });
  useEffect(() => {
    if (user?.zipcode?.length > 1 && parseFloat(balance) > 0) {
      setCheckDisable(true);
    }
  }, [balance]);
  const handleCheckRealJobs = (value) => {
    handleCheckJobId(value).then((res) => {
      if (res?.status === "Error") {
        cancelBid();
        callData();
        hanldeError(res.status);
      }
      if (res?.status === "Accepted") {
        //
        toast.warning("Please wait");
        const interval = setInterval(() => {
          handleCheckJobId(value).then((res) => {
            if (res.status === "Complete") {
              clearInterval(interval);
              cancelBid();
              callData();
              toast.success("Transaction successful");
            }
            if (res.status === "Error") {
              clearInterval(interval);
              hanldeError(res.status);
              callData();
              cancelBid();
            }
          });
        }, 3000);
        //
        setTimeout(() => {
          clearInterval(interval);
        }, 30000);
      }
      if (value?.status === "Complete") {
        toast.success("Transaction successful");
      }
    });
  };
  const bid = () => {
    const payload = {
      auctionId: parseInt(item?.auctionID),
      amount: total?.toFixed(2),
    };
    if (parseFloat(total) < parseFloat(firstNum)) {
      toast.error("Please enter price again");
    } else {
      bidding(payload).then((res) => {
        handleCheckRealJobs(res.jobId);
      });
    }
  };
  return (
    <>
      <div className={styles.ImgContainerNA}>
        <div className={styles.TitleImgContainer}>
          <div className={styles.TitleImg}>
            <TitleImg data={item} />
          </div>
          <div className={styles.ContainerImgTitle}>
            <div style={{ display: "flex" }}>
              <div className={styles.TitleImgTitle}>
                {!item ? <Skeleton width={60} /> : item?.nftCollection[0]?.name}
              </div>
              <div style={{ marginLeft: 5 }}>
                <Link to={`/item/${item?.auctionID}`}>
                  <img src="/images/content/Link-icon.svg" alt="img-link" />
                </Link>
              </div>
            </div>
            <div className={styles.TitleImgDes}>

              {
                !item ? <Skeleton width={50} /> :
                  <>
                    {item?.nftCollection[0]?.edition}/
                    {item?.nftCollection[0]?.editionSize}
                    &nbsp;
                    <IntlMessages id="item.placeBid.edition" />
                  </>
              }
            </div>
          </div>
        </div>
        {/* <div className={styles.info}>
      <IntlMessages id="item.placeBid.description" />{" "}
      <strong>{data?.title || data?.nftCollection[0]?.name}</strong>{" "}
      <IntlMessages id="item.placeBid.from" />
      <strong> {data?.creator || "LISTEN"}</strong>
    </div> */}
        <div className={styles.stage}>
          <IntlMessages id="item.placeBid.yourBid" />
        </div>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputNumberic onChange={handleInput} value={numberInput} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.serviceFee" />
              <span> </span>(5%){" "}
              <div className={styles.CollecImgContainer}>
                <img
                  className={styles.CollecImg}
                  src="/images/questions.svg"
                ></img>
                <div className={styles.CollecImgBox}>
                  <img
                    className={styles.CollecImgMo}
                    src="/images/questions.svg"
                  ></img>
                  <div className={styles.CollecImgMoText}>
                    <IntlMessages id="placeBidLeft.text" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              $&nbsp;
              {serviceFree ? numberWithCharacter(serviceFree) : "" || 0}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.discount" />
              <span> </span>(10%){" "}
              <div className={styles.CollecImgContainer}>
                <img
                  className={styles.CollecImg}
                  src="/images/questions.svg"
                ></img>
                <div className={styles.CollecImgBox}>
                  <img
                    className={styles.CollecImgMo}
                    src="/images/questions.svg"
                  ></img>
                  <div className={styles.CollecImgMoText}>
                    <IntlMessages id="placeBidLeft.text" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              $&nbsp;
              {discount ? numberWithCharacter(discount) : "" || 0}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.taxFee" />
              <span> </span>(5%){" "}
              <div className={styles.CollecImgContainer}>
                <img
                  className={styles.CollecImg}
                  src="/images/questions.svg"
                ></img>
                <div className={styles.CollecImgBox}>
                  <img
                    className={styles.CollecImgMo}
                    src="/images/questions.svg"
                  ></img>
                  <div className={styles.CollecImgMoText}>
                    <IntlMessages id="placeBidLeft.text" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              $&nbsp;
              {tax ? numberWithCharacter(tax) : "" || 0}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.totalBidAmount" />
            </div>
            <div className={styles.col}>
              {" "}
              $&nbsp;
              {total ? numberWithCharacter(total) : 0}
            </div>
          </div>
        </div>
        {total > 0 && rate > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 5,
              fontSize: 12,
            }}
          >
            (~{_.find(currencies, ["code", user?.currency])?.symbol}{" "}
            {rate ? numberWithCharacter(total / rate) : 0})
          </div>
        )}
        <div className={styles.detail}>
          {item && user?.zipcode < 1 ? (
            <WarningComponent
              title={<IntlMessages id="warningComponent.item.title" />}
              content={<IntlMessages id="warningComponent.item.content" />}
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
        <div className={styles.btns}>
          {checkDisable && (
            <button className={cn("button", styles.button)} onClick={bid}>
              <IntlMessages id="placeBidLeft.btn.BidNow" />
              {/* Bid now */}
            </button>
          )}
          {!checkDisable && (
            <button className={styles.buttonDisablue} style={{ width: "49%" }}>
              <IntlMessages id="placeBidLeft.btn.BidNow" />
              {/* Bid now */}
            </button>
          )}
          <button
            className={cn("button-stroke", styles.button)}
            onClick={cancelBid}
          >
            <IntlMessages id="item.placeBid.cancel" />
          </button>
        </div>
      </div>
      {/* <ModalPay visible={checkMoney} onClose={() => handleAddMoney(false)}>
        <PaymentMethod />
      </ModalPay> */}
    </>
  );
}

export default PlaceBidLeft;
