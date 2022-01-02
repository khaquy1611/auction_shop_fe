import React, { useEffect } from "react";
import cn from "classnames";
import styles from "./Dropends.module.sass";
import CardMarket from "../../components/Card/CardMarket";
import FilterComponent from "../../components/Filter/index";
import IntlMessages from "../../i18n/IntlMessages";
import ItemOpps from "../../components/ItemOpps";
import useChangeFilter from "../../hooks/useChangeFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader/index";
import CardLazyLoad from "../../components/Card/CardLazyLoad";
const Dropends = (props) => {
  const {
    data,
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
                {data && data?.length > 0 ? (
                  <>
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
                      {data?.map((x, index) => (
                        <CardMarket
                          className={styles.card}
                          item={x}
                          UpComincgDrops={x}
                          key={index}
                          id={index}
                        />
                      ))}
                    </InfiniteScroll>
                    <div className={styles.listItemCard}>
                      {data && hasMore === false ? (
                        <p className={styles.endMessage}>
                          <b>
                            <IntlMessages id="end.loading.message" />
                          </b>
                        </p>

                      ) : (
                        <div className={styles.CardLazyLoad} style={{ display: 'flex', justifyContent: 'center' }}>
                          <Loader />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  !hasMore && <ItemOpps />
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
export default Dropends;
