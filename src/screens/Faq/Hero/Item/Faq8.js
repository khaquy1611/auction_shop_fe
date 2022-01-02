import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq8(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        -&ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.ethereum" />
        </span>
        <IntlMessages id="Item.faq8.text1" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq8.text2" />
      </h4>
      <h4 className={styles.StepTextCover}>
        -&ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.smartChain" />
        </span>
        <IntlMessages id="Item.faq8.text3" />
      </h4>
      <h4 className={styles.StepTextCover}>
        -&ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.Flow" />
        </span>
        <IntlMessages id="Item.faq8.text4" />
      </h4>
      <h4 style={{ fontWeight: 500 }}>
        <IntlMessages id="Item.faq8.text5" />
      </h4>
    </div>
  );
}
export default Faq8;
