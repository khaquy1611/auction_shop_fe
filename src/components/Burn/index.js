import React from "react";
import cn from "classnames";
import styles from "./Burn.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const Burn = ({ className }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="burn.title" />
      </div>
      <div className={styles.text}>
        <IntlMessages id="burn.text" />
        {/* Are you sure to burn this token? This action cannot be undone. Token
        will be transfered to zero address */}
      </div>
      <div className={styles.btns}>
        <button className={cn("button-pink", styles.button)}>
          <IntlMessages id="burn.btn1" />
          {/* Continue */}
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="burn.btn2" />
          {/* Cancel */}
        </button>
      </div>
    </div>
  );
};

export default Burn;
