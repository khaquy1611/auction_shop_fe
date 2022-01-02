import React from "react";
import cn from "classnames";
import styles from "./SuccessfullyPurchased.module.sass";
import Icon from "../../../../components/Icon";
import IntlMessages from "../../../../i18n/IntlMessages";

const socials = [
  {
    title: "facebook",
    url: "https://www.facebook.com/#",
  },
  {
    title: "twitter",
    url: "https://twitter.com/#",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/#",
  },
  {
    title: "pinterest",
    url: "https://www.pinterest.com/#",
  },
];

const SuccessfullyPurchased = ({ className }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={cn("h2", styles.title)}>
        <IntlMessages id="Purchased.title" />
        {/* Yay! */}
        <span role="img" aria-label="firework">
          🎉
        </span>
      </div>
      <div className={styles.info}>
        <IntlMessages id="Purchased.info" />
        {/* You successfully purchased */}
        <span>MYNFT</span>
        <IntlMessages id="Purchased.text" />
        {/* from */}
        Listen
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            <IntlMessages id="Purchased.status" />
            {/* Status */}
          </div>
          <div className={styles.col}>
            <IntlMessages id="Purchased.transaction" />
            {/* Transaction ID */}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <IntlMessages id="Purchased.processing" />
            {/* Processing */}
          </div>
          <div className={styles.col}>0x1234567890</div>
        </div>
      </div>
      <div className={styles.stage}>
        <IntlMessages id="Purchased.timeShowOff" />
        {/* Time to show-off */}
      </div>
      <div className={styles.socials}>
        {socials.map((x, index) => (
          <a
            className={styles.social}
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <Icon name={x.title} size="24" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuccessfullyPurchased;
