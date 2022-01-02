import React, {Component} from "react";
import styles from "./TimeCountdown.module.sass";
import IntlMessages from "../../i18n/IntlMessages";
import Skeleton from "react-loading-skeleton";
class Timer extends Component {
    constructor(props) {
        super(props);
        this.countDownId = null;
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: false
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
        const {startDate} = this.props;
        const now = new Date().getTime();
        if (!startDate) {
            this.setState({expired: true});
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
                expired: true
            });
            return;
        }
        this.setState({days, hours, minutes, seconds, expired: false});
    };

    render() {
        const {days, hours, minutes, seconds, expired} = this.state;

        if (expired) {
            return <div className={styles.expired}>Expired :(</div>;
        }
        return (
            <div className={styles.timer}>
                {
                    days !== 0 ?
                        <div>
                            <p>{days}</p>
                            <span><IntlMessages id="home.day"/></span>
                        </div>
                        : <Skeleton/>
                }
                {
                    hours !== 0 ?
                        <div>
                            <p>{hours}</p>
                            <span><IntlMessages id="home.hour"/></span>
                        </div>
                        : <Skeleton/>
                }
                {
                    minutes !== 0 ?
                        <div>
                            <p>{minutes}</p>
                            <span><IntlMessages id="home.mins"/></span>
                        </div>
                        : <Skeleton/>
                }
                <div>
                    <p>{seconds}</p>
                    <span><IntlMessages id="home.secs"/></span>
                </div>
            </div>
        );
    }
}

export default Timer;