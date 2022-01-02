import cn from "classnames";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { customGetBalance } from "../../apiContract/listenUSD";
import IntlMessages from "../../i18n/IntlMessages";
import { bidding } from "../../services/Auction";
import { handleCheckJobId } from "../../services/jobsId";
import { getWalletBase } from "../../services/WalletService";
import styles from "./Bid.module.sass";
import useHanlejobID from "../../hooks/useHandleJobID";
import InputNumberic from "../InputNumberic";
import { convertMoney } from "../../services/CurrencyService";
import { currencies } from "currencies.json";
import TitleImg from "./TitleImg";
import WarningComponent from "../WarningComponent";
import { showPaymentModal } from "../../actions/AppActions";
import { numberWithCharacter, valueWithCharacter } from "../../constants/Utils";
import { discountNFTs } from "../../services/NFT";
import { useBid } from "../../hooks/useBid";

const Bid = (props) => {
  const { className, data, onCancel, callData } = props;
  const [bidNumber, setBidNumber] = useState("");
  const [checkMoney, setCheckMoney] = useState(false);
  const [balance, setBalance] = useState();
  const [rate, setRate] = useState();
  const firstNum = parseInt(data?.bidStep) + parseInt(data?.currentBid);
  const cancelBid = () => {
    onCancel();
  };
  const {
    handleInput,
    handleAddMoney,
    handleUpdateProfile,
    numberInput,
    setCheckDisable,
    discount,
    serviceFree,
    tax,
    total,
    user,
  } = useBid({ dataItem: data, balance });
  const handleCustomGetBalance = (addressFlow) => {
    customGetBalance(addressFlow).then((res) => {
      const balanceUser = res;
      convertMoney(user?.currency ? user?.currency : "USD", res).then(
        (balance) => {
          const rate =
            parseFloat(balanceUser) / parseFloat(balance?.data?.to[0]?.mid);
          setRate(rate);
        }
      );
      setBalance(res);
    });
    setBidNumber(parseFloat(firstNum)?.toFixed(2));
  };
  const checkWalletbase = (res) => {
    const getFlow = _.find(res, { wallet_base: { wallet_type: "FLOW" } });
    if (getFlow) {
      handleCustomGetBalance(getFlow?.wallet_address);
    }
  };
  useEffect(() => {
    getWalletBase().then((res) => {
      checkWalletbase(res);
    });
  });
  useEffect(() => {
    if (user?.zipcode?.length > 1 && parseInt(balance) > 0) {
      setCheckMoney(true);
    }
  }, [balance]);
  // useEffect(() => {
  //   const paramsSend = {
  //     price: 60000,
  //   };
  //   // discountNFTs(paramsSend).then((res) => {
  //   //   setRateDiscount(res?.discount);
  //   // });
  //   // getWalletBase().then((res) => {
  //   //   checkWalletbase(res);
  //   // });
  //   if (parseInt(data?.currentBid) === 0) {
  //     setNumberInput(
  //       parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)
  //     );
  //     setServiceFree(
  //       ((parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)) / 100) *
  //         5
  //     );
  //     setdiscount(
  //       ((parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)) / 100) *
  //         rateDiscount
  //     );
  //     setTax(
  //       ((parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)) / 100) *
  //         user?.tax
  //     );
  //     setTotal(
  //       parseFloat(
  //         parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)
  //       ) +
  //         ((parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)) /
  //           100) *
  //           5 -
  //         ((parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)) /
  //           100) *
  //           rateDiscount +
  //         ((parseFloat(data?.startingPrice) + parseFloat(data?.bidStep)) /
  //           100) *
  //           user?.tax
  //     );
  //   } else {
  //     setNumberInput(parseFloat(data?.currentBid) + parseFloat(data?.bidStep));
  //     setServiceFree(
  //       ((parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) / 100) * 5
  //     );
  //     setdiscount(
  //       ((parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) / 100) *
  //         rateDiscount
  //     );
  //     setTax(
  //       ((parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) / 100) *
  //         user?.tax
  //     );
  //     setTotal(
  //       parseFloat(parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) +
  //         ((parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) / 100) *
  //           5 -
  //         ((parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) / 100) *
  //           rateDiscount +
  //         ((parseFloat(data?.currentBid) + parseFloat(data?.bidStep)) / 100) *
  //           user?.tax
  //     );
  //   }
  // }, [rateDiscount]);

  // useEffect(() => {
  //   if (user?.zipcode?.length > 1 && parseInt(balance) > 0) {
  //     setCheckMoney(true);
  //   }
  // }, [balance]);

  // const handleInput = (value) => {
  //   setNumberInput(value);
  //   setServiceFree((parseFloat(value) / 100) * 5);
  //   setdiscount((parseFloat(value) / 100) * rateDiscount);
  //   setTax((parseFloat(value) / 100) * user?.tax);
  //   setTotal(
  //     parseFloat(parseFloat(value)) +
  //       (parseFloat(value) / 100) * 5 -
  //       (parseFloat(value) / 100) * rateDiscount +
  //       (parseFloat(value) / 100) * user?.tax
  //   );
  // };
  // const handleAddMoney = () => {
  //   const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  //   dispatch(showPaymentModal({ isShow: true, walletAddress }));
  // };

  // const handleUpdateProfile = () => {
  //   window.location.replace("/my-profile");
  // };

  const handleCheckRealJobs = (value) => {
    handleCheckJobId(value).then((res) => {
      if (res?.status === "Error") {
        cancelBid();
        callData();
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
              toast.success("Transaction successful");
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
        toast.success("Transaction successful");
      }
    });
  };

  const bid = () => {
    const payload = {
      auctionId: parseInt(data?.auctionID),
      amount: total?.toFixed(2),
    };
    if (parseFloat(total) < parseFloat(firstNum)) {
      setCheckDisable(false);
      toast.error("Please enter price again");
    } else {
      bidding(payload).then((res) => {
        handleCheckRealJobs(res.jobId);
      });
    }
  };
  console.log('data?.auctionID',data?.auctionID)
  return (
    <>
      <div className={cn(className, styles.checkout)}>
        <div className={styles.TitleContainer}>
          <div className={cn("h4")}>
            <IntlMessages id="item.placeBid.title" />
          </div>
          <div className={styles.YourBalanece}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.yourBalance" />
            </div>
            <div className={styles.col}>
              $ {balance ? numberWithCharacter(balance) : "0.00"}
            </div>
          </div>
        </div>
        <div className={styles.TitleImgContainer}>
          <div className={styles.TitleImg}>
            <TitleImg data={data} />
          </div>
          <div className={styles.ContainerImgTitle}>
            <div className={styles.TitleImgTitle}>
              {data?.nftCollection[0]?.name}
            </div>
            <div className={styles.TitleImgDes}>
              {data?.nftCollection[0]?.edition}{" "}
              <IntlMessages id="item.placeBid.edition" />
              {/* edition */}
            </div>
          </div>
        </div>
        {/* <div className={styles.info}>
          <IntlMessages id="item.placeBid.description" />{" "}
          <strong>{data?.title || data?.nftCollection[0]?.name}</strong>{" "}
          <IntlMessages id="item.placeBid.from" />
          <strong> {data?.creator || "LISTEN"}</strong>
        </div> */}
        <div className={styles.BidEnterText}>
          {/* Enter bid */}
          <IntlMessages id="item.placeBid.enterBid" />
        </div>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputNumberic onChange={handleInput} value={numberInput} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.serviceFee" />
              &nbsp;(5%)
            </div>
            <div className={styles.col}>
              $&nbsp;
              {serviceFree ? numberWithCharacter(serviceFree) : "" || 0}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.discount" />
              &nbsp;(10%)
            </div>
            <div className={styles.col}>
              $&nbsp;
              {discount ? numberWithCharacter(discount) : "" || 0}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>Tax free &nbsp;(5%)</div>
            <div className={styles.col}>
              $&nbsp;
              {tax ? numberWithCharacter(tax) : "" || 0}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <IntlMessages id="item.placeBid.totalBidAmount" />
            </div>
            <div className={styles.col}>
              {" "}
              $&nbsp;
              {total ? numberWithCharacter(total) : 0}
            </div>
          </div>
        </div>
        {total > 0 && rate > 0 && (
          <div className={styles.WithCharacter}>
            (~{_.find(currencies, ["code", user?.currency])?.symbol}{" "}
            {rate ? numberWithCharacter(total / rate) : 0})
          </div>
        )}
        <div className={styles.detail}>
          {data && user?.zipcode < 1 ? (
            <WarningComponent
              title={<IntlMessages id="warningComponent.item.title" />}
              content={<IntlMessages id="warningComponent.item.content" />}
              onChange={handleUpdateProfile}
            />
          ) : (
            data &&
            parseInt(balance) === 0 && (
              <WarningComponent
                title={
                  <IntlMessages id="warningComponent.item.noBalance.title" />
                }
                content={
                  <IntlMessages id="warningComponent.item.noBalance.content" />
                }
                onChange={() => handleAddMoney()}
              />
            )
          )}
        </div>
        <div className={styles.btns}>
          {!checkMoney && (
            <button className={styles.buttonDisablue} onClick={() => {}}>
              <IntlMessages id="item.placeBid" />
            </button>
          )}
          {checkMoney && (
            <button className={cn("button", styles.button)} onClick={bid}>
              <IntlMessages id="item.placeBid" />
            </button>
          )}
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

export default connect(mapStateToProps)(React.memo(Bid));
