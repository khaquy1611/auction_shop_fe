import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq3(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq3.text1" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq3.text2" />
      </h4>
    </div>
  );
}
export default Faq3;
