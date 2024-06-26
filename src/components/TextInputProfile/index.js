import React from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";

const TextInput = ({className, label, onChange,...props}) => {
    return (
        <div className={cn(styles.field, className)}>
            {label && <div className={styles.label}>{label}</div>}
            <div className={styles.wrap}>
                <input className={styles.input} onChange={onChange} {...props}/>
            </div>
        </div>
    );
};

export default TextInput;
