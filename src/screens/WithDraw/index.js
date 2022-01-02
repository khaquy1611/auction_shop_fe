import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import IntlMessages from "../../i18n/IntlMessages";
import styles from "./WithDraw.module.sass";
import CheckPassword from "../../components/CheckPassword";
import { useParams } from "react-router";
import { getWalletInfo, getWalletGroups } from "../../services/WalletService";
import { useHistory } from "react-router";
import { validateInputAddresses } from "../../constants/Utils";
import Modal from "../../components/Modal/index";
import InputNumberic from "../../components/InputNumberic";
import { getListCurrency } from "../../services/CurrencyService";
import {
  languages,
  listCurrency,
  config,
  breadcrumbs,
} from "../../constants/constants";
import * as _ from "lodash";
import Dropdown from "../../components/Dropdown/index";
import queryString from "query-string";
const WithDraw = () => {
  const [visibleModalTransfer, setVisibleModalTransfer] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [addressCode, setAddressCode] = useState();
  const [valueInput, setValueInput] = useState(0);
  const [network, setNetwork] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [textErrorAmount, setTextErrorAmount] = useState("");
  const [textError, setTextError] = useState("");
  const [visiable, setVisiable] = useState({
    idGr: 0,
    idPosition: 0,
  });
  useEffect(() => {
    getWalletInfo(id).then((res) => {
      getWalletGroups().then((resGr) => {
        setVisiable({
          idGr: _.findIndex(resGr, { id: res?.wallet_base?.wallet_group_id }),
          idPosition: _.findIndex(resGr, {
            id: res?.wallet_base?.order_position,
          }),
        });
      });
      setAddressCode(res);
    });
    getListCurrency().then((res) => {
      console.log("res", res?.data);
    });
  }, [id]);
  const handleSubmitWithDraw = () => {
    if (
      validateInputAddresses(valueAddress) &&
      parseFloat(valueInput) <= parseFloat(addressCode?.balance) &&
      parseFloat(valueInput) > 0
    ) {
      setVisibleModalTransfer(true);
      setTextError("");
      setTextErrorAmount("");
    } else {
      if (validateInputAddresses(valueAddress) === false) {
        setTextError("Please enter address again");
      } else {
        setTextError("");
      }
      if (
        parseFloat(valueInput) > parseFloat(addressCode?.balance) ||
        parseFloat(valueInput) === 0
      ) {
        setTextErrorAmount("Please enter amount again");
      }
    }
  };

  const handleMax = () => {
    setValueInput(addressCode?.balance);
  };
  const handleOnChangeAmount = (value) => {
    setValueInput(value);
  };
  const onChangeAddress = (event) => {
    setValueAddress(event.target.value);
  };
  const changeNetwork = (value) => {
    setNetwork(value);
  };

  return (
    <div className={cn("section-pt80 withdraw", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link
            className={cn("button-stroke", styles.button)}
            to={`/my-wallet/${queryString.stringify(visiable)}`}
          >
            <Icon name="arrow-prev" size="14" fill="#777E90" />
            <span>
              {" "}
              <IntlMessages id="deposit.backToWallet" />
            </span>
          </Link>
          {/* <div className={styles.breadcrumb}>
            <ul>
              <li>
                <p>
                  <IntlMessages id="withdraw.wallet" />
                </p>
                <Icon name="arrow-bottom" size="10" />
              </li>
              <li>
                <Link className={styles.button} to="/wallet">
                  <span>
                    <IntlMessages id="withdraw" />
                  </span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.field}>
              <div className={styles.label}>
                <label>
                  <IntlMessages id="withdraw.label.Amount" />
                </label>
              </div>
              <div className={cn(styles.bgInput, styles.input)}>
                <p
                  className={styles.walletImageText}
                  style={{
                    backgroundImage: `url(${addressCode?.wallet_base?.wallet_image})`,
                  }}
                >
                  <span>
                    {/* USDC 1,000 {addressCode && addressCode} */}
                    {addressCode && addressCode?.wallet_base?.wallet_name}&ensp;
                    {`(${addressCode?.wallet_base?.wallet_type})`}&emsp;
                    {addressCode?.wallet_address || ""}
                  </span>
                  {/* <span className={styles.orangeText}>
                    <IntlMessages id="withdraw.max" />
                  </span> */}
                </p>
              </div>
            </div>
            <div className={styles.field}>
              <h2 className={styles.textNetwork}>
                <IntlMessages id="withdraw.Network" />
              </h2>
              <Dropdown
                className={styles.dropdown}
                value={network}
                setValue={(network) => changeNetwork(network)}
                options={[addressCode?.wallet_base?.wallet_type]}
              />
            </div>
            {/* <div className={styles.field}>
              <div className={styles.label}>
                <label>
                  <IntlMessages id="withdraw.send" />
                </label>
              </div>
              <div className={cn(styles.bgInput, styles.input)}>
                <p
                  style={{
                    backgroundImage: `url(${addressCode?.wallet_base?.wallet_image})`,
                    maxWidth: 500,
                  }}
                >
                  <span>
                    {addressCode && addressCode?.wallet_base?.wallet_name}&ensp;
                    {`(${addressCode?.wallet_base?.wallet_type})`}&emsp;
                    {addressCode?.wallet_address || ""}
                  </span>
                </p>
              </div>
            </div> */}
            <div className={styles.field}>
              <div className={styles.label}>
                <label>
                  <IntlMessages id="withdraw.recipientAddress" />
                </label>
                {/* <Link to={"/"}>
                  <span>
                    <IntlMessages id="withdraw.manageAddress" />
                  </span>
                  <img
                    src="/images/content/arrowExpand.svg"
                    alt="arrow-expand"
                  />
                </Link> */}
              </div>
              <div className={styles.input}>
                <input
                  type={"text"}
                  onChange={onChangeAddress}
                  placeholder="Input address"
                />
              </div>
              <i className={styles.textErorI}>{textError}</i>
            </div>
            {/* <div className={styles.field}>
              <div className={styles.label}>
                <label>
                  <IntlMessages id="withdraw.recipientAddress" />
                </label>
                
              </div>
              <div className={styles.input}>
                <input
                  type={"text"}
                  onChange={onChangeAddress}
                  placeholder="0x...."
                />
              </div>
              <i
                style={{
                  fontSize: 12,
                  color: "red",
                  marginTop: 5,
                  fontWeight: 200,
                }}
              >
                {textError}
              </i>
            </div> */}
            {/* <div className={styles.note}>
              <span>
                <IntlMessages id="withdraw.manageAddress.description" />
              </span>
            </div> */}
            <div className={cn(styles.last, styles.field)}>
              <div className={styles.label}>
                <label>
                  <IntlMessages id="withdraw.amount" />:
                  <IntlMessages id="withdraw.MAX" />(
                  {addressCode?.balance
                    ? parseFloat(addressCode.balance)?.toFixed(2)
                    : 0}
                  )
                </label>
              </div>
              <div className={styles.inputMax}>
                <InputNumberic
                  value={valueInput}
                  onChange={handleOnChangeAmount}
                />
                <button className={styles.inputMaxBtn} onClick={handleMax}>
                  <IntlMessages id="withdraw.MAX" />
                </button>
              </div>
              <i className={styles.textErorI}>{textErrorAmount}</i>
            </div>

            {/* <div className={styles.note}>
              <span>
                <IntlMessages id="withdraw.amount.description" />
              </span>
            </div> */}
            <div className={styles.btns}>
              <button
                className={cn("button", styles.button)}
                onClick={handleSubmitWithDraw}
              >
                <IntlMessages id="withdraw.withdraw" />
                {/* Withdraw */}
              </button>
            </div>
            {/* <div className={styles.warning}>
              <img src={"/images/content/info.svg"} alt={"icon"} />
              <span>
                <IntlMessages id="withdraw.warn" />
              </span>
            </div> */}

            <div className={styles.TipWithraw}>
              <div className={styles.TipWithrawContainer}>
                <div className={styles.TipWithrawTitle}>
                  <IntlMessages id="withdraw.tip.title" />
                </div>
                <div className={styles.TipWithrawTitleText}>
                  <IntlMessages id="withdraw.tip.text" />: 100/100BTC
                </div>
                <div className={styles.TipWithrawTitleText}>
                  <IntlMessages id="withdraw.tip.title.text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={visibleModalTransfer}
        onClose={() => setVisibleModalTransfer(false)}
      >
        <CheckPassword valueAddress={valueAddress} valueInput={valueInput} />
      </Modal>
    </div>
  );
};

export default WithDraw;
