import React from "react";
import cn from "classnames";
import { Link, withRouter } from "react-router-dom";
import Slider from "react-slick";
import styles from "./Hero.module.sass";
import Icon from "../../../components/Icon";
import Player from "../../../components/Player";
import Modal from "../../../components/Modal";
import { compose } from "redux";
import TimeCountdown from "../../../components/TimeCountdown";
import IntlMessages from "../../../i18n/IntlMessages";
import Bid from "../../../components/Bid";
import ModalSignIp from "../../../components/ModalSignIUP";
import { connect } from "react-redux";
import { LISTEN } from "../../../constants/constants";
import Currency from "./Currency";
import HeaderSlides from "../../../components/HeaderSlides";
import WarningComponent from "../../../components/WarningComponent";
import ModalCollections from "../../../components/ModalCollections";
import PleaceBidCollection from "../../../components/PleaceBidCollection";
import { bidWithCharacter } from "../../../constants/Utils";
import Skeleton from "react-loading-skeleton";
const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <div {...props}>{children}</div>
);

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  dots: false,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToScroll: 1,
  adaptiveHeight: true,
  cssEase: "linear",

  nextArrow: (
    <SlickArrow>
      <button className={styles.btn}>
        <Icon name="arrow-next" size="14" />
      </button>
    </SlickArrow>
  ),
  prevArrow: (
    <SlickArrow style={{ boxShadow: "white" }}>
      <button className={styles.btn}>
        <Icon name="arrow-prev" size="14" />
      </button>
    </SlickArrow>
  ),
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const settingSlideImage = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
};

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModalBid: false,
      navSlider1: null,
      navSlider2: null,
      valueDetail: null,
      autoplay: false,
      isVideoLoad: false,
      loader: false,
      addMoney: false,
    };
  }

  componentDidMount() {
    this.setState({
      navSlider1: this.slider1,
      navSlider2: this.slider2,
    });
  }

  setVisibleModalBid = (visible, value) => {
    this.setState({
      visibleModalBid: visible,
      valueDetail: value,
      autoplay: !visible,
    });
  };

  handleLoad = (img) => {
    if (img) {
      this.setState({
        loader: true,
      });
    }
  };

  handleUpdateProfile = () => {
    window.location.replace("/my-profile");
  };

  render() {
    const {
      visibleModalBid,
      valueDetail,
      autoplay,
    } = this.state;
    const { items, user, callData, balace } = this.props;

    return (
      <>
        <div className={styles.sliderContainer}>
          <HeaderSlides />
        </div>
        <div className={cn("section hotBidSection", styles.section)}>
          <div
            className={cn("container", styles.container)}
            style={{ maxWidth: "1140px" }}
          >
            <div className={styles.wrapper}>
              <Slider
                className={cn("product-slider", styles.slider)}
                asNavFor={this.state.navSlider2}
                autoplay={autoplay}
                ref={(slider) => (this.slider1 = slider)}
                arrows={false}
              >
                {items &&
                  items.length > 0 &&
                  items?.map((x) => {
                    return (

                      <React.Fragment key={x?.highestBidAuction?.auctionID}>
                        <div className={styles.slide} key={x?.highestBidAuction?.auctionID}>
                          <div className={styles.row} key={x?.highestBidAuction?.auctionID}>
                            <div className={styles.Contentsubtitle}>
                              <div className={styles.ContentContainersubtitle}>
                                <div className={cn("p", styles.subtitle)}>
                                  {x?.highestBidAuction?.nftCollection[0]?.name}
                                </div>
                                <div className={styles.line}>
                                  <div className={styles.item}>
                                    <div className={styles.avatar}>
                                      <img
                                        src="/images/content/avatar-creator.jpg"
                                        alt="Avatar"
                                      />
                                    </div>
                                    <div className={styles.description}>
                                      <div className={styles.category}>
                                        <IntlMessages id="home.creator" />
                                      </div>
                                      <div className={styles.text}>
                                        {LISTEN}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.item}>
                                    <div className={styles.icon}>
                                      <Icon name="coin" size="24" />
                                    </div>
                                    <div className={styles.description}>
                                      <div className={styles.category}>
                                        <IntlMessages id="home.minPrice" />
                                      </div>
                                      <div className={styles.text}>
                                        ${bidWithCharacter(x?.highestBidAuction?.startingPrice)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Player
                                  className={styles.player}
                                  key={x?.highestBidAuction?.auctionID}
                                  id={x?.highestBidAuction?.auctionID}
                                  item={x?.highestBidAuction}
                                />
                              </div>
                            </div>

                            <div className={styles.details}>
                              <div className={styles.wrap}>
                                <div className={styles.info}>
                                  <IntlMessages id="home.currentBid" />
                                </div>
                                <div className={styles.currency}>
                                  {parseInt(x[0]?.currentBid) > 0 ? (
                                    `$${bidWithCharacter(x?.highestBidAuction?.currentBid)}`
                                  ) : (
                                    <p
                                      style={{
                                        fontSize: 25,
                                        fontWeight: 400,
                                        color: "#ee4e00",
                                      }}
                                    >
                                      No bid yet
                                    </p>
                                  )}
                                </div>
                                {parseInt(x.currentBid) > 0 && (
                                  <Currency dataItem={x[0]?.currentBid} />
                                )}
                                <div className={styles.price}></div>
                                <div className={styles.info}>
                                  <IntlMessages id="home.ending" />
                                </div>
                                <div className={styles.timer}>
                                  <TimeCountdown
                                    startDate={parseInt(x?.highestBidAuction?.endTime) * 1000}
                                  />
                                </div>
                              </div>
                              <div className={styles.btns}>
                                {x.auctionState === "Complete" ||
                                  x.auctionState === "Upcoming" ? (
                                  ""
                                ) : (
                                  <button
                                    className={cn("button", styles.button)}
                                    onClick={() =>
                                      this.setVisibleModalBid(true, x)
                                    }
                                  >
                                    <IntlMessages id="home.placeBid" />
                                  </button>
                                )}

                                <Link
                                  className={cn("button-stroke", styles.button)}
                                  to={`/item/${x?.highestBidAuction?.auctionID}`}
                                >
                                  <IntlMessages id="home.viewItem" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </Slider>
            </div>
            <div className={styles.contaiNerSlider}>
              <Slider
                className={cn("thumbnail-slider", styles.slider)}
                asNavFor={this.state.navSlider1}
                ref={(slider) => (this.slider2 = slider)}
                swipeToSlide={true}
                focusOnSelect={true}
                autoplay={autoplay}
                // slidesToShow={items?.length < 4 ? items?.length : 4}
                {...settings}
              >
                {items &&
                  items?.length > 0 &&
                  items?.map((x, index) => {
                    return (
                      <div className={styles.cArdItem}>
                        <div className={styles.thumbnail}>
                          {x?.highestBidAuction?.nftCollection[0]?.mime_type === "video/mp4" ? (
                            <div className={styles.thumbnailImgContainer}>
                              <video
                                width="100%"
                                height="120px"
                                loop
                                playsInline
                                className={styles.VideoContent}
                                poster={x?.highestBidAuction?.nftCollection[0]?.thumbURL}
                                onMouseOver={(e) => this.hoverVideo()}
                                onMouseOut={(e) => this.hideVideo()}
                              >
                                <source
                                  src={
                                    x?.highestBidAuction?.nftCollection[0]?.imageURL?.length > 0
                                      ? x?.highestBidAuction?.nftCollection[0]?.imageURL
                                      : x?.highestBidAuction?.nftCollection[0].mediaUrl
                                  }
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                          ) : (
                            <>
                              {!x?.highestBidAuction && <Skeleton height="120px" />}
                              <img
                                src={
                                  x?.highestBidAuction?.nftCollection[0]?.imageURL?.length > 0
                                    ? x?.highestBidAuction?.nftCollection[0]?.imageURL
                                    : x?.highestBidAuction?.nftCollection[0]?.mediaUrl
                                }
                                height="120px"
                                alt="Video preview"
                                // style={{ display: !loader ? "none" : ""}}
                                onLoad={this.handleLoad}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </Slider>
              <div className={styles.detail}>
                {items?.length > 0 && user?.zipcode < 1 ? (
                  <WarningComponent
                    title="Update billing"
                    content="Please update your billing infomation."
                    onChange={this.handleUpdateProfile}
                  />
                ) : (
                  items?.length > 0 &&
                  parseInt(balace) === 0 && (
                    <WarningComponent
                      title="Not enought funds"
                      content="To deposit"
                      onChange={() => this.props.handleAddMoney()}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {user && user ? (
          <ModalCollections
            visible={visibleModalBid}
            onClose={() => this.setVisibleModalBid(false, null)}
          >
            <PleaceBidCollection
              data={valueDetail}
              onCancel={() => this.setVisibleModalBid(false, null)}
              callData={callData}
            />
          </ModalCollections>
        ) : (
          <Modal
            visible={visibleModalBid}
            onClose={() => this.setVisibleModalBid(false, null)}
          // title={user?.zipcode?.length === 0 && "Bidling Address"}
          >
            <ModalSignIp
              onCancel={() => this.setVisibleModalBid(false, null)}
            />
          </Modal>
        )}

        {/* <ModalPay visible={addMoney} onClose={() => this.handleAddMoney(false)}>
          <PaymentMethod />
        </ModalPay> */}
      </>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  user: app.user,
});

const withConnect = connect(mapStateToProps);

export default compose(withRouter, withConnect)(Hero);