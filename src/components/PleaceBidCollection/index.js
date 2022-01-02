import cn from "classnames";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { customGetBalance } from "../../apiContract/listenUSD";
import { getWalletBase } from "../../services/WalletService";
import styles from "./PleaceBidCollection.module.sass";
import { convertMoney } from "../../services/CurrencyService";
import IntlMessages from "../../i18n/IntlMessages";
import CheckBox from "../../components/CheckboxPlace/index";
import { Link } from "react-router-dom";
import PlaceBidLeft from "./PlaceBidLeft";
import { numberWithCharacter } from "../../constants/Utils";
import Bidder from "../Bidder";
import { getListAuctions } from '../../services/Location'
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import { set } from "lodash";
const DEFAULT_FILTER_COLLECTION = {
  page: 1,
  pageSize: 15,
}

const PleaceBidCollection = (props) => {
  const { className, data, onCancel, callData } = props;
  const [balance, setBalance] = useState();
  const [rate, setRate] = useState();
  const user = useSelector((state) => state.app.user);
  const [checkBox, setCheckBox] = useState(0);
  const [item, setItem] = useState();
  const [lengData, setLengData] = useState(0);
  const [filter, setFilter] = useState()
  const [dataItems, setDataItems] = useState()
  const [hasMore, setHasMore] = useState(true)
  const [loader, setLoader] = useState(true)
  const handleCustomGetBalance = (addressFlow) => {
    customGetBalance(addressFlow).then((res) => {
      const balanceUser = res;
      convertMoney(user?.currency ? user?.currency : "USD", res).then(
        (balance) => {
          const rate =
            parseFloat(balanceUser) / parseFloat(balance?.data?.to[0]?.mid);
          setRate(rate);
        }
      );
      setBalance(res);
    });
  };

  const checkWalletbase = (res) => {
    const getFlow = _.find(res, { wallet_base: { wallet_type: "FLOW" } });
    if (getFlow) {
      handleCustomGetBalance(getFlow?.wallet_address);
    }
  };
  useEffect(() => {
    getWalletBase().then((res) => {
      checkWalletbase(res);
    })
  }, [])

  useEffect(() => {
    setFilter({
      ...DEFAULT_FILTER_COLLECTION,
      collection: data?.name
    })
  }, [data]);


  const handleCallData = (filter) => {
    if (filter?.collection.length > 0) {
      getListAuctions(filter).then(res => {
        setDataItems(res.data.data.auctions)
        setCheckBox(res.data.data.auctions[0].auctionID);
        setItem(res.data.data.auctions[0]);
        setLengData(res.data.data.auctions.length);
        setLoader(false)
        if (res?.data?.data?.totalRecord === res?.data?.data?.auctions?.length) {
          setHasMore(false)
        }
      })
    }
  }

  useEffect(() => {
    handleCallData(filter)
  }, [filter])

  const cancelBid = () => {
    onCancel();
  };

  const handleChangeCheckBox = (event) => {
    setCheckBox(event?.auctionID);
    setItem(event);
  };

  const handleLoadMore = () => {
    setFilter({
      ...filter,
      pageSize: filter.pageSize + 10
    })
  }

  return (
    <>
      <div className={styles.checkoutContainer}>
        <div className={cn(className, styles.checkout)}>
          <div className={styles.ContainerTiTle}>
            <div className={cn("h4")}>
              <IntlMessages id="item.placeBid.title" />
            </div>
            <div className={styles.yourBalance}>
              <div className={styles.col}>
                <IntlMessages id="item.placeBid.yourBalance" />
              </div>
              <div className={styles.col}>
                $ {balance ? numberWithCharacter(balance) : "0.00"}
              </div>
            </div>
          </div>
          <div className={styles.CollectionsContainer}>
            <PlaceBidLeft
              item={item}
              length={lengData}
              rate={rate}
              balance={balance}
              cancelBid={cancelBid}
              callData={callData}
            />
            <div className={styles.CollectionContent}>
              <div className={styles.CollectionControl}>
                {/* <div className={styles.CollectionControlBtn}>
                  <button className={styles.CollectionBtn}>
                    <IntlMessages id="item.placeBid.collectionBtn" />
                    <img
                      className={styles.CollectionBtnF}
                      src="/images/filterIcon.svg"
                    ></img>
                  </button>
                </div> */}
                <div className={styles.CollectionControlText}>
                  {lengData}
                  &nbsp;
                  <IntlMessages id="item.placeBid.available" />
                  {/* Available */}
                </div>
              </div>
              <>
                {
                  loader && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                    <ClipLoader color="#ee4e00" loading={loader} size={40} />
                  </div>
                }
              </>
              <div className={styles.CollectionListItem} style={{ height: '400px', display: loader ? 'none' : '' }}>
                {lengData &&
                  <InfiniteScroll
                    className={styles.listItem}
                    dataLength={lengData}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<p
                      style={{
                        textAlign: "center",
                        marginTop: 20
                      }}
                    >
                      <ClipLoader color="#ee4e00" size={20} />
                    </p>}
                    height={400}
                    endMessage={
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: 20
                        }}
                      >
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>
                            {" "}
                            <div className={styles.CollectionSelect}></div>
                          </th>
                          <th>
                            {" "}
                            <div className={styles.CollectionListTitleItem}>
                              <IntlMessages id="item.placeBid.currentPrice" />
                              {/* Current price */}
                            </div>
                          </th>
                          <th>
                            {" "}
                            <div className={styles.CollectionListTitleItemS}>
                              <IntlMessages id="item.placeBid.edition" />
                              {/* Edition */}
                            </div>
                          </th>
                          <th>
                            {" "}
                            <div className={styles.CollectionListTitleItemL}>
                              <IntlMessages id="item.placeBid.bidder" />
                              {/* Bidder */}
                            </div>
                          </th>
                          <th>
                            {" "}
                            <div className={styles.CollectionListTitleItemL}></div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataItems &&
                          dataItems?.map((item, index) => {
                            return (
                              <tr
                                onClick={() => handleChangeCheckBox(item)}
                                key={index}
                              >
                                <td className={styles.tdRight}>
                                  {" "}
                                  <CheckBox
                                    className={styles.CollecListItemCheckbox}
                                    value={item?.auctionID === checkBox}
                                  />
                                </td>
                                <td className={styles.tdCenter}>
                                  {" "}
                                  <span className={styles.CollecListItemTextB}>
                                    $ {numberWithCharacter(item?.currentBid)}
                                  </span>
                                </td>
                                <td className={styles.tdCenter}>
                                  {" "}
                                  <span className={styles.CollecListItemText}>
                                    #{item?.nftCollection[0]?.edition}
                                  </span>
                                </td>
                                <td
                                  className={styles.tdCenter}
                                  style={{ width: 100 }}
                                >
                                  {" "}
                                  <span className={styles.CollecListItemGmail}>
                                    <Bidder
                                      bidder={
                                        item?.history[item?.history?.length - 1]
                                      }
                                    />
                                  </span>
                                </td>
                                <td className={styles.tdCenter}>
                                  {" "}
                                  <Link
                                    className={styles.link}
                                    to={`/item/${item?.auctionID}`}
                                  >
                                    <img
                                      src="/images/content/Link-icon.svg"
                                      alt="img-link"
                                    />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </InfiniteScroll>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ app }) => ({
  user: app.user,
});

export default connect(mapStateToProps)(React.memo(PleaceBidCollection));
