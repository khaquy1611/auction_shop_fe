import React, { useState } from "react";
import cn from "classnames";
import styles from "./Donate.module.sass";
import Icon from "../../../../components/Icon";
import Switch from "../../../../components/Switch";
import { Link } from "react-router-dom";
import IntlMessages from "../../../../i18n/IntlMessages";

const items = [
  {
    title: "Enter your price",
    value: "USD",
  },
  {
    title: "Service fee",
    value: "1.5%",
  },
  {
    title: "Total bid amount",
    value: "0 USD",
  },
];

const Donate = ({ className }) => {
  const [price, setPrice] = useState(false);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="donate.title" />
        {/* Donation */}
      </div>
      <div className={styles.content}>
        <div className={styles.field}>
          <div className={styles.label}>
            <label>
              <IntlMessages id="donate.label" />
              {/* Send */}
            </label>
          </div>
          <div className={cn(styles.bgInput, styles.input)}>
            <p
              style={{
                backgroundImage: "url(/images/content/usdc.svg)",
              }}
            >
              <span>
                USDC 1,000 <IntlMessages id="donate.available" />
              </span>
              <span className={styles.orangeText}>
                <IntlMessages id="donate.max" />
              </span>
            </p>
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <label>
              <IntlMessages id="donate.label1" />
              {/* Recipient address */}
            </label>
            <Link to={"/"}>
              <span>
                <IntlMessages id="donate.Link" />
                {/* Manage addresses */}
              </span>
              <img src="/images/content/arrowExpand.svg" alt="arrow-expand" />
            </Link>
          </div>
          <div className={styles.input}>
            <input type={"text"} value={"0x...."} />
          </div>
        </div>
        <div className={styles.note}>
          <span>
            <IntlMessages id="donate.note" />
            {/* Make sure you are sending to an address on the Etherium mainnet */}
          </span>
        </div>
        <div className={cn(styles.last, styles.field)}>
          <div className={styles.label}>
            <label>
              USDC <IntlMessages id="donate.amount" />
            </label>
          </div>
          <div className={styles.input}>
            <input type={"text"} value={"0.00"} />
          </div>
        </div>
        <div className={styles.note}>
          <span>
            <IntlMessages id="donate.note1" /> USDC
          </span>
          {/* A network free will be added to withdraw  */}
        </div>
        <div className={styles.btns}>
          <button className={cn("button", styles.button)}>
            <IntlMessages id="donate.btn" />
            {/* Review */}
          </button>
        </div>
        <div className={styles.warning}>
          <img src={"/images/content/info.svg"} alt={"icon"} />
          <span>
            {/* You can also trade */}
            <IntlMessages id="donate.warning" />
            USDC
            <IntlMessages id="donate.warning1" />
            {/* on CoinList */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Donate;
