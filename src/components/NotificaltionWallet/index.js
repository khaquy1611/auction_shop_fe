import React from "react";
import cn from "classnames";
import styles from "./NotificaltionWallet.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const NotificaltionWallet = (props) => {
  const { onClick,onClickCancel } = props;
  return (
    <div>
      <div className={styles.icon}>
        <img
          className={styles.iconStyles}
          src="/images/content/metamask.svg"
          alt="icon metaMask"
        />
      </div>
      <div className={styles.info}>
        <IntlMessages id="wattet.notificaltion.installMetamask" />
      </div>
      <div className={styles.btns}>
        <button onClick={onClick} className={cn("button", styles.button)}>
          <IntlMessages id="item.placeBid.connectWallet.button" />
        </button>
        <button onClick={onClickCancel} className={cn("button-stroke", styles.button)}>
          <IntlMessages id="item.placeBid.connectWallet.button.cancel" />
        </button>
      </div>
    </div>
  );
};

export default NotificaltionWallet;
