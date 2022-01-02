import React from "react";
import cn from "classnames";
import styles from "./Checkout.module.sass";
import Icon from "../../../../components/Icon";
import LoaderCircle from "../../../../components/LoaderCircle";
import IntlMessages from "../../../../i18n/IntlMessages";

const items = [
  {
    title: "2,800",
    value: "USD",
  },
  {
    title: "Your balance",
    value: "8,498 USD",
  },
  {
    title: "Service fee (1%)",
    value: "28 USD",
  },
  {
    title: "Discount (5%)",
    value: "250 USD",
  },
  {
    title: "Tax (5%)",
    value: "140 USD",
  },
  {
    title: "You will pay",
    value: "2,800 USD",
  },
];

const Checkout = ({ className }) => {
  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="checkout.title" />
        {/* Checkout */}
      </div>
      <div className={styles.info}>
        <IntlMessages id="checkout.info" />
        {/* You are about to purchase  */}
        <strong>MYNFT</strong>
        <IntlMessages id="checkout.from" />
        {/* from */}
        <strong>Listen</strong>
      </div>
      <div className={styles.table}>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>{x.title}</div>
            <div className={styles.col}>{x.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.attention}>
        <div className={styles.preview}>
          <Icon name="info-circle" size="32" />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>
            <IntlMessages id="checkout.subtitle" />
            {/* This creator is not verified */}
          </div>
          <div className={styles.text}>
            <IntlMessages id="checkout.text" />
            {/* Purchase this item at your own risk */}
          </div>
        </div>
      </div>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="checkout.title1" />
        {/* Follow steps */}
      </div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <LoaderCircle className={styles.loader} />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>
            <IntlMessages id="checkout.subtitle1" />
            {/* Purchasing */}
          </div>
          <div className={styles.text}>
            <IntlMessages id="checkout.text1" />
            {/* Sending transaction with your wallet */}
          </div>
        </div>
      </div>
      <div className={styles.attention}>
        <div className={styles.preview}>
          <Icon name="info-circle" size="32" />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>
            <IntlMessages id="checkout.subtitle" />
            {/* This creator is not verified */}
          </div>
          <div className={styles.text}>
            <IntlMessages id="checkout.text" />
            {/* Purchase this item at your own risk */}
          </div>
        </div>
        <div className={styles.avatar}>
          <img src="/images/content/avatar-3.jpg" alt="Avatar" />
        </div>
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <IntlMessages id="checkout.btn" />
          {/* I understand, continue */}
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="checkout.btn1" />
          {/* Cancel */}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
