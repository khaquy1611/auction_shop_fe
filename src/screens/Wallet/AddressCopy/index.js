import React, { useState } from "react";
import styles from "./AddressCopy.module.sass";

function AddressCopy(props) {
  const { currentWalletBase, currentWalletInfo } = props;
  const [checkCopy, setCheckCopy] = useState("");
  const copyAddress = (value) => {
    navigator.clipboard.writeText(value);
    setCheckCopy(value);
  };
  return (
    <div className={styles.link}>
      <div className={styles.wallet_address}>
        <img
          src={currentWalletBase?.wallet_image}
          width="30px"
          height="30px"
          alt={currentWalletBase?.wallet_image}
        />
      </div>
      <div>
        <div>{currentWalletBase?.wallet_name}</div>
        {currentWalletInfo?.wallet_address && (
          <div className={styles.wrapperAddress}>
            <h5 className={styles.styleAddress}>
              {currentWalletInfo?.wallet_base?.wallet_type !== "FLOW"
                ? `${currentWalletInfo?.wallet_address?.substring(
                    0,
                    5
                  )}...${currentWalletInfo?.wallet_address?.substring(
                    currentWalletInfo
                      ? currentWalletInfo?.wallet_address?.length - 5
                      : 0,
                    currentWalletInfo
                      ? currentWalletInfo?.wallet_address?.length
                      : 1
                  )}`
                : currentWalletInfo?.wallet_address}
            </h5>
            <div
              onClick={() => copyAddress(currentWalletInfo?.wallet_address)}
              className={styles.styleCopyContainer}
            >
              <img
                className={styles.styleCopy}
                src="/images/content/iconCopy.svg"
                alt="Icon"
              />
              {checkCopy ? (
                <div>
                  <div className={styles.styleCheck}>Copied</div>
                </div>
              ) : (
                <div>
                  <div className={styles.styleCheck}>Copy to clipboard</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AddressCopy;
