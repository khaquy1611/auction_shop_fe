import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Icon from "../../../components/Icon";
import IntlMessages from "../../../i18n/IntlMessages";

const Preview = ({ className, onClose }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>
          <IntlMessages id="upload-details.preview.info" />
          {/* Preview */}
        </div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              srcSet="/images/content/card-pic-6.jpg"
              src="/images/content/card-pic-6@2x.jpg"
              alt="Card"
            />
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>
                  <IntlMessages id="upload-details.preview.title" />
                  {/* Black Golden Tiger */}
                </div>
                <div className={styles.price}>$2,450</div>
              </div>
              <div className={styles.line}>
                <div className={styles.users}>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-1.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-3.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-4.jpg" alt="Avatar" />
                  </div>
                </div>
                <div className={styles.counter}>
                  <IntlMessages id="upload-details.preview.counter" />
                  {/* 3 in stock */}
                </div>
              </div>
            </div>
            <div className={styles.foot}>
              <div className={styles.status}>
                <Icon name="candlesticks-up" size="20" />
                <IntlMessages id="upload-details.preview.status" />
                {/* Highest bid  */}
                <span>$10,000</span>
              </div>
              <div className={styles.bid}>
                <IntlMessages id="upload-details.preview.bid" />
                {/* New bid */}
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.clear}>
          <Icon name="circle-close" size="24" />
          <IntlMessages id="upload-details.preview.clear" />
          {/* Clear all */}
        </button>
      </div>
    </div>
  );
};

export default Preview;
