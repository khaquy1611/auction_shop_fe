import React from "react";
import styles from "./faq.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
function Faq4(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq4.text" />
      </h4>
      <div>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text1" />
        </h4>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text2" />
        </h4>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text3" />
        </h4>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text4" />
        </h4>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text5" />
        </h4>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text6" />
        </h4>
        <h4 className={styles.StepTextCover}>
          &bull; <IntlMessages id="Item.faq4.text7" />
        </h4>
      </div>
    </div>
  );
}
export default Faq4;
