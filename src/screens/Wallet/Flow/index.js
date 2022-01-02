import React, { useEffect, useState } from "react";
import styles from "./Flow.module.sass";
import AddressCopy from "../AddressCopy";
import IntlMessages from "../../../i18n/IntlMessages";
import { getWalletInfo } from "../../../services/WalletService";
import { setFlow } from "../../../actions/AppActions";
import { useDispatch } from "react-redux";
import BottomDescription from "../BottomDescription";
import { numberWithCharacter } from "../../../constants/Utils";
import { toLower } from "lodash";
function Flow(props) {
  const {
    currentWalletBase,
    balanceListen,
    dataTransaction,
  } = props;
  const dispatch = useDispatch();
  const [currentWalletInfo, setCurrentWalletInfo] = useState();
  useEffect(() => {
    getWalletInfo(currentWalletBase?.id).then((res) => {
      setCurrentWalletInfo(res);
      dispatch(
        setFlow({
          addressFlow: res?.wallet_address,
        })
      );
    });
    //
  }, [currentWalletBase]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.row}>
            <div className={styles.currency}>
              <AddressCopy
                currentWalletBase={currentWalletBase}
                currentWalletInfo={currentWalletInfo}
              />
            </div>
          </div>
          <div className={styles.infor}>
            <div className={styles.property}>
              <span className={styles.label}>
                <IntlMessages id="wallet.availableBalance" />
              </span>
              <>
                <strong className={styles.value}>
                  {toLower(currentWalletBase?.wallet_name) === "listenusd"
                    ? numberWithCharacter(balanceListen)
                    : '0.00'}
                </strong>{" "}
                {currentWalletBase?.wallet_name}
              </>
            </div>
            {/* <div className={styles.property}>
              <span className={styles.label}>
                <IntlMessages id="wallet.pending" />
              </span>
              <strong className={styles.value}>
                {currentWalletInfo?.balance_pending}
              </strong>
            </div> */}
          </div>
        </div>
        <BottomDescription dataTransaction={dataTransaction} />
      </div>
    </>
  );
}

export default Flow;
