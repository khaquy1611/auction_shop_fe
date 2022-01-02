import React, { useEffect, useMemo, useState } from "react";
import styles from "./Flow.module.sass";
import AddressCopy from "../AddressCopy";
import IntlMessages from "../../../i18n/IntlMessages";
import cn from "classnames";
import SaveAddress from "../../../components/SaveAddress";
import Modal from "../../../components/Modal";
import BottomDescription from "../BottomDescription";
import { getWalletInfo } from "../../../services/WalletService";

const paramBSC = {
  chainId: "0x38",
  chainName: "Binance Smart",
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  nativeCurrency: {
    name: "Binance BSC",
    symbol: "BSC",
    decimals: 18,
  },
};

function Flow(props) {
  const { currentWalletBase, setVisibleModalBid, dataTransaction } = props;
  const [visibleModalTransfer, setVisibleModalTransfer] = useState(false);
  const [addressMetaMask, setAddresMetamask] = useState("");
  const [currentWalletInfo, setCurrentWalletInfo] = useState(null);

  useEffect(() => {
    getWalletInfo(currentWalletBase?.id).then((res) => {
      setCurrentWalletInfo(res);
    });
  }, [currentWalletBase]);

  const handleGetWalletInfo = () => {
    getWalletInfo(currentWalletBase?.id)
      .then((res) => {
        setCurrentWalletInfo(res);
      })
      .catch((errorMessage) => {
        console.log("errorRes", errorMessage);
      });
  };

  const connectBSC = async () => {
    const { ethereum } = window;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xf00" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [paramBSC],
          });
          getAddressBSC();
        } catch (addError) {}
      }
    }
  };
  const getAddressBSC = async () => {
    const { ethereum } = window;
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const paramSend = {};
      paramSend.address = accounts[0];
      if (paramSend) {
        setAddresMetamask(paramSend);
      }
    } catch (switchError) {
      console.log("switchError", switchError);
    }
  };

  const connectMetaMaskLSTN = async () => {
    const { ethereum } = window;
    if (typeof ethereum === "undefined") {
      setVisibleModalBid(true);
    }
    if (typeof ethereum !== "undefined") {
      if (ethereum?.chainId !== paramBSC?.chainId) {
        connectBSC();
      } else {
        getAddressBSC();
      }
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.row}>
            <div  className={styles.wrapperCurrency}>
              <div className={styles.currency}>
                <AddressCopy
                  currentWalletBase={currentWalletBase}
                  currentWalletInfo={currentWalletInfo}
                />
              </div>
            </div>

            <div className={styles.action}>
              {addressMetaMask?.address && (
                <div className={styles.addressImg}>
                  <img
                    className={styles.iconStyless}
                    src="/images/content/metamask.svg"
                    alt="icon metaMask"
                  />
                  <div style={{ marginLeft: 8, alignSelf: "center" }}>
                    <div>MetaMask</div>
                    <h5 style={{ fontSize: 12 }}>
                      {addressMetaMask?.address?.length > 40 &&
                        `${addressMetaMask?.address?.substring(
                          0,
                          6
                        )}...${addressMetaMask?.address?.substring(
                          currentWalletInfo
                            ? addressMetaMask?.address?.length - 4
                            : 0,
                          currentWalletInfo
                            ? addressMetaMask?.address?.length
                            : 1
                        )}`}
                    </h5>
                  </div>
                </div>
              )}
              {currentWalletInfo?.Success === false &&
                (addressMetaMask?.length < 1 ? (
                  <a
                    className={cn("button", styles.button)}
                    href="javascript:;"
                    onClick={() => connectMetaMaskLSTN()}
                  >
                    <IntlMessages id="wallet.connectMetaMask" />
                  </a>
                ) : (
                  <a
                    className={cn("button", styles.button)}
                    href="javascript:;"
                    onClick={() => setVisibleModalTransfer(true)}
                  >
                    <IntlMessages id="wallet.digital.link" />
                  </a>
                ))}
            </div>
          </div>
          <div className={styles.infor}>
            <div className={styles.property}>
              <span className={styles.label}>
                <IntlMessages id="wallet.availableBalance" />
              </span>
              {currentWalletBase?.wallet_name === "LSTN" && (
                <>
                  <strong className={styles.value}>
                    {parseFloat(0).toFixed(2)}
                  </strong>{" "}
                  {currentWalletBase?.wallet_name}
                </>
              )}
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
        <Modal
          visible={visibleModalTransfer}
          onClose={() => setVisibleModalTransfer(false)}
        >
          <SaveAddress
            addressMetaMask={addressMetaMask}
            currentWalletBase={currentWalletBase}
            setVisibleModalTransfer={() => setVisibleModalTransfer(false)}
            handleGetWalletInfo={handleGetWalletInfo}
          />
        </Modal>
      </div>
    </>
  );
}

export default Flow;
