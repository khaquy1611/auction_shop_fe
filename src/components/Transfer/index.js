import React from "react";
import cn from "classnames";
import styles from "./Transfer.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const Transfer = ({ className }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="transfer.title" />
        {/* Transfer token */}
      </div>
      <div className={styles.text}>
        <IntlMessages id="transfer.text" />
        {/* You can transfer tokens from your address to another */}
      </div>
      <div className={styles.info}>
        <IntlMessages id="transfer.info" />
        {/* Receiver address */}
      </div>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          name="address"
          placeholder="Paste address"
        />
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <IntlMessages id="transfer.btn" />
          {/* Continue */}
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="transfer.btn1" />
        </button>
      </div>
    </div>
  );
};

export default Transfer;
