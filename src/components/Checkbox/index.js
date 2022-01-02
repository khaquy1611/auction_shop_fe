import React from "react";
import cn from "classnames";
import styles from "./Checkbox.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const Checkbox = ({ className, content, value, onChange }) => {
  return (
    <label className={cn(styles.checkbox, className)}>
      <input
        className={styles.input}
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
      <span className={styles.inner}>
        <span className={styles.tick}></span>
        <strong className={styles.text}>
          <IntlMessages id={"filter.checkbox." + content} />
        </strong>
      </span>
    </label>
  );
};

export default Checkbox;
