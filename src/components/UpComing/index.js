import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./UpComing.module.sass";
import React, { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import Slider from "react-slick";
import Card from "../../components/Card/CardMarket";
import { settings } from "../SettingSliderHotBid/SettingSlider";
import ItemOpps from "../ItemOpps";
import { getListAuctions } from '../../services/Location'
import ClipLoader from "react-spinners/ClipLoader";
import CardLazyLoad from "../Card/CardLazyLoad";
const DEFAULT_FILTER_UPCOMING_HOME = {
  page: 1,
  pageSize: 5,
  sort: "currentBid,desc",
  auctionState: "Upcoming",
  position: 2
}
function SimpleSlider(props) {
  const { title } = props;
  const [data, setData] = useState([])
  const [filter, setfilter] = useState(DEFAULT_FILTER_UPCOMING_HOME)
  const [loader, setLoader] = useState(true)

  const handleGetDataUpComing = (filter) => {
    getListAuctions(filter).then(res => {
      setData(res?.data?.data?.auctions);
      setLoader(false)
    })
  };

  useEffect(() => {
    handleGetDataUpComing(filter)
  }, [filter])

  const handeNext = (current, next) => {
    setLoader(true)
    // setfilter({
    //   ...filter,
    //   pageSize: filter.pageSize + 4
    // })
  }
  const handlePre = (current) => {

  }
  const handleCallData = () => {
    getListAuctions(filter).then(res => {
      setData(res?.data?.data?.auctions);
      setLoader(false)
    })
  }
  return (
    <div className={styles.CONTENT}>
      <div className={styles.contentText}>
        <h2 className={styles.TITLE}>{title}</h2>
        <div className={styles.Btn}>
        </div>
      </div>
      <div>
        {data && data.length > 0 ? (
          <div className={styles.contentSliderContainer}>
            <Slider
              {...settings}
              beforeChange={(current, next) => handeNext(current, next)}
              afterChange={current => handlePre(current)}
            >
              {data?.map((x, index) => (
                <div key={index} >
                  <Card
                    className={styles.card}
                    item={x}
                    key={index}
                    id={index}
                    callData={handleCallData}
                  />
                </div>
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
