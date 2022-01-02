import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Deposit.module.sass";
import Icon from "../../components/Icon";
import IntlMessages from "../../i18n/IntlMessages";
import { useParams } from "react-router-dom";
import { getWalletInfo, getWalletGroups } from "../../services/WalletService";
import QRCode from "qrcode.react";
import * as _ from "lodash";
import queryString from "query-string";

const Deposit = () => {
  const { id } = useParams();
  const [AddressCode, setAddressCode] = useState();
  const [checkCopy, setCheckCopy] = useState("");
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
  }, [id]);
  const copyAddress = (value) => {
    navigator.clipboard.writeText(value);
    setCheckCopy(value);
  };

  return (
    <div className={cn("section-pt80", styles.section)}>
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
                  <IntlMessages id="deposit.wallet" />
                </p>
                <Icon name="arrow-bottom" size="10" />
              </li>
              <li>
                <Link className={styles.button} to="/wallet">
                  <span>
                    <IntlMessages id="deposit" />
                  </span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.row}>
              <div className={styles.currency}>
                <div className={styles.link}>
                  {AddressCode?.wallet_base?.wallet_image && (
                    <img
                      src={AddressCode?.wallet_base?.wallet_image}
                      className={styles.imgDeposit}
                      alt={"icon-coin"}
                    />
                  )}
                  <span>
                    <IntlMessages id="deposit.your" />{" "}
                    {AddressCode?.wallet_base?.wallet_name}{" "}
                    <IntlMessages id="deposit.walletAddress" />
                  </span>
                </div>
              </div>
              <div className={styles.detail}>
                {/* <div className={styles.warning}>
                  <img src={"/images/content/info.svg"} alt={"icon"} />
                  <span>
                    <IntlMessages id="deposit.warn" />
                  </span>
                </div> */}
                <div className={styles.qr}>
                  {AddressCode && (
                    <div className={styles.styleQR}>
                      <QRCode
                        id="qrcodeAddress"
                        value={
                          AddressCode.wallet_address
                            ? AddressCode.wallet_address
                            : "NULL"
                        }
                        size={200}
                        level={"H"}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.field}>
                  {AddressCode && (
                    <>
                      {" "}
                      <input
                        className={styles.input}
                        type="text"
                        value={AddressCode?.wallet_address}
                        readOnly
                      />
                      <button
                        className={styles.buttonCopy}
                        onClick={() => copyAddress(AddressCode?.wallet_address)}
                      >
                        <IntlMessages id="deposit.copy" />
                        {checkCopy ? (
                          <div>
                            <div className={styles.styleCheck}>Copied</div>
                          </div>
                        ) : (
                          <div>
                            <div className={styles.styleCheck}>
                              Copy to clipboard
                            </div>
                          </div>
                        )}
                      </button>
                    </>
                  )}
                </div>
                <div className={styles.note}>
                  <span>
                    <IntlMessages id="deposit.attention" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
