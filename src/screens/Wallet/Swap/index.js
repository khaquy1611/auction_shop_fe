import React, { useState, useEffect } from "react";
import styles from "./Swap.module.sass";
import DropdownWallet from "../../../components/DropdownWallet/DropdownwalletSwap";
import { toast } from "react-toastify";
import { handleCheckJobId } from "../../../services/jobsId";
import { transferWallet, burnLusd } from "../../../services/WalletService";
import { customGetBalance } from "../../../apiContract/listenUSD";
import { toLower, toNumber } from "lodash";
import IntlMessages from "../../../i18n/IntlMessages";
import InputNumberic from "../../../components/InputNumberic";
import { numberWithCharacter } from "../../../constants/Utils";

function SwapComponent(props) {
  const {
    handleSwap,
    visibleSwap,
    walletBaseConvert,
    onCanel,
    loadWalletInfo,
  } = props;
  const [dataOptions, setDataOptions] = useState();
  const [dataOptionsListen, setDataOptionsListen] = useState();
  const [amount, setAmount] = useState();
  const [valueOptionsListen, setValueOptionsListen] = useState();
  const [valueOptions, setValueOptions] = useState();
  const [balanceLinstenUSD, setBalanceLinstenUSD] = useState(0);
  const [textError, setTextError] = useState();

  useEffect(() => {
    const dataTemp = [];
    const dataTempListen = [];
    walletBaseConvert &&
      walletBaseConvert.map((item, index) => {
        if (
          toLower(item.wallet_base.wallet_type) === "erc20" ||
          toLower(item.wallet_base.wallet_type) === "bep20"
        ) {
          dataTemp.push({
            icon: item?.wallet_base?.wallet_image,
            label: item?.wallet_base?.wallet_name,
            value: item?.wallet_base?.id,
            text: item?.balance,
            type: item?.wallet_base?.wallet_type,
          });
        }
        //
        if (toLower(item.wallet_base.wallet_name) === "listenusd") {
          customGetBalance(item?.wallet_address).then((res) => {
            setBalanceLinstenUSD(res);
          });
          dataTempListen.push({
            icon: item?.wallet_base?.wallet_image,
            label: item?.wallet_base?.wallet_name,
            value: item?.wallet_base?.id,
            text: balanceLinstenUSD
              ? parseFloat(balanceLinstenUSD)?.toFixed(2)
              : "",
          });
        }
      });
    //
    setDataOptions(dataTemp);
    setValueOptions(dataTemp[0]);

    setDataOptionsListen(dataTempListen);
    setValueOptionsListen(dataTempListen[0]);
  }, [balanceLinstenUSD]);

  const handleCheckRealJobs = (value) => {
    handleCheckJobId(value).then((res) => {
      if (res?.status === "Error") {
        toast.error("Can't transfer !");
      }
      if (res?.status === "Accepted") {
        //
        toast.warning("Please wait");
        const interval = setInterval(() => {
          handleCheckJobId(value).then((res) => {
            if (res.status === "Complete") {
              clearInterval(interval);
              loadWalletInfo();
              toast.success("Success transfer");
              onCanel();
            }
          });
        }, 3000);
        //
        setTimeout(() => {
          clearInterval(interval);
        }, 15000);
      }
      if (value?.status === "Complete") {
        loadWalletInfo();
        toast.success("Success transfer");
      }
    });
  };

  const handeleValueSelected = (value) => {
    setValueOptions(value);
  };

  const onChangeAmount = (event) => {
    setAmount(event);
  };

  const handleClick = () => {
    const paramSend = {};
    paramSend.wallet_base_id = parseInt(valueOptions.value);
    paramSend.amount = parseFloat(amount);
    if (!visibleSwap && parseInt(valueOptions.text) >= parseInt(amount)) {
      setTextError("");
      transferWallet(parseInt(valueOptions.value), paramSend).then((res) => {
        handleCheckRealJobs(res.jobId);
      });
    } else if (visibleSwap && parseInt(balanceLinstenUSD) >= parseInt(amount)) {
      setTextError("");
      burnLusd(parseInt(valueOptions.value), paramSend).then((res) => {
        handleCheckRealJobs(res.jobId);
      });
    } else {
      setTextError("Please enter again");
    }
  };

  const handleMax = () => {
    if (!visibleSwap) {
      setAmount(valueOptions.text);
    } else {
      setAmount(parseFloat(balanceLinstenUSD));
    }
  };

  return (
    <>
      {visibleSwap ? (
        <div className={styles.swapTokenContainer}>
          <div className={styles.tokenInput}>
            <div className={styles.tokenItem}>
              <DropdownWallet
                options={dataOptionsListen}
                setValue={() => {}}
                value={valueOptionsListen}
              />
            </div>
            <div className={styles.InputContainer}>
              <InputNumberic onChange={onChangeAmount} value={amount} />
              <img
                className={styles.iconspa}
                src="/images/content/Ellipse 16.svg"
              />
              <div className={styles.textcolor} onClick={handleMax}>
                Max
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.swapTokenContainer}>
          <div className={styles.tokenInput}>
            <div className={styles.tokenItem}>
              <DropdownWallet
                options={dataOptions}
                setValue={handeleValueSelected}
                value={valueOptions}
              />
            </div>
            <div className={styles.InputContainer}>
              {/* <input
                className={styles.Input}
                type="text"
                name="lastname"
                placeholder="0.00"
                onChange={onChangeAmount}
                pattern="[+-]?\d+(?:[.,]\d+)?"
                required
               
              /> */}
              <InputNumberic onChange={onChangeAmount} value={amount} />
              <img
                className={styles.iconspa}
                src="/images/content/Ellipse 16.svg"
              />
              <div className={styles.textcolor} onClick={handleMax}>
                Max
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.buttonSwap}>
        <div className={styles.borderBtn}></div>
        <button onClick={() => handleSwap(!visibleSwap)}>
          <img
            className={styles.iconRefresh}
            src="/images/content/refresh1.svg"
          />
        </button>
        <div className={styles.borderBtn}></div>
      </div>
      {visibleSwap ? (
        <div className={styles.swapTokenContainer}>
          <div className={styles.tokenInput}>
            <div className={styles.tokenItem}>
              <DropdownWallet
                options={dataOptions}
                setValue={handeleValueSelected}
                value={valueOptions}
              />
            </div>
            <div className={styles.InputContainer}>
              <div className={styles.results}>
                {toNumber(amount) ? numberWithCharacter(amount) : 0}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.swapTokenContainer}>
          <div className={styles.tokenInput}>
            <div className={styles.tokenItem}>
              <DropdownWallet
                options={dataOptionsListen}
                setValue={() => {}}
                value={valueOptionsListen}
              />
            </div>
            <div className={styles.InputContainer}>
              <div className={styles.results}>
                {toNumber(amount) ? numberWithCharacter(amount) : 0}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.TextError}>{textError}</div>
      <button className={styles.Btn} onClick={handleClick}>
        <IntlMessages id="swap.btn" />
      </button>
    </>
  );
}

export default SwapComponent;
