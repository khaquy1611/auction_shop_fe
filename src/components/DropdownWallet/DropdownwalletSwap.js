import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./DropdownWalletSwap.module.sass";
import Icon from "../Icon";

const DropdownObject = ({ className, value, setValue, options }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = (value) => {
    setVisible(false);
    setValue(value);
  };
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>
            <img
              className={styles.selectionIcon}
              src={value?.icon}
              alt={value?.icon}
            />
            {value?.label}
            <img
              className={styles.selectionIcondot}
              src="/images/content/Ellipse 16.svg"
              alt={value?.value}
            />
            {value?.text}
            <div
              className={cn(styles.optionContent, {
                [styles.selectioned]: value?.value === value,
              })}
              onClick={() => handleClick(value?.value)}
            ></div>
          </div>
          <div className={styles.arrow}>
            <Icon name="arrow-bottom" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {options &&
            options.map((x, index) => (
              <div
                className={cn(styles.option, {
                  [styles.selectioned]: x?.value === value,
                })}
                onClick={() => handleClick(x, index)}
                key={index}
              >
                <img
                  className={styles.selectionIcon}
                  src={x?.icon}
                  alt={x?.icon}
                />
                {x?.label}
                <img
                  className={styles.selectionIcondot}
                  src="/images/content/Ellipse 16.svg"
                  alt={value?.value}
                />
                {x?.text}
                {x?.type && (
                  <>
                    <img
                      className={styles.selectionIcondot}
                      src="/images/content/Ellipse 16.svg"
                      alt={value?.value}
                    />
                    {x?.type}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownObject;
