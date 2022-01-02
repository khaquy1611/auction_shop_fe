import React, { useState } from "react";
import IntlMessages from "../../../i18n/IntlMessages";
import Pagination from "../../../components/Pagination";
import { validateDate, numberWithCharacter } from "../../../constants/Utils";
import styles from "./BottomDescription.module.sass";

function BottomDescription(props) {
  const { dataTransaction } = props;
  return (
    <>
      <div className={styles.block}>
        <div className={styles.transaction}>
          <strong>
            <IntlMessages id="wallet.transaction" />
          </strong>
        </div>
        <div className={styles.contentTransaction}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>
                  <IntlMessages id="wallet.date" />
                </th>
                <th>
                  <IntlMessages id="wallet.transaction.hash" />
                </th>
                <th className={styles.amount}>
                  <IntlMessages id="wallet.amount" />
                </th>
              </tr>
            </thead>

            {dataTransaction && dataTransaction.length > 0 ? (
              dataTransaction.map((item, index) => (
                <tbody>
                  <tr key={index}>
                    <td>{validateDate(item?.created_at)}</td>
                    <td className={styles.hash}>{item?.hash}</td>
                    <td className={styles.amount}>
                      $
                      {item?.amount
                        ? numberWithCharacter(item?.amount)
                        : "" || 0}
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr className={styles.rowNoTransaction}>
                <td colSpan="3" nowrap>
                  <div className={styles.noTransaction}>
                    <IntlMessages id="wallet.noTransaction" />
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>

      {/* <div className={styless.paginationTransaction}>
        <Pagination />
      </div> */}
    </>
  );
}

export default BottomDescription;
