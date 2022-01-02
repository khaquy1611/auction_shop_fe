import React from "react";
import IntlMessages from "../../i18n/IntlMessages";
import styles from "./Oops.module.sass";

export default function ItemOpps() {
  return (
    <div className={styles.OopsContainer}>
      <div className={styles.OopsImage}>
        {/* <img
          src="./images/content/Oops.svg"
          className={styles.OopsImageItem}
        ></img> */}
      </div>
      <div className={styles.OopsDescription}>
        <div className={styles.OopsDesContent}>
          <h3 className={styles.OopsTitle}><IntlMessages id="itemOp.oop" /></h3>
          <p className={styles.OopsText}>
            <IntlMessages id="itemOp.text" />
            {/* No auction yet. */}
          </p>
          {/* <a className={styles.OopsBtn}>Try Again</a> */}
        </div>
      </div>
    </div>
  );
}
