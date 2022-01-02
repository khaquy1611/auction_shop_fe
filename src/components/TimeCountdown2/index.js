import React, { Component } from "react";
import styles from "./TimeCountdown2.module.sass";
import IntlMessages from "../../i18n/IntlMessages";
import Icon from "../Icon";
class Timer2 extends Component {
  constructor(props) {
    super(props);
    this.countDownId = null;
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    };
  }

  componentDidMount() {
    this.countDownId = setInterval(this.timerInit, 1000);
  }

  componentWillUnmount() {
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }
  }

  timerInit = () => {
    const { startDate } = this.props;
    const now = new Date().getTime();
    if (!startDate) {
      this.setState({ expired: true });
      return;
    }
    const countDownStartDate = new Date(startDate).getTime();
    const distance = countDownStartDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // For countdown is finished
    if (distance < 0) {
      clearInterval(this.countDownId);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      });
      return;
    }
    this.setState({ days, hours, minutes, seconds, expired: false });
  };

  render() {
    const { days, hours, minutes, seconds, expired } = this.state;
    const { fontSizeNumber } = this.props;
    if (expired) {
      return (
        <div className={styles.expired}>
          <Icon
            name1="lockTime1"
            name2="lockTime2"
            fill="#777E91"
            size="24"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          />
          <h5 className={styles.sold}>
            <IntlMessages id="item.sold" />
          </h5>
        </div>
      );
    }
    return (
      <div className={styles.timer}>
        <img src={"/images/content/clock.svg"} alt={"icon-clock"} />
        <p style={{ fontSize: fontSizeNumber, width: "100%" }}>
          <IntlMessages id="item.endIn" />
          <span>{days}</span> <IntlMessages id="item.days" />
          <span>
            {String(hours).length === 1 ? "0" + hours : hours}:
            {String(minutes).length === 1 ? "0" + minutes : minutes}:
            {String(seconds).length === 1 ? "0" + seconds : seconds}
          </span>
        </p>
      </div>
    );
  }
}

export default Timer2;
