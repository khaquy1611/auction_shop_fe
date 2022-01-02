import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq10(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq10.text1" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq10.text2" />
      </h4>
      <h4 className={styles.StepTextCover}>
        -
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.step1" />
        </span>
        :<IntlMessages id="Item.faq10.step1.text" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img8.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        -
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.step2" />
        </span>
        :<IntlMessages id="Item.faq10.step2.text1" />
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq10.step2.text2" />
        </span>
        <IntlMessages id="Item.faq10.step2.text3" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img9.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        -
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.step3" />
        </span>
        :<IntlMessages id="Item.faq10.step3.text" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img10.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        -
        <span className={styles.StepText}>
          <IntlMessages id="Item.faq.step4" />
        </span>
        :<IntlMessages id="Item.faq10.step4.text" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img11.png"
          alt="alt"
          className={styles.ImgHelpItemWallet}
        />
      </div>
    </div>
  );
}
export default Faq10;
