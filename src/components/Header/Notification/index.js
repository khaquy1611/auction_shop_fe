import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import { validateDate } from "../../../constants/Utils";
import Icon from "../../Icon";
import IntlMessages from "../../../i18n/IntlMessages";
import { getUserProfileHistoryAll } from "../../../services/UserService";

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [pageCurent, setCurent] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setCurent(pageCurent);
    getUserProfileHistoryAll(pageCurent).then((res) => {
      setResult(res.data);
    });
  }, [pageCurent]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.notification, className)}>
        <button
          className={cn(
            styles.head
            //  styles.active
          )}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="notification" size="24" />
        </button>
        {visible && (
          <div className={styles.body}>
            <div className={cn("h4", styles.title)}>
              <IntlMessages id="header.notification.title" />
            </div>
            <div className={styles.list}>
              {result.map((x, index) => (
                <Link
                  className={styles.item}
                  to={x.url}
                  to="/activity"
                  onClick={() => setVisible(!visible)}
                  key={index}
                >
                  <div className={styles.preview}>
                    {x?.activity_type === "ActivityLogin" && (
                      <img src="/images/logout.svg" alt="Login" />
                    )}
                    {x?.activity_type === "ActivityCreateAuction" && (
                      <img src="/images/Auction.svg" alt="Auction" />
                    )}
                    {x?.activity_type === "ActivityWalletWithdrawal" && (
                      <img src="/images/Wallet.svg" alt="WalletWithdrawal" />
                    )}
                    {x?.activity_type === "ActivitySell" && (
                      <img src="/images/Received.svg" alt="Sell" />
                    )}
                    {x?.activity_type === "ActivityBuy" && (
                      <img src="/images/Send.svg" alt="Buy" />
                    )}
                    {x?.activity_type === "ActivityMintListLUSD" && (
                      <img src="/images/swapUsd.svg" alt="Notification" />
                    )}
                    {x?.activity_type === "ActivityBurnListenUSD" && (
                      <img src="/images/swapUsd.svg" alt="Notification" />
                    )}
                  </div>
                  <div className={styles.details}>
                    <div className={styles.subtitle}>
                      <IntlMessages
                        id={"Activity.type." + x?.activity_type?.substring(8)}
                      />
                    </div>
                    <div className={styles.price}>{x?.browser}</div>
                    <div className={styles.date}>
                      {validateDate(x?.created_at)}
                    </div>
                  </div>
                  {/* <div className={styles.status}></div> */}
                </Link>
              ))}
            </div>
            <Link
              className={cn("button-small", styles.button)}
              to="/activity"
              onClick={() => setVisible(!visible)}
            >
              <IntlMessages id="header.notification.seeAll" />
            </Link>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
