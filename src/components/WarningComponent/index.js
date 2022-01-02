import React from "react";
import styles from "./Warning.module.sass";
import IntlMessages from "../../i18n/IntlMessages";
function WarningComponent(props) {
  const { title, content, onChange } = props;
  const handleOnclick = (event) => {
    onChange(event);
  };
  return (
    <div className={styles.warning}>
      <img src={"/images/content/info.svg"} alt={"icon"} />
      <div className={styles.warningContent}>
        <h4 className={styles.TitleDetail}>{title || ""}</h4>
        <div className={styles.SpnDetailItem}>
          <div className={styles.WarningItem}>
            <div>{content || ""}</div>{" "}
            <span
              className={styles.SpnDetail}
              onClick={(event) => handleOnclick(event)}
            >
              <IntlMessages id="warning.click" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarningComponent;
