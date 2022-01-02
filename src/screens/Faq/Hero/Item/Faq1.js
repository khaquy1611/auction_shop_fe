import React from "react";
import IntlMessages from "../../../../i18n/IntlMessages";
import styles from "./faq.module.sass";
function Faq1(params) {
  return (
    <div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text1" />
      </h4>
      <h4  className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text2" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text3" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text4" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text5" />
      </h4>
      <div style={{ marginLeft: 20 }}>
        <h4 style={{ fontWeight: 500, marginTop: 5 }}>
          &bull; <IntlMessages id="Item.faq1.text5.item1" />
        </h4>
        <h4 style={{ fontWeight: 500, marginTop: 5 }}>
          &bull; <IntlMessages id="Item.faq1.text5.item2" />
        </h4>
        <h4 style={{ fontWeight: 500, marginTop: 5 }}>
          &bull; <IntlMessages id="Item.faq1.text5.item3" />
        </h4>
        <h4 style={{ fontWeight: 500, marginTop: 5 }}>
          &bull; <IntlMessages id="Item.faq1.text5.item4" />
        </h4>
        <h4 style={{ fontWeight: 500, marginTop: 5 }}>
          &bull; <IntlMessages id="Item.faq1.text5.item5" />
        </h4>
      </div>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text6" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text7" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text8" />
      </h4>
      <h4 className={styles.StepTextCover}>
        <IntlMessages id="Item.faq1.text9" />
      </h4>
    </div>
  );
}
export default Faq1;
