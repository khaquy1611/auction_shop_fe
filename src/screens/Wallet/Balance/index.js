import React from "react";
import styles from "../Wallet.module.sass";
import IntlMessages from "../../../i18n/IntlMessages";

function Balance(props) {
  const { currentWalletInfo, currentWalletBase } = props;
  return (
    <>
      <div className={styles.property}>
        <span className={styles.label}>
          <IntlMessages id="wallet.availableBalance" />
        </span>
        <strong className={styles.value}>
          {currentWalletInfo?.balance ? parseFloat(currentWalletInfo?.balance)?.toFixed(2) : '0.00'}
          {" "}
          {currentWalletBase?.wallet_name}
        </strong>
      </div>
      {/* <div className={styles.property}>
        <span className={styles.label}>
          <IntlMessages id="wallet.pending" />
        </span>
        <strong className={styles.value}>
          {currentWalletInfo?.balance_pending}
        </strong>
      </div> */}
    </>
  );
}

export default Balance;
