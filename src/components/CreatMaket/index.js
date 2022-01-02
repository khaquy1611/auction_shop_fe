import cn from "classnames";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IntlMessages from "../../i18n/IntlMessages";
import { handleCheckJobId } from "../../services/jobsId";
import styles from "./CreateMaket.module.sass";
import InputNumberic from "../InputNumberic";
import { createListing } from "../../services/MarketPlace";

const CreatMaket = (props) => {
  const { data, onCancel, callData } = props;
  const [numberInput, setNumberInput] = useState("");

  const handleCheckRealJobs = (value) => {
    handleCheckJobId(value).then((res) => {
      if (res?.status === "Error") {
        cancelBid();
        // callData();
      }
      if (res?.status === "Accepted") {
        //
        toast.warning("Please wait");
        const interval = setInterval(() => {
          handleCheckJobId(value).then((res) => {
            if (res.status === "Complete") {
              clearInterval(interval);
              cancelBid();
              // callData();
              toast.success("Litsing successful");
            }
            if (res.status === "Error") {
              clearInterval(interval);
              // callData();
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
        toast.success("Litsing successful");
      }
    });
  };

  const SellNow = () => {
    const payload = {
      itemId: parseInt(data?.id),
      price: numberInput,
    };
    createListing(payload).then((res) => {
      handleCheckRealJobs(res?.jobId);
    });
  };

  const cancelBid = () => {
    onCancel();
  };

  const handleInput = (value) => {
    setNumberInput(value);
  };

  return (
    <>
      <div className={cn(styles.checkout)}>
        <div className={styles.TitleContainer}>
          <div className={cn("h4")}>
            <IntlMessages id="createMarket.listing" />
          </div>
        </div>

        <div className={styles.TitleImgContainer}>
          <h3>{data?.name}</h3>
          <h5>
            # {data?.edition}/{data?.editionSize}
            <IntlMessages id="item.placeBid.edition" />
          </h5>
        </div>
        <div
          style={{
            color: "#777E90",
            fontSize: 18,
            fontWeight: "400",
            marginTop: 15,
          }}
        >
          <IntlMessages id="createMarket.text" />
        </div>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputNumberic onChange={handleInput} value={numberInput} />
            </div>
          </div>
        </div>
        <div className={styles.btnsH}>
          <button
            className={cn("button", styles.buttonListing)}
            onClick={SellNow}
          >
            <IntlMessages id="createMarket.btn.listing" />
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(CreatMaket);
