import React from "react";
import cn from "classnames";
import styles from "./FolowSteps.module.sass";
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import LoaderCircle from "../../../components/LoaderCircle";
import IntlMessages from "../../../i18n/IntlMessages";

const FolowSteps = ({ className }) => {
  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn("h4", styles.title)}>
        <IntlMessages id="upload-details.folowSteps.title" />
        {/* Folow steps */}
      </div>
      <div className={styles.list}>
        <div className={cn(styles.item, styles.done)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <IntlMessages id="upload-details.folowSteps.info1" />
                {/* Upload files & Mint token */}
              </div>
              <div className={styles.text}>
                <IntlMessages id="upload-details.folowSteps.text1" />
                {/* Call contract method */}
              </div>
            </div>
          </div>
          <button className={cn("button done", styles.button)}>
            <IntlMessages id="upload-details.folowSteps.button1" />
            {/* Done */}
          </button>
        </div>
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="pencil" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <IntlMessages id="upload-details.folowSteps.info2" />
                {/* Sign sell order */}
              </div>
              <div className={styles.text}>
                <IntlMessages id="upload-details.folowSteps.text2" />
                {/* Sign sell order using your wallet */}
              </div>
            </div>
          </div>
          <button className={cn("button disabled", styles.button)}>
            <IntlMessages id="upload-details.folowSteps.button3" />
            {/* Start now */}
          </button>
        </div>
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <LoaderCircle className={styles.loader} />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <IntlMessages id="upload-details.folowSteps.info2" />
                {/* Sign sell order */}
              </div>
              <div className={styles.text}>
                <IntlMessages id="upload-details.folowSteps.text2" />
                {/* Sign sell order using your wallet */}
              </div>
            </div>
          </div>
          <button className={cn("button loading", styles.button)}>
            <Loader className={styles.loader} color="white" />
          </button>
        </div>
        <div className={cn(styles.item, styles.error)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="pencil" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <IntlMessages id="upload-details.folowSteps.info2" />
                {/* Sign sell order */}
              </div>
              <div className={styles.text}>
                <IntlMessages id="upload-details.folowSteps.text2" />
                {/* Sign sell order using your wallet */}
              </div>
            </div>
          </div>
          <button className={cn("button error", styles.button)}>
            <IntlMessages id="upload-details.folowSteps.button2" />
            {/* Failed */}
          </button>
        </div>
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="bag" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <IntlMessages id="upload-details.folowSteps.info3" />
                {/* Sign lock order */}
              </div>
              <div className={styles.text}>
                <IntlMessages id="upload-details.folowSteps.text3" />
                {/* Sign lock order using your wallet */}
              </div>
            </div>
          </div>
          <button className={cn("button", styles.button)}>
            <IntlMessages id="upload-details.folowSteps.button3" />
            {/* Start now */}
          </button>
        </div>
      </div>
      <div className={styles.note}>
        <IntlMessages id="upload-details.folowSteps.note" />
        {/* Something went wrong, please */}
        <a href="/#" target="_blank" rel="noopener noreferrer">
          <IntlMessages id="upload-details.folowSteps.link" />
          {/* try again */}
        </a>
      </div>
    </div>
  );
};

export default FolowSteps;
