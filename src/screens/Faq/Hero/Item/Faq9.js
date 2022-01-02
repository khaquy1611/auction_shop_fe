import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq9(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq9.text1" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq.ethereum" />:
        <a href=" https://etherscan.io/" alt="link">
          https://etherscan.io/
        </a>
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq.smartChain" />:
        <a href="https://bscscan.org" alt="link">
          https://bscscan.org
        </a>
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq.Flow" />:
        <a href="https://flowscan.org/" alt="link">
          https://flowscan.org/
        </a>
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq9.text2" />
      </h4>
    </div>
  );
}
export default Faq9;
