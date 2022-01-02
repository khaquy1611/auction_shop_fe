import React from "react";
import {Link} from "react-router-dom";
import cn from "classnames";
import styles from "./FlatDeposit.module.sass";
import Icon from "../../components/Icon";
import Modal from "../../components/Modal";
import PaymentPopup from "./PaymentPopup";
import InfoPopup from "./InfoPopup";
import IntlMessages from "../../i18n/IntlMessages";

const listCoinData = [
    {
        id: 1,
        label: 'Digital',
        list: [
            {
                id: 1,
                imageSrc: "/images/content/usdt.svg",
                name: "USDT"
            },
            {
                id: 2,
                imageSrc: "/images/content/usdc.svg",
                name: "USDC"
            },
            {
                id: 3,
                imageSrc: "/images/content/usdc.svg",
                name: "ListenUSD"
            }
        ]
    },
    {
        id: 2,
        label: 'Flat',
        list: [
            {
                id: 1,
                imageSrc: "/images/content/usdc.svg",
                name: "USD"
            }
        ]
    },
    {
        id: 3,
        label: 'Other',
        list: [
            {
                id: 1,
                imageSrc: "/images/content/lstn.svg",
                name: "LSTN"
            },
            {
                id: 2,
                imageSrc: "/images/content/lpoint.svg",
                name: "LPOINT"
            }
        ]
    }
];

