import React from "react";
import cn from "classnames";
import styles from "./TextArea.module.sass";

const TextArea = ({className, label, onChange , defaultValue,...props}) => {
    return (
        <div className={cn(styles.field, className)}>
            {label && <div className={styles.label}>{label}</div>}
            <div className={styles.wrap}>
                <textarea className={styles.textarea} onChange={onChange} defaultValue={defaultValue} {...props} />
            </div>
        </div>
    );
};

export default TextArea;
