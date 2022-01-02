import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import styles from "./MarketPlace.module.sass";
import InfiniteScroll from "react-infinite-scroll-component";
import CardPurchase from "../../components/CardPurchase/CardPurchase";
import Loader from "../../components/Loader/index";
import IntlMessages from "../../i18n/IntlMessages";
import FilterComponent from "../../components/Filter/index";
import ItemOpps from "../../components/ItemOpps";

const MarketPlaceComponent = (props) => {
  const {
    data,
    callData,
    handleChangeFilter,
    handleSubmitFilter,
    handleClearFilter,
    handleLoadMore,
    hasMore,
  } = props;


  return (
    <>
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <FilterComponent
            handleChangeFilter={handleChangeFilter}
            handleSubmitFilter={handleSubmitFilter}
            handleClearFilter={handleClearFilter}
          />
          <div className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.list}>
                {data && data?.length < 1 ? (
                  !hasMore && <ItemOpps />
                ) : (
                  <InfiniteScroll
                    className={styles.listItem}
                    dataLength={data?.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    // loader={<h4>Loading...</h4>}
                    // endMessage={
                    //   <p
                    //     style={{
                    //       textAlign: "center",
                    //     }}
                    //   >
                    //     <b>Yay! You have seen it all</b>
                    //   </p>
                    // }
                  >
                    {data?.length < 4 ? (
                      <div className={styles.listItemCard}
                          style={{justifyContent: "flex-start"}}
                      > 
                      {data?.map((x, index) => (
                        <CardPurchase
                          className={styles.card}
                          item={x}
                          MaketPlace={x}
                          key={index}
                          id={index}
                        />
                      ))}
                      </div>
                    )
                    :
                    <div className={styles.listItemCard}> 
                    {data?.map((x, index) => (
                      <CardPurchase
                        className={styles.card}
                        item={x}
                        MaketPlace={x}
                        key={index}
                        id={index}
                      />
                    ))}
                    </div>
                    }
                   
                  </InfiniteScroll>
                )}
                {data && hasMore === false ? (
                  <p className={styles.endMessage}>
                    <b>
                      <IntlMessages id="end.loading.message" />
                    </b>
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "60px",
                    }}
                  >
                    <Loader />
                  </div>
                )}
              </div>
              {/* <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)}>
                  <span>
                    <IntlMessages id="market.loadMore" />
                  </span>
                  <img
                    src={"/images/content/loading.svg"}
                    alt={"icon-loading"}
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MarketPlaceComponent;
