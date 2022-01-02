import React from "react";
import styles from "./SearchNotFound.module.sass";
import SearchNotFound from "./images/search404.png";
import arrowRight from "./images/arrowRight.png";
import fruits from "./images/fruits.png";
import fruits1 from "./images/fruits1.png";
import fruits2 from "./images/fruits2.png";
import fruits3 from "./images/fruits3.png";
import Slider from "react-slick";
import IntlMessages from "../../i18n/IntlMessages";

export default function search404() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };
  return (
    <div className={styles.center}>
      <img className={styles.mobileimg} src={SearchNotFound} alt="404" />
      <div className={`${styles.text} ${styles.mobiletext}`}>
        <h1 className={`${styles.h1} `}>
          <IntlMessages id="search404.h1" />
          {/* Sorry, we couldn’t find any results for this search. */}
        </h1>
        <p className={styles.p}>
          <IntlMessages id="search404.p" />
          {/* Maybe give one of these a try? */}
        </p>
      </div>
      <div className={styles.inputSearch}>
        <input
          className={styles.input}
          placeholder="Enter your search..."
          type="text"
        />
        <button className={styles.button}>
          <img src={arrowRight} alt="arrowRight" />
        </button>
      </div>

      <h2 className={styles.h2}>
        <IntlMessages id="search404.h2" />
        {/* Explore more */}
      </h2>
      <div>
        <Slider {...settings}>
          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                  {/* items */}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits1} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                </p>
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits2} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                </p>
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits3} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                </p>
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits1} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                </p>
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits2} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                </p>
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.flex}>
              <img className={styles.radius} src={fruits3} alt="" />
              <div className={styles.spacing}>
                <h1 className={styles.text1}>
                  <IntlMessages id="search404.slider.text1" />
                  {/* Artwork */}
                </h1>
                <p className={styles.p}>
                  138
                  <IntlMessages id="search404.slider.items" />
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
