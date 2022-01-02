import React from "react";
import cn from "classnames";
import styles from "./Connect.module.sass";
import Icon from "../Icon";
import IntlMessages from "../../i18n/IntlMessages";

const Connect = ({ className }) => {
  return (
    <div className={cn(className, styles.connect)}>
      <div className={styles.icon}>
        <Icon name="wallet" size="24" />
      </div>
      <div className={styles.info}>
        <IntlMessages id="item.placeBid.connectWallet" />
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <IntlMessages id="item.placeBid.connectWallet.button" />
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="item.placeBid.connectWallet.button.cancel" />
        </button>
      </div>
    </div>
  );
};

export default Connect;
