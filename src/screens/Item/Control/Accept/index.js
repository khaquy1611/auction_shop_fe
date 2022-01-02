import React from "react";
import cn from "classnames";
import styles from "./Accept.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";

const items = [
  {
    title: "Service fee",
    value: "0 USD",
  },
  {
    title: "Total bid amount",
    value: "$2,800",
  },
];

const Accept = ({ className }) => {
  return (
    <div className={cn(className, styles.accept)}>
      <div className={styles.line}>
        <div className={styles.icon}></div>
        <div className={styles.text}>
          <IntlMessages id="accept.text" />
          {/* You are about to accept a bid for  */}
          <strong>MYNFT</strong>
          <IntlMessages id="accept.text1" />
          {/* from */}
          <strong>Listen</strong>
        </div>
      </div>
      <div className={styles.stage}>
        $2,800 <IntlMessages id="accept.stage" />
        {/* for 1 edition */}
      </div>
      <div className={styles.table}>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>{x.title}</div>
            <div className={styles.col}>{x.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <IntlMessages id="accept.btnAccept" />
          {/* Accept bid */}
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="accept.btnCancel" />
        </button>
      </div>
    </div>
  );
};

export default Accept;
