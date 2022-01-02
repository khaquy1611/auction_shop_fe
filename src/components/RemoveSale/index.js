import React from "react";
import cn from "classnames";
import styles from "./RemoveSale.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const RemoveSale = ({ className }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="removeSale.title" />
        {/* Remove from sale */}
      </div>
      <div className={styles.text}>
        <IntlMessages id="removeSale.text" />
        {/* Do you really want to remove your item from sale? You can put it on sale
                anytime */}
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <IntlMessages id="removeSale.btn" />
          {/* Remove now */}
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="removeSale.btn1" />
          {/* Cancel */}
        </button>
      </div>
    </div>
  );
};

export default RemoveSale;
