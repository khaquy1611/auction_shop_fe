import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Picture.module.sass";
import Image from "../../../components/Image";
import IntlMessages from "../../../i18n/IntlMessages";

const Picture = () => {
  return (
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>
            <IntlMessages id="home.saveYourTime" />
          </div>
          <h1 className={cn("p", styles.title)}>
            <IntlMessages id="home.picture.title" />
            {/* Nelson Mandela 70th Birthday Tribute */}
          </h1>
          <div className={styles.text}>
            <IntlMessages id="home.picture.text" />
            {/* The Nelson Mandela 70th birthday tribute global broadcast event at Wembley Stadium on June 11
                        1988 was
                        probably the most politically influential of any concert held in the UK. It was also one of the
                        biggest
                        and most spectacular pop-musical events of all time. */}
          </div>
          <div className={styles.btns}>
            <Link className={cn("button", styles.button)} to="/item">
              <IntlMessages id="home.saveYourTime.buyNow" />
            </Link>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/Ellipse.png"
              src="/images/content/Ellipse.png"
              alt="Ellipse"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picture;
