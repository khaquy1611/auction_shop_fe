import React, { useEffect, useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./DropdownUpdateInfo.module.sass";
import Icon from "../Icon";

const DropdownObject = ({
  className,
  value,
  setValue,
  defaultValue,
  options,
  error,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
    setSearchTerm(value.label);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setVisible(true);
  };

  const results = !searchTerm
    ? options
    : options.filter((value) =>
        value.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          {!defaultValue ? (
            <>
              <input
                type="text"
                className={styles.selection}
                onChange={handleChange}
                value={searchTerm}
              />
              <div className={styles.arrow}>
                <Icon name="arrow-bottom" size="10" />
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                className={styles.selection}
                onChange={handleChange}
                defaultValue={defaultValue?.label}
              />
              <div className={styles.arrow}>
                <Icon name="arrow-bottom" size="10" />
              </div>
            </>
          )}
        </div>
        {searchTerm === "" && <i className={styles.Icheck}>{error}</i>}
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
                {x.label}
              </div>
            ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownObject;
