import React from "react";
import styles from "./ModalHistory.module.sass";
import IntlMessages from "../../../i18n/IntlMessages";

function ModelHistory(props) {
  const { dataBrower } = props;
  return (
    <div>
      <h1>
        <IntlMessages id="security.modalHistory.h1" />
        {/* Brower History */}
      </h1>
      <div className={styles.ModelHistory} style={{ fontWeight: 400 }}>
        {dataBrower}
      </div>
    </div>
  );
}

export default ModelHistory;
