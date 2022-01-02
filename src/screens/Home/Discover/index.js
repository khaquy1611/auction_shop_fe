import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Discover.module.sass";
import CardMarket from "../../../components/Card/CardMarket";
// data
import IntlMessages from "../../../i18n/IntlMessages";
import FilterHome from "../../../components/FilterHome";
import ItemOpps from "../../../components/ItemOpps";
import { getListAuctions } from '../../../services/Location'

const DEFAULT_FILTER_ALL_HOME = {
  page: 1,
  pageSize: 4,
  sort: "currentBid,desc",
  auctionState: "Open",
  currentBid: [0, 50000],
  nftType: "",
  position: 4
}

const Discover = (props) => {
  const { callData } = props;
  const [dataItem, setDataItem] = useState();
  const [filter, setFilter] = useState(DEFAULT_FILTER_ALL_HOME)
  const handleGetDataAll = (filter) => {
    getListAuctions(filter).then(res => {
      setDataItem(res?.data?.data?.auctions);
    })
  };

  const handleChangeFilter = (name) => {
    if (name === 'ALL ') {
      setFilter({
        ...filter,
        nftType: ""
      })
    } else {
      setFilter({
        ...filter,
        nftType: name
      })
    }
  }
  const handleSubmitFilter = (priceRange, type) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: filter.name
    })
  }
  const handleClearFilter = (priceRange, currentFilter) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: `${currentFilter.name}`,
    });
    
  }
  const handleLoadMore = () => {
      setFilter({
        ...filter,
        pageSize: filter?.pageSize + 4,
      })
  }

  useEffect(()=>{
    handleGetDataAll(filter)
  },[filter])
  return (
    <div
      className={styles.sectionDiscover}
      style={{
        backgroundImage: "url(/images/content/bg-product.jpg)",
      }}
    >
      <div
        className={ styles.container}
      >
        <h3 className={cn("h3", styles.title)}>
          <IntlMessages id="home.allItem" />
          <FilterHome
            handleChangeFilter={handleChangeFilter}
            handleSubmitFilter={handleSubmitFilter}
            hanlldeClearFilter={handleClearFilter}
            handleLoadMore={handleLoadMore}
          />
        </h3>
        <div className={styles.list}>
          {dataItem && dataItem.length > 0 ? (
            dataItem.map((x, index) => (
              <React.Fragment key={index}>
                <CardMarket
                  className={styles.card}
                  item={x}
                  id={index}
                  callData={callData}
                />
              </React.Fragment>
            ))
          ) : (
            <ItemOpps />
          )}
          {/* </Slider> */}
        </div>
        {/* <div className={styles.btns}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <span>
              <IntlMessages id="home.loadMore" />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default React.memo(Discover);
