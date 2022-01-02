import React from "react";
import cn from "classnames";
import styles from "./PaymentPopup.module.sass";
import Icon from "../../../components/Icon";
import IntlMessages from "../../../i18n/IntlMessages";

const listCoinData = [
    {
        id: 1,
        imageSrc: "/images/content/usdt.svg",
        name: "Bitcoin"
    },
    {
        id: 2,
        imageSrc: "/images/content/usdc.svg",
        name: "Ethereum"
    },
    {
        id: 3,
        imageSrc: "/images/content/usdc.svg",
        name: "USD Coin"
    },
    {
        id: 4,
        imageSrc: "/images/content/usdc.svg",
        name: "Doge Coin"
    },
    {
        id: 5,
        imageSrc: "/images/content/usdc.svg",
        name: "Lite Coin"
    },
    {
        id: 6,
        imageSrc: "/images/content/usdc.svg",
        name: "Dai"
    },
    {
        id: 7,
        imageSrc: "/images/content/usdc.svg",
        name: "Bitcoin Cash"
    },
];

class PaymentPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    nextStep = () => {
        this.props.setStepIndex(2);
        this.props.closePopup(false);
    }

    render() {
        return (
            <div className={styles.sale}>
                <div className={styles.btns}>
                    <button className={cn("button", styles.button)} onClick={() => this.nextStep()}>
                        <IntlMessages id="deposit.paymentPopup.pay"/> Coinbase
                    </button>
                </div>
                <div className={styles.time}>
                    <span><IntlMessages id="deposit.paymentPopup.rate"/> 59:09</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.note}>
                        <span><IntlMessages id="deposit.paymentPopup.selectCoin"/></span>
                    </div>
                    <div className={styles.listCoin}>
                        <ul>
                            {
                                listCoinData.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <p>
                                                <img src={item.imageSrc} alt={'icon-coin'}/>
                                                {item.name}
                                                <Icon name="arrow-bottom" size="12"/>
                                            </p>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentPopup;
