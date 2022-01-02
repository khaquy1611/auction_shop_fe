import React from "react";
import styles from "./Oops.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

export default function Search() {
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
          <h3 className={styles.OopsTitle}>Oops!</h3>
          <p className={styles.OopsText}>
            <IntlMessages id="search.text" />
            {/* No results found */}
          </p>
          {/* <a className={styles.OopsBtn}>Try Again</a> */}
        </div>
      </div>
    </div>
  );
}
