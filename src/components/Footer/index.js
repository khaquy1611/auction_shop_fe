import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import IntlMessages from "../../i18n/IntlMessages";
import { FormattedMessage } from "react-intl";
// import Theme from "../Theme";
import { connect } from "react-redux";
const items = [
  {
    menu: [
      {
        title: <IntlMessages id="footer.nav.auction" />,
        url: "/auction",
      },
      {
        title: <IntlMessages id="footer.nav.shop" />,
        url: "/shop",
      },
      {
        title: <IntlMessages id="footer.nav.marketplace" />,
        url: "/marketplace",
      },
      {
        title: <IntlMessages id="footer.nav.upcommingdrops" />,
        url: "/upcoming",
      },
      {
        title: <IntlMessages id="footer.nav.term" />,
        url: "/terms-and-condition",
      },
    ],
  },
  {
    menu: [
      {
        title: <IntlMessages id="footer.nav.closing" />,
        url: "/closing",
      },
      {
        title: <IntlMessages id="footer.nav.dropend" />,
        url: "/ends",
      },
      {
        title: <IntlMessages id="footer.nav.help" />,
        url: "/faq",
      },
      {
        title: <IntlMessages id="footer.nav.events" />,
        url: "/events",
      },
      {
        title: <IntlMessages id="footer.nav.privacyPolicy" />,
        url: "/privacy-and-policy",
      },
    ],
  },
];

class Footers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showFooter: false,
      accept: false,
    };
  }

  setEmail = (email) => {
    this.setState({
      email: email,
    });
  };

  handleSubmit = (e) => {
    alert();
  };

  handelAccept = () => {
    // get local storage
    this.setState({
      accept: !this.state.accept,
    });

    if (typeof Storage !== undefined) {
      localStorage.setItem("accept", this.state.accept);
    }
  };

  componentDidMount() {
    if (window.location.pathname === "/item") {
      this.setState({
        showFooter: true,
      });
    } else
      this.setState({
        showFooter: false,
      });
  }

  render() {
    const { email, showFooter } = this.state;
    const { user } = this.props;

    return (
      <footer className={styles.footer}>
        <div className={cn("container", styles.container)}>
          <div
            className={cn(showFooter ? styles.hideFooter : "", styles.row)}
          >
            <div className={styles.col}>
              <Link className={styles.logo} to="/">
                <Image
                  className={styles.pic}
                  src="/images/Listen Giff_001_PNG.gif"
                  srcDark="/images/Listen Giff_001_PNG.gif"
                  alt="#"
                />
              </Link>
              <div className={styles.info}>
                <IntlMessages id="footer.info" />
              </div>
              {/*<div className={styles.version}>*/}
              {/*  <div className={styles.details}>  Dark theme</div>*/}
              {/*  <Theme className="theme-big" />*/}
              {/*</div>*/}
            </div>
            <div className={styles.col}>
              {items.map((x, index) => (
                <Group className={styles.group} item={x} key={index} />
              ))}
            </div>
            <div className={styles.col}>
              <div className={styles.category}>
                <IntlMessages id="footer.joinNewsletter" />
              </div>
              <div className={styles.text}>
                <IntlMessages id="footer.subscribe" />
              </div>
              <FormattedMessage
                id="footer.enterEmail"
                defaultMessage="Enter your email"
              >
                {(placeholder) => (
                  <Form
                    className={styles.form}
                    value={email}
                    setValue={() => this.setEmail(email)}
                    onSubmit={() => this.handleSubmit()}
                    placeholder={placeholder}
                    type="email"
                    name="email"
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div
            className={cn(
              showFooter ? styles.hideFooter : "",
              styles.introduce
            )}
            style={{ maxWidth: "1140px", margin: "auto" }}
          >
            <h2>
              <IntlMessages id="footer.row1" />
            </h2>
            <h3>
              <IntlMessages id="footer.row2" />
            </h3>
            <p>
              <IntlMessages id="footer.row3" />
            </p>
          </div>
          <div
            className={styles.foot}
          >
            <div className={styles.copyright}>
              <IntlMessages id="footer.copyRight" />
            </div>
            {user?.sub && (
              <div
                className={`${styles.note} ${
                  localStorage.getItem("accept")
                    ? cn("hideAccept", styles.hideFooter)
                    : cn("showAccept", styles.showFooter)
                }`}
              >
                <IntlMessages id="footer.cookies" />
                <a onClick={this.handelAccept} href="/#">
                  <IntlMessages id="footer.accept" />
                </a>
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
  };
};
export default connect(mapStateToProps)(React.memo(Footers));
