import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq7(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq7.forBlockchain" />
        &ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq7.text1.span" />
        </span>
        &ensp;
        <IntlMessages id="Item.faq7.text1" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img5.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq7.text2" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq7.text3.for" />
        &ensp;
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq7.text3.digital" />
        </span>
        ,<IntlMessages id="Item.faq7.text3" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img6.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq7.text4" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img7.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
    </div>
  );
}
export default Faq7;
