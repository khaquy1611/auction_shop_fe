import React from "react";
import cn from "classnames";
import styles from "./Report.module.sass";
import TextArea from "../TextArea";
import IntlMessages from "../../i18n/IntlMessages";
import {FormattedMessage} from "react-intl";

const Report = ({className}) => {
    return (
        <div className={cn(className, styles.transfer)}>
            <div className={cn("h4", styles.title)}><IntlMessages id="user.report"/></div>
            <div className={styles.text}>
                <IntlMessages id="user.report.title"/>
            </div>
            <FormattedMessage id="user.report.message.placeholder" defaultMessage="Tell us the details">
                {
                    placeholder => <TextArea
                        className={styles.field}
                        label={<IntlMessages id="user.report.message"/>}
                        name="Message"
                        placeholder={placeholder}
                        required="required"
                    />
                }
            </FormattedMessage>
            <div className={styles.btns}>
                <button className={cn("button", styles.button)}><IntlMessages id="user.report.send"/></button>
                <button className={cn("button-stroke", styles.button)}><IntlMessages id="user.report.cancel"/>
                </button>
            </div>
        </div>
    );
};

export default Report;
