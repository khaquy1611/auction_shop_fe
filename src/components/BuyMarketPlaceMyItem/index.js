import cn from "classnames";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { customGetBalance } from "../../apiContract/listenUSD";
import IntlMessages from "../../i18n/IntlMessages";
import { getWalletBase } from "../../services/WalletService";
import PleaceBidCollection from "../PleaceBidCollection/index";
import styles from "./BuyMarketPlace.module.sass";
import useHanlejobID from "../../hooks/useHandleJobID";
import { purchaseListing } from "../../services/MarketPlace";
import { handleCheckJobId } from "../../services/jobsId";
import { numberWithCharacter } from "../../constants/Utils";

const BuyMarketPlace = (props) => {
  const { className, data, onCancel, callData } = props;
  const [bidNumber, setBidNumber] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [checkDisable, setCheckDisable] = useState(false);
  const [serviceFree, setServiceFree] = useState("");
  const [discount, setdiscount] = useState("");
  const [total, setTotal] = useState("");
  const [balance, setBalance] = useState();
  const [addressFlow, setaddressFlow] = useState();
  const firstNum = data?.salePrice;
  const user = useSelector((state) => state.app.user);
  const history = useHistory();
  const { handleCheckSetupJobs } = useHanlejobID();
  //   var nf = Intl.NumberFormat();

  const [resBalance, setResBalance] = useState();

  //   console.log(numberWithCharacter(balance));

  const handleCustomGetBalance = (addressFlow) => {
    customGetBalance(addressFlow).then((res) => {
      setBalance(res);
    });
    setBidNumber(parseFloat(firstNum)?.toFixed(2));
  };

  const checkWalletbase = (res) => {
    const getFlow = _.find(res, { wallet_base: { wallet_type: "FLOW" } });
    setaddressFlow(getFlow?.wallet_address);
    if (getFlow) {
      handleCustomGetBalance(getFlow?.wallet_address);
    }
  };

  useEffect(() => {
    checkWalletbase(resBalance);
  }, [resBalance]);

  useEffect(() => {
    getWalletBase().then((res) => {
      setResBalance(res);
    });
  }, []);

  const handleCheckRealJobs = (value) => {
    handleCheckJobId(value).then((res) => {
      if (res?.status === "Error") {
        toast.error("Not enough !");
      }
      if (res?.status === "Accepted") {
        //
        toast.warning("Please wait");
        const interval = setInterval(() => {
          handleCheckJobId(value).then((res) => {
            if (res.status === "Complete") {
              clearInterval(interval);
              cancelBid();
              callData();
              toast.success("Buy successful");
            }
            if (res.status === "Error") {
              clearInterval(interval);
              callData();
              toast.error(res.error);
              cancelBid();
            }
          });
        }, 3000);
        //
        setTimeout(() => {
          clearInterval(interval);
        }, 30000);
      }
      if (value?.status === "Complete") {
        toast.success("Buy successful");
      }
    });
  };

  const handleBuy = () => {
    const payload = {
      address: process.env.LISTEN_MARKET_PLACE,
      idItem: parseInt(data?.item),
    };
    setCheckDisable(true);
    if (parseFloat(balance) < parseFloat(bidNumber)) {
      toast.error("Not enough");
    } else {
      purchaseListing(payload).then((res) => {
        handleCheckRealJobs(res.jobId);
      });
    }
  };

  const cancelBid = () => {
    onCancel();
  };

  const handleInput = (e) => {
    const value = parseFloat(e.target.value || 0);
    setNumberInput(value);
    setServiceFree((value / 100) * 5);
    setdiscount((value / 100) * 10);
    setTotal(value + (value / 100) * 5 + (value / 100) * 10);
  };
  return (
    <>
      <div className={cn(className, styles.checkout)}>
        <div className={cn("h4", styles.title)}>
          <IntlMessages id="marketplace.title" />
        </div>
        <div className={styles.info}>
          <IntlMessages id="item.placeMart.description" />{" "}
          <strong>{data?.nft?.title || data?.nft?.name}</strong>{" "}
          <IntlMessages id="item.placeBid.from" />
          <strong> {data?.nft?.creator || "LISTEN"}</strong>
        </div>
        <div className={styles.stage}>
          <IntlMessages id="item.placeMart.yourBuy" />
        </div>
        <div className={styles.table}>
          {/* <div className={styles.row}>
              <div className={styles.col}>
                <FormattedMessage
                  id="item.placeBid.enterBid"
                  defaultMessage="Enter bid"
                >
                  {(placeholder) => (
                    <input
                      style={{
                        width: "100%",
                        height: 35,
                        borderRadius: 6,
                        border: "none",
                        background: "none",
                        marginTop: -20,
                        color: "#777E90",
                        fontSize: 15,
                      }}
                      placeholder={bidNumber}
                      value={numberInput}
                      onChange={(event) => handleInput(event)}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className={styles.col}>USD</div>
            </div> */}
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.yourBalance" />
            </div>
            <div className={styles.col}>
              {balance ? numberWithCharacter(balance) : ""} USD
              {/* {balance ? nf.format(balance) : ""} USD */}
            </div>
          </div>
          {/* <div className={styles.row}>
              <div className={styles.col}>
                <IntlMessages id="item.placeBid.serviceFee" />
              </div>
              <div className={styles.col}>{serviceFree || 0} USD</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <IntlMessages id="item.placeBid.discount" />
              </div>
              <div className={styles.col}>{discount || 0} USD</div>
            </div> */}
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.itemPrice" />
              {/* Item price */}
            </div>
            <div className={styles.col}>
              {data?.mpItem?.salePrice ? numberWithCharacter(data?.mpItem?.salePrice) : ""} USD
              {/* {nf.format(bidNumber)} */}
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className={cn("button", styles.button)}
            disabled={checkDisable}
            onClick={handleBuy}
          >
            <IntlMessages id="marketplace.title" />
            {/* Buy */}
          </button>
          <button
            className={cn("button-stroke", styles.button)}
            onClick={cancelBid}
          >
            <IntlMessages id="item.placeBid.cancel" />
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ app }) => ({
  user: app.user,
});

export default connect(mapStateToProps)(React.memo(BuyMarketPlace));
