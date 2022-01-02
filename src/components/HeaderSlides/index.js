import React from 'react'
import styles from "./HeaderSlides.module.sass";
import cn from "classnames";
import Slider from "react-slick";
import IntlMessages from "../../i18n/IntlMessages";
import { Link, withRouter } from "react-router-dom";

const settingSlideImage = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 3000,
  cssEase: "linear",
  arrows: false
};


function HeaderSlides(params) {
    return (
        <div className={styles.sliderContainer}>
        <div className={cn("container", styles.container)}>
          <Slider {...settingSlideImage} className="mySlidesContainer">
            <div className={styles.mySlides}>
              <div className={styles.image}>
                <img alt={"NFT"} src="/images/content/masterslide01.jpg" />
              </div>
              <div className={styles.head}>
                <div className={styles.stage}>
                  <IntlMessages id="home.slide.row1" />
                </div>
                <h2 className={cn("h3", styles.title)}>
                  <IntlMessages id="home.slide.row2" />
                </h2>
                <Link
                  className={cn("button-stroke", styles.button)}
                  to="/search01"
                >
                  <IntlMessages id="home.slide.startYourSearch" />
                </Link>
              </div>
            </div>
            <div className={styles.mySlides}>
              <div className={styles.image}>
                <img alt={"NFT"} src="/images/content/masterslide02.jpg" />
              </div>
              <div className={styles.head}>
                <div className={styles.stage}>
                  <IntlMessages id="home.slide.row1" />
                </div>
                <h2 className={cn("h3", styles.title)}>
                  <IntlMessages id="home.slide.row2" />
                </h2>
                <Link
                  className={cn("button-stroke", styles.button)}
                  to="/search01"
                >
                  <IntlMessages id="home.slide.startYourSearch" />
                </Link>
              </div>
            </div>
            <div className={styles.mySlides}>
              <div className={styles.image}>
                <img alt={"NFT"} src="/images/content/masterslide03.jpg" />
              </div>
              <div className={styles.head}>
                <div className={styles.stage}>
                  <IntlMessages id="home.slide.row1" />
                </div>
                <h2 className={cn("h3", styles.title)}>
                  <IntlMessages id="home.slide.row2" />
                </h2>
                <Link
                  className={cn("button-stroke", styles.button)}
                  to="/search01"
                >
                  <IntlMessages id="home.slide.startYourSearch" />
                </Link>
              </div>
            </div>
            <div className={styles.mySlides}>
              <div className={styles.image}>
                <img alt={"NFT"} src="/images/content/masterslide04.jpg" />
              </div>
              <div className={styles.head}>
                <div className={styles.stage}>
                  <IntlMessages id="home.slide.row1" />
                </div>
                <h2 className={cn("h3", styles.title)}>
                  <IntlMessages id="home.slide.row2" />
                </h2>
                <Link
                  className={cn("button-stroke", styles.button)}
                  to="/search01"
                >
                  <IntlMessages id="home.slide.startYourSearch" />
                </Link>
              </div>
            </div>
            <div className={styles.mySlides}>
              <div className={styles.image}>
                <img alt={"NFT"} src="/images/content/masterslide05.jpg" />
              </div>
              <div className={styles.head}>
                <div className={styles.stage}>
                  <IntlMessages id="home.slide.row1" />
                </div>
                <h2 className={cn("h3", styles.title)}>
                  <IntlMessages id="home.slide.row2" />
                </h2>
                <Link
                  className={cn("button-stroke", styles.button)}
                  to="/search01"
                >
                  <IntlMessages id="home.slide.startYourSearch" />
                </Link>
              </div>
            </div>
            <div className={styles.mySlides}>
              <div className={styles.image}>
                <img alt={"NFT"} src="/images/content/masterslide06.jpg" />
              </div>
              <div className={styles.head}>
                <div className={styles.stage}>
                  <IntlMessages id="home.slide.row1" />
                </div>
                <h2 className={cn("h3", styles.title)}>
                  <IntlMessages id="home.slide.row2" />
                </h2>
                <Link
                  className={cn("button-stroke", styles.button)}
                  to="/search01"
                >
                  <IntlMessages id="home.slide.startYourSearch" />
                </Link>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    )
}

export default HeaderSlides