import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import styles from "./Activity.module.sass";
import Control from "../../components/Control";
import Loader from "../../components/Loader";
import Icon from "../../components/Icon";
import Filters from "./Filters";
import { validateDate } from "../../constants/Utils";
import IntlMessages from "../../i18n/IntlMessages";
import { getUserProfileHistory } from "../../services/UserService";
import { getUserProfileHistoryAll } from "../../services/UserService";
import Pagination from "../../components/Pagination/index";
// import { filter } from "lodash";

const breadcrumbs = [
  {
    title: "Profile",
    url: "/",
  },
  {
    title: "Activity",
  },
];

// const filters = ["Login", "Auction", "Deposit", "Withdrawal", "Buy", "Sell"];

const navLinks = ["My activity"];

const Activity = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState();
  const [pageCurent, setCurent] = useState(1);
  const [total, setTotal] = useState();
  const [result, setResult] = useState();
  const [resultAll, setResultAll] = useState();
  const [value, setValue] = useState([]);
  const [checkSelected, setCheckSelected] = useState();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(0);
  const dataRender =
    selectedFilters === undefined || selectedFilters === "ActivityAll"
      ? resultAll
      : result;

  useEffect(() => {
    getUserProfileHistory(selectedFilters).then((res) => {
      setResult(res?.data);
    });
  }, [selectedFilters]);

  useEffect(() => {
    getUserProfileHistoryAll().then((res) => {
      setResultAll(res?.data);
    });
  }, []);

  // useEffect(() => {
  //   result?.map((item, index) => {
  //     setValue(item);
  //   });
  // }, [result]);
  const onChange = (value) => {
    setSelectedFilters("Activity" + value);
    if (selectedFilters === "ActivityAll") {
      getUserProfileHistoryAll().then((res) => {
        setResultAll(res?.data);
      });
    }
  };

  useEffect(() => {
    getUserProfileHistoryAll(pageCurent).then((res) => {
      // console.log(res);
      setTotal(res?.total);
    });
  }, [pageCurent]);

  const updatePage = (page) => {
    setCurent(page);
  };

  useEffect(() => {
    setCurent(pageCurent);
    getUserProfileHistoryAll(pageCurent).then((res) => {
      setResultAll(res?.data);
    });
  }, [pageCurent]);

  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.body)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>
              <IntlMessages id="activity.title" />
              {/* Activity */}
            </h1>
            {/* <button
              className={cn(
                "button-stroke button-small mobile-hide",
                styles.button
              )}
            >
              <IntlMessages id="activity.button" />
              {/* Mark all as read */}
            {/* </button> */}
            <button
              className={cn(
                "button-circle-stroke button-small tablet-show",
                styles.toggle,
                { [styles.active]: visible }
              )}
              onClick={() => setVisible(!visible)}
            >
              <Icon name="filter" size="24" />
              <Icon name="close" size="14" />
            </button>
          </div>
          <div className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.nav}>
                {navLinks.map((x, index) => (
                  <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    onClick={() => setActiveIndex(index)}
                    key={index}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className={styles.list}>
                {dataRender &&
                  dataRender?.map((x, index) => {
                    return (
                      <div className={styles.item} key={index}>
                        {/* {console.log(x?.browser)} */}
                        <div className={styles.preview}>
                          {x?.activity_type === "ActivityLogin" && (
                            <img src="/images/logout.svg" alt="Login" />
                          )}
                          {x?.activity_type === "ActivityCreateAuction" && (
                            <img src="/images/Auction.svg" alt="Auction" />
                          )}
                          {x?.activity_type === "ActivityWalletWithdrawal" && (
                            <img
                              src="/images/Wallet.svg"
                              alt="WalletWithdrawal"
                            />
                          )}
                          {x?.activity_type === "ActivitySell" && (
                            <img src="/images/Received.svg" alt="Sell" />
                          )}
                          {x?.activity_type === "ActivityBuy" && (
                            <img src="/images/Send.svg" alt="Buy" />
                          )}
                          {x?.activity_type === "ActivityBurnListenUSD" && (
                            <img src="/images/swapUsd.svg" alt="Notification" />
                          )}
                          {x?.activity_type === "ActivityMintListLUSD" && (
                            <img src="/images/swapUsd.svg" alt="Notification" />
                          )}
                          {/* <div
                          className={styles.icon}
                          style={{ backgroundColor: x.color }}
                        >
                          <img src={x.icon} alt="Icon notification" />
                        </div> */}
                        </div>
                        <div className={styles.details}>
                          <div className={styles.subtitle}>
                            <IntlMessages
                              id={
                                "Activity.type." +
                                x?.activity_type?.substring(8)
                              }
                            />
                          </div>
                          <div className={styles.description}>{x?.browser}</div>
                          <div className={styles.amount}>
                            {Number.parseFloat(x?.amount).toFixed(2)}
                          </div>
                          <div className={styles.hash}>{x?.hash}</div>
                          <div className={styles.date}>
                            {validateDate(x?.created_at)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.Pagination}>
                <Pagination
                  handleChange={updatePage}
                  current={pageCurent}
                  total={total}
                />
              </div>
              {/* <Loader className={styles.loader} /> */}
            </div>
            {/* <button
              className={cn(
                "button-stroke button-small mobile-show",
                styles.button
              )}
            >
              <IntlMessages id="activity.btn" />
              {/* Mark all as read */}
            {/* </button> */}
            <Filters
              className={cn(styles.filters, { [styles.active]: visible })}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
