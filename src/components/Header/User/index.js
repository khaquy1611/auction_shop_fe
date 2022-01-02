import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import IntlMessages from "../../../i18n/IntlMessages";
import { setLengthString } from "../../../constants/Utils";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      flagViewWalletAddress: false,
    };
  }

  setVisible = (visible) => {
    this.setState({
      visible: visible,
    });
  };
  // viewWalletAddress = () => {
  //     if (this.state.flagViewWalletAddress) {
  //         this.setState({
  //             flagViewWalletAddress: false
  //         })
  //     }else {
  //         this.setState({
  //             flagViewWalletAddress: true
  //         })
  //     }
  // }

  render() {
    const { visible, flagViewWalletAddress } = this.state;
    const { user } = this.props;

    const items = [
      {
        title: <IntlMessages id="header.user.profile" />,
        icon: "user",
        url: "/my-profile",
      },
      {
        title: <IntlMessages id="header.user.security" />,
        icon: "globe",
        url: "/my-security",
      },
      {
        title: <IntlMessages id="header.user.items" />,
        icon: "image",
        url: `/profile/${user?.userName}`,
      },
      {
        title: <IntlMessages id="header.user.wallet" />,
        icon: "wallet",
        url: "/my-wallet/idGr=0&idPosition=1",
      },
      {
        title: <IntlMessages id="header.user.disconnect" />,
        icon: "exit",
        url: "/sign-out",
      },
    ];
    return (
      <OutsideClickHandler onOutsideClick={() => this.setVisible(false)}>
        <div className={cn(styles.user)}>
          <div
            className={styles.head}
            onClick={() => this.setVisible(!visible)}
          >
            <div className={styles.avatar}>
              <img
                src={
                  user?.avatar?.length > 0
                    ? user.avatar
                    : "/images/photo_2021-11-26_15-52-36.jpg"
                }
                alt="Avatar"
              />
            </div>
            <div className={styles.wallet}>
              {(user?.displayName.length > 0 && user?.displayName) ||
                (user?.displayName.length === 0 &&
                  user?.userName.length > 0 &&
                  setLengthString(user?.userName, 5, "...")) ||
                (user?.displayName.length === 0 &&
                  user?.userName.length === 0 &&
                  setLengthString(user?.email, 5, "..."))}
            </div>
          </div>
          {visible && (
            <div className={styles.body}>
              {user?.flow ? (
                <>
                  <div className={styles.name}>Enrico Cole</div>
                  <div className={styles.code}>
                    <div
                      className={cn(
                        flagViewWalletAddress ? styles.showIcon : "",
                        styles.number
                      )}
                    >
                      <div className={styles.addressNumber}>{user.flow}</div>
                      {/*<button className={styles.buttonView} onClick={() => this.viewWalletAddress()}>*/}
                      {/*    <img src={flagViewWalletAddress ? '/images/content/hide-eye.svg' : '/images/content/view.svg'} alt={'view'}/>*/}
                      {/*</button>*/}
                    </div>
                    <Link className={styles.copy} to={"/wallet"}>
                      <Icon name="arrowExpand" size="16" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className={styles.name}>
                  {user?.displayName
                    ? user?.displayName
                    : setLengthString(user?.userName, 10, "...")}
                </div>
              )}
              {/* <div className={styles.wrap}>
                <div className={styles.line}>
                  <div className={styles.iconCoin}>
                    <img
                      className={styles.iconCoinImg}
                      src={user.avatar.length > 0 ? user.avatar : "/images/photo_2021-11-26_15-52-36.jpg"}
                      alt={"icon-coin"}
                    />
                  </div>
                  <div className={styles.details}>
                    <div className={styles.info}>
                      <IntlMessages id="header.user.balance" />
                    </div>
                    <div className={styles.price}>$10,000</div>
                  </div>
                </div>
              </div> */}
              <div className={styles.menu}>
                {items.map((x, index) =>
                  x.url ? (
                    x.url.startsWith("http") ? (
                      <a
                        className={styles.item}
                        href={x.url}
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <div className={styles.icon}>
                          <Icon name={x.icon} size="20" />
                        </div>
                        <div className={styles.text}>{x.title}</div>
                      </a>
                    ) : (
                      <Link
                        className={styles.item}
                        to={x.url}
                        onClick={() => this.setVisible(!visible)}
                        key={index}
                      >
                        <div className={styles.icon}>
                          <Icon name={x.icon} size="20" />
                        </div>
                        <div className={styles.text}>{x.title}</div>
                      </Link>
                    )
                  ) : (
                    <div className={styles.item} key={index}>
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                      <Theme className={styles.theme} />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default React.memo(User);
