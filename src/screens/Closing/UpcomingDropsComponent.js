import cn from "classnames";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/Card/CardMarket";
import FilterComponent from "../../components/Filter/index";
import ItemOpps from "../../components/ItemOpps";
import Loader from "../../components/Loader";
import IntlMessages from "../../i18n/IntlMessages";
import styles from "./UpcomingDrops.module.sass";

const ClosingComponent = (props) => {
  const {
    data,
    handleChangeFilter,
    handleSubmitFilter,
    handleClearFilter,
    hasMore,
    handleLoadMore,
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
                {data && data.length > 0 ? (
                  <>
                    <InfiniteScroll
                      className={styles.listItem}
                      dataLength={data?.length}
                      next={handleLoadMore}
                      hasMore={hasMore}
                    >
                      {data?.map((x, index) => (
                        <Card
                          className={styles.card}
                          item={x}
                          UpComincgDrops={x}
                          key={index}
                          id={index}
                        />
                      ))}
                    </InfiniteScroll>
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
                  </>
                ) : (
                  <ItemOpps />
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
export default ClosingComponent;
