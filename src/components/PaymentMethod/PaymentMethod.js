import React, { useEffect, useState } from "react";
import styles from "./PaymentMethod.module.sass";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { showPaymentModal } from "../../actions/AppActions"
import { getWalletGroups, getWalletInfo } from "../../services/WalletService"
import Icon from "../../components/Icon";
import cn from "classnames";
import { toLower } from "lodash";
import { getDisplayAddress } from "../../constants/Utils"
import IntlMessages from "../../i18n/IntlMessages";

const PaymentMethod = ({ handleClickMoonPay, onCancel }) => {
  const history = useHistory()
  const [payment, setPayment] = useState()
  const [step, setStep] = useState(1)
  const [selectedWallet, setSelectedWallet] = useState()
  const [selectedWalletAddress, setSelectedWalletAddress] = useState()
  const [walletGroup, setWalletGroup] = useState([])
  const [walletAddress, setWalletAddress] = useState({})
  const [currentWalletGroup, setCurrentWalletGroup] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    loadWalletGroup()
  }, [])

  const loadWalletGroup = () => {
    getWalletGroups().then((res) => {
      setWalletGroup(res)

      res?.forEach(walletGroup => {
        walletGroup?.list_wallet_base.forEach(walletBase => {
          loadWalletInfo(walletBase?.id)
        })
      });

    }).catch(ex => {
      console.error("getWalletGroups ", ex);
    })
  }

  const getKeyWallet = (walletType, walletName) => {
    return walletType + "_" + walletName
  }

  const loadWalletInfo = (walletBaseId) => {
    getWalletInfo(walletBaseId).then((res) => {
      if (toLower(res?.wallet_base?.wallet_name) === "listenusd") {
        const walletKey = getKeyWallet(res?.wallet_base?.wallet_type, res?.wallet_base?.wallet_name)
        walletAddress[walletKey] = res?.wallet_address
        setWalletAddress(walletAddress)
      } else {
        const walletKey = getKeyWallet(res?.wallet_base?.wallet_type, res?.wallet_base?.wallet_name)
        walletAddress[walletKey] = res?.wallet_address
        setWalletAddress(walletAddress)
      }
    }).catch(ex => {
      console.error(ex);
    })
  }

  const onClickDeposit = () => {
    if (payment === PAYMENT.MOON_PAY) {
      handleClickMoonPay(selectedWalletAddress)
    } else {
      history.push(`/deposit/${selectedWallet?.id}`)
      dispatch(showPaymentModal({ isShow: false }))
    }
  }

  const PAYMENT = {
    MOON_PAY: "MOON_PAY",
    CRYPTO: "CRYPTO",
  }

  const onSelectedWallet = (walletBase, address) => {
    setSelectedWallet(walletBase)
    setSelectedWalletAddress(address)
  }

  const onSelectPayment = (payment) => {
      setPayment(payment)
      setStep(2)
  }

  const onClickBack = () => {
    setStep(1)
  }

  const showWalletBase = (walletGroup) => {
    setCurrentWalletGroup(walletGroup)
  };

  const copyAddress = (value) => {
    navigator.clipboard.writeText(value);
  }

  return (
    <div>
      {step == 1 &&
        <div>
          <div className={styles.PayContentTitle}>
            <h2 className={styles.PayTitle}><IntlMessages id="payment.method.title" /></h2>
            <div className={styles.Paydes}>
              <IntlMessages id="payment.method.message" />
            </div>
          </div>
          <div className={styles.PayContainer}>
            <div className={styles.PayContainerContent}>
              <div className={[styles.PayContainerItem, payment === PAYMENT.MOON_PAY ? styles.Selected : ""].join(" ")}
                onClick={() => onSelectPayment(PAYMENT.MOON_PAY)} >
                <img src="/images/moon.svg" className={styles.PayContainerItemImg}></img>
                <div className={styles.ContentNameContainer}>
                  <div className={styles.PayContainerItemText}><IntlMessages id="moonpay" /></div>
                  <div className={styles.ChainSupport}>24 <IntlMessages id="chains.supported" /></div>
                </div>
                <img src={payment === PAYMENT.MOON_PAY ? "/images/icon_arrow_selected.svg" : "/images/icon_arrow.svg"} className={styles.PayContainerItemImg}></img>
              </div>
              <div className={[styles.PayContainerItem, payment === PAYMENT.CRYPTO ? styles.Selected : ""].join(" ")}
                onClick={() => onSelectPayment(PAYMENT.CRYPTO)} >
                <img src="/images/Crypto.svg" className={styles.PayContainerItemImg}></img>
                <div className={styles.ContentNameContainer}>
                  <div className={styles.PayContainerItemText}><IntlMessages id="crypto" /></div>
                  <div className={styles.ChainSupport}>24 <IntlMessages id="chains.supported" /></div>
                </div>
                <img src={payment === PAYMENT.CRYPTO? "/images/icon_arrow_selected.svg" : "/images/icon_arrow.svg"} className={styles.PayContainerItemImg}></img>
              </div>
            </div>
            <div className={styles.CancelBtn} onClick={() => onCancel()}>
              <button onClick={() => onCancel()}><IntlMessages id="cancel" /></button>
            </div>
          </div>
        </div>
      }
      {step == 2 &&
        <div>
          <div className={styles.PayContentTitle}>
            <div className={styles.Header}>
              <h2 className={styles.TitleSelectWallet}><IntlMessages id="payment.select.wallet.title" /></h2>
              <img src="/images/icon_back.svg" className={styles.BackBtn} onClick={onClickBack}></img>
            </div>

            <div className={styles.Paydes}>
              <IntlMessages id="payment.select.wallet.message" />
              </div>
          </div>
          <div className={styles.walletGroupContainer}>
            <div className={styles.listGroup}>
              {walletGroup &&
                walletGroup?.map((group, index) => {
                  return (
                    <div className={styles.group} key={index}>
                      <div
                        className={styles.label}
                        onClick={() => showWalletBase(group)}
                      >
                        <span>{group?.wallet_group_name}</span>
                        <Icon name="arrow-bottom" size="10" />
                      </div>
                      <div
                        className={cn(
                          currentWalletGroup?.id === group?.id
                            ? styles.expandListCoin
                            : "",
                          styles.listCoin
                        )}
                      >
                        {group?.list_wallet_base &&
                          group?.list_wallet_base.map((base, index) => {
                            return (
                              <div
                                className={styles.coinItem}
                                key={index}
                                onClick={() => onSelectedWallet(base, walletAddress[getKeyWallet(base?.wallet_type, base?.wallet_name)])}
                              >
                                <img
                                  className={styles.imgWallet}
                                  src={base?.wallet_image}
                                  alt="base-image"
                                />
                                <div className={styles.walletInfo}>
                                  <div className={styles.walletName}>{base?.wallet_name}</div>
                                  <div className={styles.addressContainer}>
                                    <div className={styles.walletAddress}>{getDisplayAddress(walletAddress[getKeyWallet(base?.wallet_type, base?.wallet_name)])}</div>
                                    <div onClick={() => copyAddress(walletAddress[getKeyWallet(base?.wallet_type, base?.wallet_name)])}>
                                      <img
                                        className={styles.styleCopy}
                                        src="/images/content/iconCopy.svg"
                                        alt="Icon"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {selectedWallet?.id === base?.id &&
                                  <img
                                    src="/images/content/icon_check.svg"
                                    alt="icon_check"
                                  />
                                }
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>


            <div className={styles.PayBtn}>
              <button className={styles.PayBtn} onClick={onClickDeposit}><IntlMessages id="apply" /></button>
            </div>
            <div className={styles.CancelBtn}  onClick={() => onCancel()}>
              <button onClick={() => onCancel()}><IntlMessages id="cancel" /></button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PaymentMethod;
