import React, { useState } from "react";
import queryString from "query-string";
import { createMoonPayTransaction } from "../../services/WalletService";
import styles from "./MoonPayResult.module.sass";
import IntlMessages from "../../i18n/IntlMessages";
import { useHistory } from "react-router-dom";
const MoonPayResult = (props) => {
  const [params] = useState(queryString.parse(window.location.search));
  let history = useHistory();
  const saveTransaction = () => {
    createMoonPayTransaction(
      params.transactionId,
      params.transactionStatus
    ).then((res) => {
      history.push("/wallet");
    });
  };

  saveTransaction();

  return (
    <div className={styles.wapper}>
      <img src="/images/content/loadingIcon.svg" alt="Icon Loading" />
      <h1 className={styles.titleLoading}>
        <IntlMessages id="moon.pay.result.title.loading" />
      </h1>
      <h4>
        <IntlMessages id="moon.pay.result.title.content" />
      </h4>
    </div>
  );
};

export default MoonPayResult;
