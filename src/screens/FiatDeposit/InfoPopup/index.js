import React from "react";
import cn from "classnames";
import styles from "./InfoPopup.module.sass";
import Dropdown from "../../../components/Dropdown";
import IntlMessages from "../../../i18n/IntlMessages";

const languages = ["English", "Japan"];

class InfoPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: languages[0],
        }
    }

    changeLanguage = (lang) => {
        this.setState({
            language: lang
        })
    }

    nextStep = () => {
        this.props.setStepIndex(3);
        this.props.closePopupInfo(false);
    }

    render() {
        const {language} = this.state;
        return (
            <div className={cn("popup")}>
                <div className={cn("h4", styles.title)}><IntlMessages id="deposit.infoPopup.title"/></div>
                <div className={styles.content}>
                    <span className={styles.note}><IntlMessages id="deposit.infoPopup.description"/></span>
                    <div className={styles.groupField}>
                        <div className={styles.field}>
                            <div className={styles.label}><IntlMessages id="deposit.infoPopup.firstName"/></div>
                            <input
                                className={styles.input}
                                name="firstName"
                                type="text"
                                defaultValue={"Hai"}
                                ref={(firstName) => this.firstName = firstName}
                                placeholder="Enter your first name"
                                required/>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}><IntlMessages id="deposit.infoPopup.lastName"/></div>
                            <input
                                className={styles.input}
                                name="lastName"
                                type="text"
                                defaultValue={"Nguyen"}
                                ref={(lastName) => this.lastName = lastName}
                                placeholder="Enter your last name"
                                required/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.label}><IntlMessages id="deposit.infoPopup.language"/></div>
                        <Dropdown
                            className={styles.dropdown}
                            value={language}
                            setValue={(language) => this.changeLanguage(language)}
                            options={languages}
                        />
                    </div>
                    <div className={cn(styles.dateField, styles.field)}>
                        <div className={styles.label}><IntlMessages id="deposit.infoPopup.dob"/></div>
                        <input
                            className={styles.input}
                            name="birthDay"
                            type="text"
                            defaultValue={"1996-01-02"}
                            ref={(birthDay) => this.birthDay = birthDay}
                            placeholder="Enter your date of birth"
                            required/>
                    </div>
                    <span className={styles.hidenAction}><IntlMessages id="deposit.infoPopup.dob.hidden"/></span>
                </div>
                <div className={styles.actions}>
                    <button className={cn("button button-stroke", styles.button)}>
                        <IntlMessages id="deposit.infoPopup.useCard"/>
                    </button>
                    <button className={cn("button", styles.button)} onClick={() => this.nextStep()}>
                        <IntlMessages id="deposit.infoPopup.continue"/>
                    </button>
                </div>
            </div>
        );
    }
}

export default InfoPopup;
