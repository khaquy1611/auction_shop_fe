import React from "react";
import IntlMessages from "../../i18n/IntlMessages";
import styles from "./Oops.module.sass";

export default function OOPS() {
  return (
    <div className={styles.OopsContainer}>
      <div className={styles.OopsImage}>
        <img
          src="/images/Oopsitem.png"
          className={styles.OopsImageItem}
          alt="opp"
        />
      </div>
      <div className={styles.OopsDesContent}>
        <h1 className={styles.OopsTitle}>
          <IntlMessages id="itemOp.oop" />
        </h1>
        <p className={styles.OopsText}>
          <IntlMessages id="opp.text" />
        </p>
        {/* <a className={styles.OopsBtn}>Try Again</a> */}
      </div>
    </div>
  );
}
