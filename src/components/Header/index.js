import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import DropdownImage from "../DropdownImage";
import {
  doChangeLocaleAction,
  showMoonPayModal,
  showPaymentModal,
} from "../../actions/AppActions";
import IntlMessages from "../../i18n/IntlMessages";
import { FormattedMessage } from "react-intl";
import { updateCurrentUserProfile } from "../../services/UserService";
import { signMoonpayUrl } from "../../services/WalletService";
import { lang } from "../../constants/constants";
import * as _ from "lodash";
import ModalPay from "../../components/ModalPay";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import { toast } from "react-toastify";

const navs = [
  {
    url: "/auction",
    title: <IntlMessages id="header.nav.auction" />,
  },
  {
    url: "/shop",
    title: <IntlMessages id="header.nav.shop" />,
  },
  {
    url: "/marketplace",
    title: <IntlMessages id="header.nav.marketplace" />,
  },
  {
    url: "/upcoming",
    title: <IntlMessages id="header.nav.upcomingdrops" />,
  },
  {
    url: "/faq",
    title: <IntlMessages id="header.nav.help" />,
  },
];

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNav: false,
      search: "",
      currentLink: window.location.pathname,
    };
  }

  setLanguage = (lang) => {
    this.props.setLocation(lang);
    const paramSend = {};
    paramSend.language = lang.locale;
    updateCurrentUserProfile(paramSend);
  };

  setCurrentLink = (link) => {
    this.setState({
      currentLink: link,
    });
  };

  handleSubmit = (e) => {
    this.props.history.push("/search");
  };

  onSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  setVisibleNav = (visibleNav) => {
    this.setState({
      visibleNav: visibleNav,
    });
  };

  setValue(value) {
    this.setState({
      value: value,
    });
  }

  onClickMoonPay = (walletPayment) => {
    signMoonpayUrl(walletPayment)
      .then((res) => {
        this.props.setShowModalPayment(false);
        if (res?.status == 200) {
          if (res?.data?.code === 1) {
            const urlWithSignature = res?.data?.data;
            this.props.setShowModalMoonPay(true, urlWithSignature);
          } else {
            toast.error("Failed to sign moonpay url");
          }
        } else {
          toast.error("Failed to sign moonpay url");
        }
      })
      .catch((ex) => {
        toast.error("Failed to sign moonpay url");
        console.error("onClickMoonPay ", ex);
        this.props.setShowModalPayment(false);
      });
  };

  render() {
    const { visibleNav, search, currentLink, language } = this.state;
    const {
      isLogin,
      locale,
      user,
      isShowPayment,
      isShowMoonPayModal,
      setShowModalPayment,
      setShowModalMoonPay,
      moonPayUrl,
      walletPayment,
    } = this.props;

    return (
      <div
        style={{
          transition: "0.5s",
          transtransitionTimingFunction: "ease-in-out",
        }}
        onLoad={(value) => this.props.handleLoader(value.type)}
      >
        <ModalPay
          hideClose={true}
          visible={isShowPayment}
          onClose={() => setShowModalPayment(false)}
        >
          <PaymentMethod
            handleClickMoonPay={(value) => this.onClickMoonPay(value)}
            onCancel={() => setShowModalPayment(false)}
          />
        </ModalPay>
        <ModalPay
          onClose={() => setShowModalMoonPay(false, "")}
          visible={isShowMoonPayModal}
        >
          <div className={styles.modalMoonPay}>
            <iframe
              allow="accelerometer; autoplay; camera; gyroscope; payment"
              frameBorder="0"
              height="100%"
              src={moonPayUrl}
              width="100%"
            >
              <p>
                <IntlMessages id="header.iframe.p" />
                {/* Your browser does not support iframes. */}
              </p>
            </iframe>
          </div>
        </ModalPay>
        <header className={styles.header}>
          <div className={cn("container", styles.container)}>
            <button
              className={cn(styles.burger, { [styles.active]: visibleNav })}
              onClick={() => this.setVisibleNav(!visibleNav)}
            >
              <span></span>
            </button>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/images/Listen Giff_001_PNG.gif"
                srcDark="/images/Listen Giff_001_PNG.gif"
                alt="#"
              />
            </Link>
            <div
              className={cn(styles.wrapper, { [styles.active]: visibleNav })}
            >
              <nav className={styles.nav}>
                {navs.map((nav, index) => {
                  return (
                    <Link
                      className={cn(
                        currentLink === nav.url ? styles.active : "",
                        styles.link
                      )}
                      to={nav.url}
                      key={index}
                      onClick={() => this.setCurrentLink(nav.url)}
                    >
                      {nav.title}
                    </Link>
                  );
                })}
              </nav>
              <form
                className={cn("hidden-desktop", styles.search)}
                action=""
                onSubmit={this.handleSubmit}
              >
                <FormattedMessage
                  id="header.search.placeholder"
                  defaultMessage="Search"
                >
                  {(placeholder) => (
                    <input
                      className={styles.input}
                      type="text"
                      value={search}
                      onChange={this.onSearchChange}
                      name="search"
                      placeholder={placeholder}
                      required
                    />
                  )}
                </FormattedMessage>
                <button type="submit" className={styles.result}>
                  <Icon name="search" size="20" />
                </button>
              </form>
            </div>
            <form
              className={cn("hidden-mobile", styles.search)}
              action=""
              onSubmit={this.handleSubmit}
            >
              <FormattedMessage
                id="header.search.placeholder"
                defaultMessage="Search"
              >
                {(placeholder) => (
                  <input
                    className={styles.input}
                    type="text"
                    value={search}
                    onChange={this.onSearchChange}
                    name="search"
                    placeholder={placeholder}
                    required
                  />
                )}
              </FormattedMessage>
              <button type="submit" className={styles.result}>
                <Icon name="search" size="20" />
              </button>
            </form>
            {isLogin ? (
              <Fragment>
                <Notification className={styles.notification} />
                <User className={styles.user} user={user} />
              </Fragment>
            ) : (
              <div className={styles.accountLink}>
                {/* <Link to="/sign-up" className={cn("hidden-mobile")}>
                <IntlMessages id="header.signIn" />
              </Link> */}
                <Link
                  className={cn("button", styles.button)}
                  to="/sign-up"
                  style={{ color: "#fff" }}
                >
                  <IntlMessages id="header.signup" />
                </Link>
              </div>
            )}
            <div className={cn("hidden-mobile", styles.languages)}>
              <DropdownImage
                className="dropdown-language"
                value={locale}
                setValue={(value) => this.setLanguage(value)}
                options={lang}
              />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  isLogin: app.isLogin,
  locale: app.locale,
  user: app.user,
  isShowPayment: app.isShowPayment,
  isShowMoonPayModal: app.isShowMoonPayModal,
  moonPayUrl: app.moonPayUrl,
  walletPayment: app.walletPayment,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setShowModalMoonPay: (isShow, moonPayUrl) => {
      dispatch(showMoonPayModal({ isShow, moonPayUrl }));
    },
    setShowModalPayment: (status) => {
      dispatch(showPaymentModal(status));
    },
    setLocation: (lang) => {
      dispatch(
        doChangeLocaleAction({
          locale: lang,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(Headers)));
