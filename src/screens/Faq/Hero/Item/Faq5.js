import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq5(params) {
  return (
    <div>
      <h4 className={styles.StepText}>
        <IntlMessages id="Item.faq.step1" />:
        <span className={styles.StepTextCover}>
          <IntlMessages id="Item.faq5.textCover1" />
        </span>
      </h4>
      <img
        className={styles.ImgHelpItem}
        src="/images/help/img1.png"
        alt="alt"
      />
      <h4 className={styles.StepText}>
        <IntlMessages id="Item.faq.step2" />:
        <span className={styles.StepTextCover}>
          <IntlMessages id="Item.faq5.textCover2" />
        </span>
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img2.png"
          alt="alt"
          className={styles.ImgHelpItemCreate}
        />
      </div>
      <h4 className={styles.StepText}>
        <IntlMessages id="Item.faq.step3" />:
        <span className={styles.StepTextCover}>
          <IntlMessages id="Item.faq5.textCover3" />
        </span>
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img3.png"
          alt="alt"
          className={styles.ImgHelpItemInfo}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq5.textCover4" />
      </h4>
      <div className={styles.ImgHelpItem}>
        <img
          src="/images/help/img4.png"
          alt="alt"
          className={styles.ImgHelpItemInfo}
        />
      </div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq5.textCover5" />
      </h4>
    </div>
  );
}
export default Faq5;
