import React from "react";
import { Link, withRouter } from "react-router-dom";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import * as _ from "lodash";
import Icon from "../../components/Icon";
import { currencies } from "currencies.json";
import {
  getWalletGroups,
  createWallet,
  getWalletInfo,
  createMetaMaskWallet,
  getWalletBase,
  getTransactionWallet,
} from "../../services/WalletService";
import IntlMessages from "../../i18n/IntlMessages";
import { connect } from "react-redux";
import { compose } from "redux";
import Modal from "../../components/Modal";
import NotificaltionWallet from "../../components/NotificaltionWallet";
import { customGetBalance } from "../../apiContract/listenUSD";
import FlowComponent from "./Flow";
import DigitalComponent from "./Digital";
import ContentWallet from "./ContentWallet";
import SwapComponent from "./Swap";
import { toLower, sumBy, find, has } from "lodash";
import { numberWithCharacter } from "../../constants/Utils";
import { convertMoney } from "../../services/CurrencyService";
import queryString from "query-string";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWalletGroup: {},
      currentWalletBase: {},
      walletData: [],
      currentWalletInfo: {},
      visibleModalBid: false,
      currentConnect: false,
      visibleModalConvert: false,
      visibleModalListenToUSD: false,
      walletBaseConvert: {},
      visibleSwap: false,
      balanceListenUSD: 0,
      dataTransaction: [],
      sumBalance: 0,
      sumBalanceCurrent: 0,
      total: 0,
    };
  }
  showWalletBase = (currentWalletGroup) => {
    this.setState({
      currentWalletGroup: currentWalletGroup,
      currentWalletBase: currentWalletGroup.list_wallet_base[0],
      currentWalletInfo: currentWalletGroup.list_wallet_base[0],
    });
    getWalletInfo(currentWalletGroup?.id).then((res) => {
      this.setState({
        currentWalletInfo: res,
      });
    });
  };

  setCurrentWalletBase = (walletBase) => {
    this.setState({
      currentWalletBase: walletBase,
    });
    this.loadWalletInfo(walletBase?.id);
  };

  componentDidMount() {
    let idd = queryString.parse(this.props.match.params.id);
    console.log(idd);
    let id = idd.idGr;

    getWalletGroups().then((res) => {
      res.map((item) => {
        if (find(item?.list_wallet_base, { wallet_name: "LISTENUSD" })) {
          this.getTotal(
            find(item?.list_wallet_base, { wallet_name: "LISTENUSD" }).id
          );
        }
      });
      this.setState({
        walletData: res,
        currentWalletBase: res[id]?.list_wallet_base[idd.idPosition - 1],
        currentWalletGroup: res[id],
      });
      this.loadWalletInfo(res[id]?.list_wallet_base[0]?.id);
    });
    getTransactionWallet().then((res) => {
      this.setState({
        dataTransaction: res?.data,
      });
    });
  }

  getTotal(id) {
    getWalletBase().then((resSum) => {
      getWalletInfo(id).then((res) => {
        customGetBalance(res.wallet_address).then((res) => {
          const sum = parseFloat(sumBy(resSum, "balance"));
          const sumListen = parseFloat(res);
          this.setState({
            sumBalance: sum + sumListen,
          });
          convertMoney(
            this.props.user?.currency ? this.props.user?.currency : "USD",
            this.state.sumBalance
          ).then((res) => {
            this.setState({
              sumBalanceCurrent: res?.data?.to?.[0]?.mid,
            });
          });
        });
      });
    });
  }

  loadWalletInfo(walletBaseId) {
    getWalletInfo(walletBaseId).then((res) => {
      if (toLower(res?.wallet_base?.wallet_name) === "listenusd") {
        customGetBalance(res.wallet_address).then((res) => {
          this.setState({
            balanceListenUSD: res,
          });
        });
      } else {
        this.setState({
          currentWalletInfo: res,
        });
      }
    });
    getWalletBase().then((res) => {
      this.setState({
        walletBaseConvert: res,
      });
    });
  }

  goToWithDraw() {
    const currentWalletInfo = this.state.currentWalletInfo;
    const currentWalletBase = this.state.currentWalletBase;

    if (currentWalletInfo?.id === 0) {
      // createWallet(currentWalletBase?.id).then((res) => {
      this.props.history.push(`/withdraw/${currentWalletBase?.id}`);
      // });
    } else {
      this.props.history.push(`/withdraw/${currentWalletBase?.id}`);
    }
  }
  goToDeposit() {
    // Face 2

    // const currentWalletInfo = this.state.currentWalletInfo;
    // const currentWalletGroup = this.state.currentWalletGroup;
    // console.log('currentWalletInfo',currentWalletInfo)

    // let url = currentWalletGroup.is_fiat ? "/fiat-deposit" : "/deposit";
    // if (currentWalletInfo.id === 0) {
    //   createWallet(currentWalletBase.id).then((res) => {
    //     this.props.history.push(url);
    //   });
    // } else {
    // }

    const currentWalletBase = this.state.currentWalletBase;
    if (currentWalletBase) {
      this.props.history.push(`/deposit/${currentWalletBase?.id}`);
    }
  }

  setVisibleModalBid = (visible) => {
    this.setState({
      visibleModalBid: visible,
    });
  };

  setVisibleModalConvert = (visible) => {
    this.setState({
      visibleModalConvert: visible,
    });
  };

  setVisibleModalListenToUSD = (visible) => {
    this.setState({
      visibleModalListenToUSD: visible,
    });
  };

  handleInstallMetaMask() {
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      "_blank"
    );
    this.setVisibleModalBid(false);
  }

  connectListtenWallet() {
    createMetaMaskWallet(
      this.state.currentWalletBase.id,
      this.state.currentConnect
    ).then((res) => {
      this.loadWalletInfo();
    });
  }

  handleSwap = (event) => {
    this.setState({
      visibleSwap: event,
    });
  };

  render() {
    const {
      currentWalletGroup,
      currentWalletBase,
      walletData,
      currentWalletInfo,
      visibleModalBid,
      visibleModalConvert,
      visibleModalListenToUSD,
      balanceListenUSD,
      walletBaseConvert,
      visibleSwap,
      dataTransaction,
      sumBalance,
      sumBalanceCurrent,
    } = this.state;
    const { user } = this.props;
    return (
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.head}>
            <Link className={cn("button-stroke", styles.button)} to="/">
              <Icon name="arrow-prev" size="12" fill="#777E90" />
              <span>
                <IntlMessages id="backToHome" />
              </span>
            </Link>
            {/* <div className={styles.breadcrumb}>
              <ul>
                <li>
                  <p>
                    <IntlMessages id="wallet.profile" />
                  </p>
                  <Icon name="arrow-bottom" size="10" />
                </li>
                <li>
                  <Link className={styles.button} to="/my-wallet">
                    <span>
                      <IntlMessages id="wallet" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          <div className={styles.titleWalleTContainer}>
            <div style={styles.titleWalleT}>
              <h1 className={styles.title}>
                <IntlMessages id="wallet" />{" "}
              </h1>
              <h3 className={styles.titleBalance}>
                &ensp;
                <IntlMessages id="wallet.totalBalance" />:
                <span className={styles.titleBalanceSpan}>
                  {" "}
                  $
                  {sumBalance
                    ? numberWithCharacter(sumBalance)
                    : "0.00" || "0.00"}
                </span>
                {sumBalance ? (
                  <div className={styles.sumBalanceCurrent}>
                    (~{_.find(currencies, ["code", user?.currency])?.symbol}{" "}
                    {numberWithCharacter(sumBalanceCurrent)})
                  </div>
                ) : (
                  ""
                )}
              </h3>
            </div>

            <div className={styles.action}>
              <a
                className={cn("button", styles.button)}
                style={{ height: 40, width: 100 }}
                href="#!"
                onClick={() => this.setVisibleModalConvert(true)}
              >
                <IntlMessages id="chooseTokenUSD.btn.Swap" />
              </a>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.listGroup}>
              {walletData &&
                walletData?.map((group, index) => {
                  return (
                    <div className={styles.group} key={index}>
                      <div
                        className={styles.label}
                        onClick={() => this.showWalletBase(group)}
                      >
                        <span>{group.wallet_group_name}</span>
                        <Icon name="arrow-bottom" size="10" />
                      </div>
                      <div
                        className={cn(
                          currentWalletGroup.id === group.id
                            ? styles.expandListCoin
                            : "",
                          styles.listCoin
                        )}
                      >
                        {group.list_wallet_base &&
                          group.list_wallet_base.map((base, index) => {
                            return (
                              <div
                                className={styles.coinItem}
                                key={index}
                                onClick={() => this.setCurrentWalletBase(base)}
                              >
                                <img
                                  src={base.wallet_image}
                                  width="50px"
                                  width="50px"
                                  alt="base-image"
                                />
                                <span>{base.wallet_name}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
            {toLower(currentWalletGroup?.wallet_group_name) === "flow" && (
              <FlowComponent
                dataTransaction={
                  currentWalletBase?.id === dataTransaction[0]?.wallet_base_id
                    ? dataTransaction
                    : []
                }
                currentWalletBase={currentWalletBase}
                setVisibleModalBid={() => this.setVisibleModalBid(true)}
                balanceListen={balanceListenUSD}
                setVisibleModalListenToUSD={() =>
                  this.setVisibleModalListenToUSD(true)
                }
              />
            )}
            {toLower(currentWalletGroup?.wallet_group_name) === "digital" && (
              <DigitalComponent
                // dataTransaction={
                //   currentWalletBase?.id === dataTransaction[0]?.wallet_base_id
                //     ? dataTransaction
                //     : []
                // }
                currentWalletBase={currentWalletBase}
                currentWalletInfo={currentWalletInfo}
                setVisibleModalBid={() => this.setVisibleModalBid(true)}
              />
            )}
            {toLower(currentWalletGroup?.wallet_group_name) !== "flow" &&
              toLower(currentWalletGroup?.wallet_group_name) !== "digital" && (
                <ContentWallet
                  dataTransaction={
                    currentWalletBase?.id === dataTransaction[0]?.wallet_base_id
                      ? dataTransaction
                      : []
                  }
                  currentWalletInfo={currentWalletInfo}
                  currentWalletBase={currentWalletBase}
                  goToDeposit={() => this.goToDeposit()}
                  goToWithDraw={() => this.goToWithDraw()}
                  setVisibleModalConvert={() =>
                    this.setVisibleModalConvert(true)
                  }
                />
              )}
          </div>
        </div>
        <Modal
          visible={visibleModalBid}
          onClose={() => this.setVisibleModalBid(false)}
        >
          <NotificaltionWallet
            onClick={() => this.handleInstallMetaMask()}
            onClickCancel={() => this.setVisibleModalBid(false)}
          />
        </Modal>
        <Modal
          visible={visibleModalConvert}
          onClose={() => this.setVisibleModalConvert(false)}
          title={"Swap"}
        >
          {walletBaseConvert.length > 0 ? (
            <SwapComponent
              handleSwap={this.handleSwap}
              visibleSwap={visibleSwap}
              walletBaseConvert={walletBaseConvert}
              loadWalletInfo={() => this.loadWalletInfo(currentWalletBase?.id)}
              onCanel={() => this.setVisibleModalConvert(false)}
            />
          ) : (
            <IntlMessages id="wallet.text" />
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  user: app.user,
});

const withConnect = connect(mapStateToProps);

export default compose(withRouter, withConnect)(Wallet);