class FlatDeposit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flagShowListCoin: false,
            currentGroupCoin: 2,
            currentCoin: listCoinData[0]['list'][0],
            stepIndex: 2,
            expand: true,
            visibleModalPayment: false,
            visibleModalInfo: false
        }
    }

    showListCoin = (groupId) => {
        this.setState({
            currentGroupCoin: groupId
        });
    }

    setCurrentCoin = (coin) => {
        this.setState({
            currentCoin: coin
        });
    }

    showDetail = () => {
        if (this.state.expand) {
            this.setState({
                expand: false
            });
        } else {
            this.setState({
                expand: true
            });
        }

    }

    setVisibleModalPayment = (status) => {
        this.setState({
            visibleModalPayment: status
        });
    }

    closePopup = (status) => {
        this.setState({
            visibleModalPayment: status
        });
    }

    setVisibleModalInfo = (status) => {
        this.setState({
            visibleModalInfo: status
        });
    }

    setStepIndex = (step) => {
        this.setState({
            stepIndex: step
        });
    }

    choosePayment = (step) => {
        this.setState({
            stepIndex: step
        })
    }

    closePopupInfo = (status) => {
        this.setState({
            visibleModalInfo: status
        });
    }

    render() {
        const {currentGroupCoin, currentCoin, expand, visibleModalPayment, visibleModalInfo, stepIndex} = this.state;
        return (
            <div className={cn("section-pt80", styles.section)}>
                <div className={cn("container", styles.container)}>
                    <div className={styles.head}>
                        <Link className={cn("button-stroke", styles.button)} to="/wallet">
                            <Icon name="arrow-prev" size="14" fill="#777E90"/>
                            <span> <IntlMessages id="deposit.backToWallet"/></span>
                        </Link>
                        <div className={styles.breadcrumb}>
                            <ul>
                                <li>
                                    <p><IntlMessages id="deposit.wallet"/></p>
                                    <Icon name="arrow-bottom" size="10"/>
                                </li>
                                <li>
                                    <Link className={styles.button} to="/wallet">
                                        <span><IntlMessages id="deposit"/></span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.topHead}>
                        <h1 className={styles.title}><IntlMessages id="deposit"/></h1>
                        {/*<AuthCluster />*/}
                        <div className={styles.steps}>
                            <ul>
                                <li className={styles.active}>
                                    <p><span><IntlMessages id="deposit.step1"/></span></p>
                                </li>
                                <li className={stepIndex > 1 ? styles.active : ''}>
                                    <p><span><IntlMessages id="deposit.step2"/></span></p>
                                </li>
                                <li className={stepIndex > 2 ? styles.active : ''}>
                                    <p><span><IntlMessages id="deposit.step3"/></span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {/*<div className={styles.listGroup}>*/}
                        {/*    {*/}
                        {/*        listCoinData.map((item, index) => {*/}
                        {/*            return (*/}
                        {/*                <div className={styles.group} key={index}>*/}
                        {/*                    <div className={styles.label} onClick={() => this.showListCoin(item.id)}>*/}
                        {/*                        <span>{item.label}</span>*/}
                        {/*                        <Icon name="arrow-bottom" size="10"/>*/}
                        {/*                    </div>*/}
                        {/*                    <div*/}
                        {/*                        className={cn(currentGroupCoin === item.id ? styles.expandListCoin : "", styles.listCoin)}>*/}
                        {/*                        {item.list.map((coin, index2) => {*/}
                        {/*                            return (*/}
                        {/*                                <div className={styles.coinItem} key={index2}*/}
                        {/*                                     onClick={() => this.setCurrentCoin(coin)}>*/}
                        {/*                                    <img src={coin.imageSrc}/>*/}
                        {/*                                    <span>{coin.name}</span>*/}
                        {/*                                </div>*/}
                        {/*                            );*/}
                        {/*                        })}*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            );*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div className={styles.wrapper}>
                            {
                                stepIndex !== 3 ?
                                    <div className={cn(styles.purchaseDetail, styles.block)}>
                                        <div className={styles.row}>
                                            <div className={styles.currency}>
                                                <div className={styles.link}>
                                                    <span><IntlMessages id="deposit.purchasedDetail"/></span>
                                                </div>
                                            </div>
                                            <div className={styles.action}>
                      <span className={cn(expand ? styles.rotate : '', styles.iconExpand)}
                            onClick={() => this.showDetail()}>
                        <Icon name="arrow-bottom" size="10"/>
                      </span>
                                            </div>
                                        </div>
                                        {
                                            expand === true ?
                                                <div className={styles.infor}>
                                                    <div className={styles.property}>
                            <span className={styles.label}>
                              <IntlMessages id="deposit.recipient"/>
                            </span>
                                                        <strong className={styles.value}>
                                                            donal_trump@gmail.com
                                                        </strong>
                                                    </div>
                                                    <div className={styles.property}>
                            <span className={styles.label}>
                                <IntlMessages id="deposit.itemName"/>
                            </span>
                                                        <strong className={styles.value}>
                                                            Balance ($100.00 USD)
                                                        </strong>
                                                    </div>
                                                </div>
                                                :
                                                ''
                                        }
                                    </div>
                                    : ""
                            }
                            {
                                stepIndex === 1 ?
                                    <div className={styles.block}>
                                        <div className={styles.row}>
                                            <div className={styles.currency}>
                                                <div className={styles.link}>
                                                    <span><IntlMessages id="deposit.paymentMethod"/></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.infor}>
                                            <div className={cn(styles.property, styles.payment)}>
                                                <div className={styles.label}>
                                                    <span><Icon name="wallet" size="22" fill="#777E91"/></span>
                                                </div>
                                                <div className={styles.value}>
                                                    <p className={styles.methodName}><IntlMessages id="deposit.card"/></p>
                                                    <span><img src="/images/content/clockMin.svg" alt="icon-clock"/><IntlMessages id="deposit.instant"/></span>
                                                    <span><img src="/images/content/pigMoney.svg" alt="icon-money"/><IntlMessages id="deposit.upTo"/> $5,000.00 USD/<IntlMessages id="deposit.day"/></span>
                                                    <span><img src="/images/content/money.svg" alt="icon-money"/>5-7% <IntlMessages id="deposit.serviceFee"/></span>
                                                    <Link className={cn("button", styles.button)} to="/">
                                                        <IntlMessages id="deposit.recommended"/>
                                                    </Link>
                                                </div>
                                                <div className={cn(styles.active, styles.select)}>
                                                    <Icon name="check" size="12" fill="#ffffff"/>
                                                </div>
                                            </div>
                                            <div className={cn(styles.property, styles.payment)}>
                                                <div className={styles.label}>
                                                    <span><Icon name="coin" size="22" fill="#777E91"/></span>
                                                </div>
                                                <div className={styles.value}>
                                                    <p className={styles.methodName}>BTC, ETH, BCH, DAI & USDT</p>
                                                    <span><img src="/images/content/clockMin.svg" alt="icon-clock"/><IntlMessages id="deposit.instant"/></span>
                                                    <span><img src="/images/content/pigMoney.svg" alt="icon-money"/><IntlMessages id="deposit.upTo"/> $5,000.00 USD/<IntlMessages id="deposit.day"/></span>
                                                    <span><img src="/images/content/money.svg" alt="icon-money"/><IntlMessages id="deposit.gasFee"/></span>
                                                </div>
                                                <div className={cn("active", styles.select)}>
                                                    <Icon name="check" size="12" fill="#ffffff"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                            }
                            {
                                stepIndex === 2 ?
                                    <div className={cn(styles.stepTwo, styles.block)}>
                                        <div className={styles.infor}>
                                            <div className={styles.sectionInput}>
                                                <label><IntlMessages id="deposit.step2.name"/></label>
                                                <input className={styles.input} type={'text'}
                                                       defaultValue={'Nguyen Thanh Hai'}/>
                                            </div>
                                            <div className={styles.sectionInput}>
                                                <label><IntlMessages id="deposit.step2.cardNumber"/></label>
                                                <input className={styles.input} type={'text'}
                                                       defaultValue={'4221 84214524 1898'}/>
                                                <img src="/images/content/visa.svg" alt="icon"/>
                                                <img src="/images/content/mastercard.svg" alt="icon"/>
                                            </div>
                                            <div className={styles.groupSectionInput}>
                                                <div className={styles.sectionInput}>
                                                    <label><IntlMessages id="deposit.step2.validThrough"/></label>
                                                    <input className={styles.input} type={'text'} defaultValue={'99'}/>
                                                </div>
                                                <div className={styles.sectionInput}>
                                                    <label/>
                                                    <input className={styles.input} type={'text'} defaultValue={'898'}/>
                                                </div>
                                                <div className={styles.sectionInput}>
                                                    <label><IntlMessages id="deposit.step2.securityCode"/></label>
                                                    <input className={styles.input} type={'text'} defaultValue={'123'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                            }
                            {
                                stepIndex === 3 ?
                                    <div className={cn(styles.stepTwo, styles.stepThree, styles.block)}>
                                        <div className={styles.infor}>
                                            <div className={styles.subTitle}>
                                                <span><IntlMessages id="deposit.step3.address"/></span>
                                            </div>
                                            <div className={styles.sectionInput}>
                                                <label><IntlMessages id="deposit.step3.residentalAddress"/></label>
                                                <input className={styles.input} type={'text'}
                                                       defaultValue={'10 Ton That Thuyet'}/>
                                            </div>
                                            <div className={styles.groupSectionInput}>
                                                <div className={styles.sectionInput}>
                                                    <label><IntlMessages id="deposit.step3.city"/></label>
                                                    <input className={styles.input} type={'text'}
                                                           defaultValue={'Ha Noi'}/>
                                                </div>
                                                <div className={styles.sectionInput}>
                                                    <label><IntlMessages id="deposit.step3.state"/></label>
                                                    <input className={styles.input} type={'text'}
                                                           defaultValue={'Ha Noi'}/>
                                                </div>
                                                <div className={styles.sectionInput}>
                                                    <label><IntlMessages id="deposit.step3.country"/></label>
                                                    <input className={styles.input} type={'text'}
                                                           defaultValue={'Vietnam'}/>
                                                </div>
                                                <div className={styles.sectionInput}>
                                                    <label><IntlMessages id="deposit.step3.zip"/></label>
                                                    <input className={styles.input} type={'text'}
                                                           defaultValue={'100000'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                            }
                            <div className={cn(styles.blockTotal, styles.block)}>
                                <div className={styles.row}>
                                    <div className={styles.currency}>
                                        <div className={styles.link}>
                                            <span><IntlMessages id="deposit.total"/></span>
                                            <span className={cn(expand ? styles.rotate : '', styles.iconExpand)}
                                                  onClick={() => this.showDetail()}><Icon name="arrow-bottom"
                                                                                          size="10"/></span>
                                        </div>
                                    </div>
                                    <div className={styles.action}>
                                        <span className={styles.totalPrice}>$105.55 USD</span>
                                    </div>
                                </div>
                                {
                                    expand === true ?
                                        <div className={cn(styles.purchase, styles.infor)}>
                                            {
                                                stepIndex === 1 ?
                                                    <div className={styles.buttonPurchase}>
                                                        <Link className={cn("button button-stroke", styles.button)}
                                                              to="/wallet">
                                                            <IntlMessages id="deposit.cancelPurchase"/>
                                                            Cancel purchase
                                                        </Link>
                                                        <button className={cn("button", styles.button)}
                                                                onClick={() => this.setVisibleModalPayment(true)}>
                                                            <IntlMessages id="deposit.purchaseNow"/>
                                                        </button>
                                                    </div>
                                                    : ''
                                            }
                                            {
                                                stepIndex === 2 ?
                                                    <div className={styles.buttonPurchase}>
                                                        <button className={cn("button button-stroke", styles.button)}
                                                                onClick={() => this.setStepIndex(1)}>
                                                            <IntlMessages id="deposit.step2.backToPayment"/>
                                                        </button>
                                                        <button className={cn("button", styles.button)}
                                                                onClick={() => this.setVisibleModalInfo(true)}>
                                                            <IntlMessages id="deposit.step2.next"/>
                                                        </button>
                                                    </div>
                                                    : ""
                                            }
                                            {
                                                stepIndex === 3 ?
                                                    <div className={styles.buttonPurchase}>
                                                        <button className={cn("button button-stroke", styles.button)}
                                                                onClick={() => this.setStepIndex(2)}>
                                                            <IntlMessages id="deposit.step3.back"/>
                                                        </button>
                                                        <button className={cn("button", styles.button)}>
                                                            <IntlMessages id="deposit.step3.confirm"/>
                                                        </button>
                                                    </div>
                                                    : ""
                                            }
                                            <p>
                                                <img src="/images/content/lock.svg" alt="icon-lock"/>
                                                <span><IntlMessages id="deposit.security"/> <strong>MoonPay, Coinbase</strong></span>
                                            </p>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    visible={visibleModalPayment}
                    onClose={() => this.setVisibleModalPayment(false)}
                >
                    <PaymentPopup setStepIndex={this.setStepIndex} closePopup={this.closePopup}/>
                </Modal>
                <Modal
                    visible={visibleModalInfo}
                    onClose={() => this.setVisibleModalInfo(false)}
                >
                    <InfoPopup setStepIndex={this.setStepIndex} closePopupInfo={this.closePopupInfo}/>
                </Modal>
            </div>
        );
    }
}

export default FlatDeposit;
