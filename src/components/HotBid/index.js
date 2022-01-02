import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./HotBid.module.sass";
import React, { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import Slider from "react-slick";
import Card from "../../components/Card/CardMarket";
import { settings } from "../SettingSlider/SettingSlider";
import ItemOpps from "../ItemOpps";
import { getListAuctions } from '../../services/Location'

const DEFAULT_FILTER_HOT_BID_HOME = {
  page: 1,
  pageSize: 5,
  sort: "currentBid,desc",
  auctionState: "Open",
  position: 3
}
function SimpleSlider(props) {
  const { title, callData } = props;
  const [data, setData] = useState()
  const handleGetDataHot = () => {
    getListAuctions(DEFAULT_FILTER_HOT_BID_HOME).then(res => {
      setData(res?.data?.data?.auctions);
    })
  };
  useEffect(() => {
    handleGetDataHot()
  }, [])
  
  return (
    <div className={styles.CONTENT}>
      <div className={styles.contentText}>
        <h2 className={styles.TITLE}>{title}</h2>
        <div className={styles.Btn}></div>
      </div>
      <div>
        {data && data.length > 0 ? (
          <div className={styles.contentSliderContainer}>
            {/* <div className={styles.contentSliderBtn}>
              <div className={styles.BtnPre}>
                <Icon name="arrow-prev" size="14" />
              </div>
              <div className={styles.BtnNext}>
                <Icon name="arrow-next" size="14" />
              </div>
            </div> */}
            <Slider
              {...settings}
              slidesToShow={data?.length > 4 ? 4 : data?.length}
            >
              {data?.map((x, index) => (
                <React.Fragment key={index}>
                  <Card
                    key={index}
                    className={styles.card}
                    item={x}
                    id={index}
                    callData={handleGetDataHot}
                  />
                </React.Fragment>
              ))}
            </Slider>
          </div>
        ) : (
          <ItemOpps />
        )}
      </div>
    </div>
  );
}

export default React.memo(SimpleSlider);
