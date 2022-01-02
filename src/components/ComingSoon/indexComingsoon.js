import React from "react";
import ImgComingSoon from "./images/comingSoon.png";
import styles from "./ComingSoon.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const ComingSoon = () => {
  return (
    <div className={styles.center}>
      <img className={styles.img} src={ImgComingSoon} alt="comingSoon" />
      <div className={styles.text}>
        <h1 className={styles.title}>
          <IntlMessages id="comingSoon" /> !
        </h1>
        {/* <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </p> */}
      </div>
    </div>
  );
};
export default ComingSoon;
