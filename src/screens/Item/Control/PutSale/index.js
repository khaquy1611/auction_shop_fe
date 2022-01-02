import React, { useState } from "react";
import cn from "classnames";
import styles from "./PutSale.module.sass";
import Icon from "../../../../components/Icon";
import Switch from "../../../../components/Switch";
import IntlMessages from "../../../../i18n/IntlMessages";

const items = [
  {
    title: "Enter your price",
    value: "USD",
  },
  {
    title: "Service fee",
    value: "1.5%",
  },
  {
    title: "Total bid amount",
    value: "0 USD",
  },
];

const PutSale = ({ className }) => {
  const [price, setPrice] = useState(false);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="putSale.title" />
        {/* Put on sale */}
      </div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <div className={styles.info}>
            <IntlMessages id="putSale.info" />
            {/* Instant sale price */}
          </div>
          <div className={styles.text}>
            <IntlMessages id="putSale.text" />
            {/* Enter the price for which the item will be instanly sold */}
          </div>
        </div>
        <Switch className={styles.switch} value={price} setValue={setPrice} />
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
          <IntlMessages id="putSale.btn" />
          {/* Continue */}
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="putSale.btn1" />
          {/* Cancel */}
        </button>
      </div>
    </div>
  );
};

export default PutSale;
