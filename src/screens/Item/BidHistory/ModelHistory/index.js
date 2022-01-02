import React from "react";
import styles from "./ModalHistory.module.sass";
import { BidHistory } from "../index";
import IntlMessages from "../../../../i18n/IntlMessages";

function TransactionDetail(props) {
  const { dataUser } = props;
  return (
    <div>
      <h1>
        <IntlMessages id="bidHistory.transactionDetail" />
      </h1>
      {dataUser.map((item, index) => (
        <BidHistory bidder={item} key={index} />
      ))}
      </div>
  );
}

export default TransactionDetail;
