import React from "react";
import cn from "classnames";
import styles from "./ModalSignIUP.module.sass";
import Icon from "../Icon";
import IntlMessages from "../../i18n/IntlMessages";
import { useHistory } from "react-router";
const ModalSignIUP = (props) => {
  const { className, onCancel } = props;
  const history = useHistory();
  const handleSign = () => {
    history.push("/sign-up");
  };
  return (
    <div className={cn(className, styles.connect)}>
      <div className={styles.icon}>
        <Icon name="notification" size="24" />
      </div>
      <div className={styles.info}>
        <IntlMessages id="modalSignUp.info" /> !
      </div>
      <div className={styles.btns}>
        <button
          className={cn("button", styles.button)}
          onClick={() => handleSign()}
        >
          <IntlMessages id="modalSignUp.btn" /> !
        </button>
        <button
          className={cn("button-stroke", styles.button)}
          onClick={onCancel}
        >
          <IntlMessages id="item.placeBid.connectWallet.button.cancel" />
        </button>
      </div>
    </div>
  );
};

export default ModalSignIUP;
