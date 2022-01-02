import React, { useEffect, useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Icon from "../Icon";

const DropdownObject = ({ className, value, setValue, options ,defaulValue }) => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState(defaulValue);
  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(()=>{
    setSearchTerm(defaulValue)
  },[defaulValue])
  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
    setSearchTerm(value.iso);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setVisible(true);
  };

  const results = !searchTerm
    ? options
    : options.filter((value) =>
        value.iso.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <input
            type="text"
            className={styles.selectionS}
            onChange={handleChange}
            value={searchTerm}
          />
          <div className={styles.arrow}>
            <Icon name="arrow-bottom" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {results &&
            results.map((x, index) => (
              <div
                className={cn(styles.option, {
                  [styles.selectioned]: x.value === value,
                })}
                onClick={() => handleClick(x, index)}
                key={index}
              >
                {x.iso}&ensp;-&ensp;{x.currency_name}2
              </div>
            ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownObject;
