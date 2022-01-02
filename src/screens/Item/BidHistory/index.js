import React, { useEffect, useState, useMemo } from "react";
import styles from "../Item.module.sass";
import IntlMessages from "../../../i18n/IntlMessages";
import { getProfileUser } from "../../../services/WalletService";
import moment from "moment";
import useCurrency from "../../../hooks/useCurrency";
import { convertMoney } from "../../../services/CurrencyService";
import { useSelector } from "react-redux";
import {
  numberWithCharacter,
  bidWithCharacter,
} from "../../../constants/Utils";
import { useHistory } from "react-router-dom";

export const BidHistory = (props) => {
  const history = useHistory();
  const { bidder } = props;
  const [dataUser, setDataUser] = useState();
  const [dataBrower, setDataBrower] = useState("");
  const [balanceCurrency, setBalanceCurrency] = useState(0);
  const user = useSelector((state) => state.app.user);
  const currency = useCurrency()?.currency;

  useEffect(() => {
    getProfileUser(bidder?.bidderAddress).then((res) => {
      if (res) {
        setDataUser(res?.listen_user);
      }
    });
    if (parseFloat(bidder?.amount) > 0) {
      convertMoney(
        user?.currency ? user?.currency : "USD",
        bidder?.amount
      ).then((res) => {
        setBalanceCurrency(res?.data?.to[0]?.mid);
      });
    }
  }, [bidder]);

  const getDisplayAddress = (address) => {
    const result = `${address?.substring(0, 5)}...${address?.substring(
      address ? address?.length - 5 : 0,
      address ? address?.length : 1
    )}`;
    return result;
  };
  const handleClick = (displayName) => {
    if (displayName === dataUser?.displayName) {
      history.push(`/profile/${dataUser?.userName}`);
    }
  };
  const formatAmount = (amount) => {
    return `${bidWithCharacter(amount)}`;
  };
  if (dataUser) {
    return (
      <div className={styles.listUser}>
        <div className={styles.item}>
          <div className={styles.avatar}>
            <img
              src={
                dataUser?.avatar?.length > 0
                  ? dataUser?.avatar
                  : "/images/photo_2021-11-26_15-52-36.jpg"
              }
              alt="Avatar"
            />
          </div>
          <div className={styles.userInfor}>
            <div className={styles.displayName}>
              <p className={styles.displayNameText}>
                <IntlMessages id="itemDetail.bidHistory.bidPlacedBy" />
                :&ensp;
                <span
                  onClick={() => handleClick(dataUser?.displayName)}
                  style={{ cursor: "pointer", color: "orange" }}
                >
                  {dataUser?.displayName
                    ? dataUser?.displayName
                    : getDisplayAddress(bidder?.bidderAddress)}
                </span>
              </p>
              <p className={styles.textPrice}>{formatAmount(bidder?.amount)}</p>
            </div>
            <div className={styles.position}>
              <p className={styles.textPosition}>
                {moment(bidder?.time * 1000).format("MMM DD YYYY") + " "}
                <IntlMessages id="itemDetail.bidHistory.at" />
                {" " + moment(bidder?.time * 1000).format("h:mm a")}
              </p>
              <span className={styles.textPosition}>
                {parseInt(balanceCurrency) > 0
                  ? `~${currency ? currency : "$"}${" "}${numberWithCharacter(
                      balanceCurrency
                    )}`
                  : ""}
              </span>
            </div>
          </div>
          {/* <div className={styles.userInforIcon}>
              <img src="/images/content/avatar-2.jpg"/>
          </div> */}
        </div>
      </div>
    );
  }
  return <div></div>;
};
