import React from "react";
import cn from "classnames";
import styles from "./Transfer.module.sass";
import IntlMessages from "../../i18n/IntlMessages";
import { createMetaMaskWallet } from "../../services/WalletService";
import { toast } from "react-toastify";
const SaveAddress = (props) => {
  const {
    currentWalletBase,
    addressMetaMask,
    setVisibleModalTransfer,
    handleGetWalletInfo,
  } = props;
  const getAddressBSC = async () => {
    if (addressMetaMask) {
      createMetaMaskWallet(currentWalletBase?.id, addressMetaMask).then(
        (res) => {
          toast.success("Link address successful");
          setVisibleModalTransfer();
          handleGetWalletInfo();
        }
      );
    }
  };
  return (
    <div className={styles.transfer}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="saveAddress.title" />
        {/* Link address */}
      </div>
      <div className={styles.text}>
        <IntlMessages id="saveAddress.text" />
        {/* Please link address */}
      </div>

      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={getAddressBSC}>
          <IntlMessages id="saveAddress.btn.link" />
          {/* Link  */}
          {/* Continue */}
        </button>
      </div>
    </div>
  );
};

export default SaveAddress;
