import React, { useState } from "react";
import cn from "classnames";
import styles from "./Transfer.module.sass";
import IntlMessages from "../../i18n/IntlMessages";
import { useParams } from "react-router";
import { validateInputAddresses } from "../../constants/Utils";
import { postWithDraw } from "../../services/WalletService";
import { toast } from "react-toastify";
const CheckPassword = (props) => {
  const { valueAddress, valueInput } = props;
  const [checkWithDraw, setCheckWithDraw] = useState("");
  const { id } = useParams();
  const handleSubmit = () => {
    const paramSend = {};
    paramSend.amount = parseFloat(valueInput);
    paramSend.to = valueAddress;
    paramSend.wallet_base_id = parseInt(id);
    if (checkWithDraw === "YES") {
      postWithDraw(id, paramSend).then((res) => {
        toast.success("Transfer success !");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    } else {
      toast.error("Please enter YES !");
    }
  };
  return (
    <div className={styles.transfer}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="checkPassword.title" />
      </div>
      <div className={styles.text}>
        <IntlMessages id="checkPassword.text" />
        <span className={styles.WithdrawText}>
          &ensp;
          <IntlMessages id="checkPassWord.text.YES" />
          &ensp;
        </span>
        <IntlMessages id="checkPassWord.text.span" />
      </div>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="password"
          name="address"
          placeholder="Enter here"
          onChange={(event) => setCheckWithDraw(event.target.value)}
        />
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={handleSubmit}>
          <IntlMessages id="checkPassword.btn.yes" />
        </button>
        <button className={cn("button-stroke", styles.button)}>
          <IntlMessages id="transfer.btn1" />
        </button>
      </div>
    </div>
  );
};

export default CheckPassword;
