import React from "react";
import IntlMessages from "../../../../i18n/IntlMessages";
import styles from "./faq.module.sass";

function Faq2(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq2.text1" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq2.text2" />
      </h4>
    </div>
  );
}
export default Faq2;
