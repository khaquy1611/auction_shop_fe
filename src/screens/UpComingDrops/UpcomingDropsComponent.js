import React from "react";
import cn from "classnames";
import styles from "./UpcomingDrops.module.sass";
import Card from "../../components/Card/CardMarket";
import FilterComponent from "../../components/Filter/index";
import IntlMessages from "../../i18n/IntlMessages";
import ItemOpps from "../../components/ItemOpps";
// import useChangeFilter from "../../hooks/useChangeFilter";
import InfinityScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader/index";
import CardLazyLoad from "../../components/Card/CardLazyLoad";
const UpcomingDropsComponent = (props) => {
  const {
    data,
    hasMore,
    handleChangeFilter,
    handleSubmitFilter,
    handleClearFilter,
    handleLoadMore,
  } = props;
  //   const {
  //     dataItem,
  //     handleSubmitFilter,
  //     handleClearFilter,
  //     handleChangeFilter,
  //   } = useChangeFilter(data);

  

  return (
    <>
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <h1 style={{ marginBottom: 20, fontSize: 40 }}>Upcoming NFT Drops</h1>
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
                    <InfinityScroll
                      className={styles.listItem}
                      dataLength={data?.length}
                      next={handleLoadMore}
                      hasMore={hasMore}
                    >
                      <div  className={styles.listItemCard}>

                      {data?.map((x, index) => (
                        <Card
                          className={styles.card}
                          item={x}
                          UpComincgDrops={x}
                          key={index}
                          id={index}
                        />
                      ))}
                      </div>
                    </InfinityScroll>
                  </>
                ) : (
                  <ItemOpps />
                )}
                {data && hasMore === false ? (
                      <p className={styles.endMessage}>
                        <b>
                          <IntlMessages id="end.loading.message" />
                        </b>
                      </p>
                    ) : (
                      <div className={styles.CardLazyLoad} style={{display:'flex',justifyContent:'center'}}>
                        <Loader/>
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
export default UpcomingDropsComponent;
