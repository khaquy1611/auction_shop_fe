import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq6(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq6.On" />
        &ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.blockchain" />
        </span>
        ,&ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.smartChain" />
        </span>
        <IntlMessages id="Item.faq6.and" />
        &ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.ethereum" />
        </span>
        :&ensp;
        <IntlMessages id="Item.faq6.text1" />
      </h4>
      <h4 style={{ fontWeight: 500, marginTop: 10 }}>
        <IntlMessages id="Item.faq6.On" /> &ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq6.digital" />
        </span>
        :<IntlMessages id="Item.faq6.text2" />
      </h4>
    </div>
  );
}
export default Faq6;
