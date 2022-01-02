import React, { useState } from "react";
import cn from "classnames";
import styles from "./Filters.module.sass";
import Checkbox from "../../../components/Checkbox";
import IntlMessages from "../../../i18n/IntlMessages";

const filters = [
  "Login",
  "Auction",
  "WalletDeposit",
  "WalletWithdraw",
  "Buy",
  "Sell",
  "All",
];
const Filters = ({ className, onChange }) => {
  const [selected, setSelected] = useState("All");
  const handleChange = (filter) => {
    if (onChange) {
      onChange(filter);
    }
    setSelected(filter);
  };
  return (
    <div className={cn(styles.filters, className)}>
      <div className={styles.info}>
        <IntlMessages id="activity.filters.info" />
      </div>
      <div className={styles.group}>
        {filters.map((x, index) => (
          <Checkbox
            className={styles.checkbox}
            content={x}
            value={x === selected}
            onChange={() => handleChange(x)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
