import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import Checkout from "./Checkout";
import Connect from "../../../components/Connect";
import Bid from "../../../components/Bid";
import Accept from "./Accept";
import Donate from "./Donate";
import SuccessfullyPurchased from "./SuccessfullyPurchased";
import Modal from "../../../components/Modal";
import IntlMessages from "../../../i18n/IntlMessages";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useCurrency from "../../../hooks/useCurrency";
import { convertMoney } from "../../../services/CurrencyService";
import {
  setLengthString,
  numberWithCharacter,
  bidWithCharacter,
} from "../../../constants/Utils";

const Control = (props) => {
  const { dataItem, className, callData, higherBy } = props;
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalDonate, setVisibleModalDonate] = useState(false);
  const [balanceCurrency, setBalanceCurrency] = useState(0);
  const user = useSelector((state) => state.app.user);
  const currency = useCurrency()?.currency;
  const history = useHistory();

  useEffect(() => {
    convertMoney(
      user?.currency ? user?.currency : "USD",
      dataItem?.currentBid ? dataItem?.currentBid : 0
    ).then((res) => {
      setBalanceCurrency(res?.data?.to[0]?.mid);
    });
  }, [dataItem]);

  const handleOnlickAuction = () => {
    if (user) {
      setVisibleModalBid(true);
    } else {
      history.push("/sign-up");
    }
  };
  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.head}>
          <div className={styles.avatar}>
            <img
              src={
                higherBy?.avatar?.length > 0
                  ? higherBy?.avatar
                  : "/images/photo_2021-11-26_15-52-36.jpg"
              }
              alt="Avatar"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.info}>
              {higherBy && (
                <>
                  <IntlMessages id="itemDetail.highestBidBy" />{" "}
                  <span>
                    {(higherBy?.displayName.length > 0 &&
                      higherBy?.displayName) ||
                      (higherBy?.displayName.length === 0 &&
                        higherBy?.userName.length > 0 &&
                        setLengthString(higherBy?.userName, 5, "...")) ||
                      (higherBy?.displayName.length === 0 &&
                        higherBy?.userName.length === 0 &&
                        setLengthString(higherBy?.email, 5, "..."))}
                  </span>
                </>
              )}
            </div>
            <div className={styles.minimumPrice}>
              <span>
                <IntlMessages id="itemDetail.minimumPrice" />: $
                {!isNaN(dataItem?.startingPrice) &&
                  bidWithCharacter(dataItem?.startingPrice)}
              </span>
              <span>
                <IntlMessages id="itemDetail.bidStep" />: $
                {!isNaN(dataItem?.startingPrice) &&
                  bidWithCharacter(dataItem?.bidStep)}
              </span>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>
                {parseInt(dataItem?.currentBid) > 0
                  ? `$${bidWithCharacter(dataItem?.currentBid)}`
                  : "No bid yet"}
              </div>
              <div>
                {parseInt(balanceCurrency) > 0
                  ? `~${currency ? currency : "$"}${" "}${numberWithCharacter(
                      balanceCurrency
                    )}`
                  : ""}
              </div>
            </div>
          </div>
        </div>
        {dataItem?.auctionState === "Complete" ||
        dataItem?.auctionState === "Upcoming" ? (
          ""
        ) : (
          <div className={styles.btns}>
            <button
              className={cn("button", styles.button)}
              onClick={() => handleOnlickAuction()}
            >
              <IntlMessages id="itemDetail.placeBid" />
            </button>
          </div>
        )}

        <div className={styles.btnsContainer}>
          <div
            className={styles.donate}
            // onClick={() => setVisibleModalDonate(true)}
          >
            <IntlMessages id="itemDetail.donate" />
          </div>
        </div>
      </div>
      <Modal
        visible={visibleModalPurchase}
        onClose={() => setVisibleModalPurchase(false)}
      >
        <Checkout />
        <SuccessfullyPurchased />
      </Modal>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
        // title={user?.zipcode?.length === 0 && "Bidling Address"}
      >
        {/* <Connect/> */}
        <Bid
          onCancel={() => setVisibleModalBid(false)}
          callData={callData}
          data={dataItem}
        />
      </Modal>
      <Modal
        visible={visibleModalAccept}
        onClose={() => setVisibleModalAccept(false)}
      >
        <Accept />
      </Modal>
      <Modal
        visible={visibleModalDonate}
        onClose={() => setVisibleModalDonate(false)}
      >
        <Donate />
      </Modal>
    </>
  );
};

export default Control;
