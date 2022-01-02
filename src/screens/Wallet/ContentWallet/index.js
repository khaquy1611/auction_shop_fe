import React, { useMemo } from "react";
import styles from "../Wallet.module.sass";
import AddressCopy from "../AddressCopy";
import IntlMessages from "../../../i18n/IntlMessages";
import Balance from "../Balance";
import cn from "classnames";
import BottomDescription from "../BottomDescription";
function ContentWallet(props) {
  const {
    currentWalletBase,
    currentWalletInfo,
    goToWithDraw,
    goToDeposit,
    dataTransaction,
  } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div className={styles.row}>
          <div className={styles.currency}>
            <AddressCopy
              currentWalletBase={currentWalletBase}
              currentWalletInfo={currentWalletInfo}
            />
          </div>
          <div className={styles.action}>
            <a
              className={cn("button button-stroke", styles.button)}
              onClick={goToWithDraw}
            >
              <IntlMessages id="wallet.withdraw" />
            </a>
            <a className={cn("button", styles.button)} onClick={goToDeposit}>
              <IntlMessages id="wallet.deposit" />
            </a>
          </div>
        </div>
        <div className={styles.infor}>
          <Balance
            currentWalletInfo={currentWalletInfo}
            currentWalletBase={currentWalletBase}
          />
        </div>
      </div>
      <BottomDescription dataTransaction={dataTransaction} />
    </div>
  );
}

export default ContentWallet;
