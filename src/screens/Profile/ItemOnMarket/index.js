import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import CardPurchase from "../../../components/CardPurchaseMyItem/CardPurchase";

const ItemOnMarket = (props) => {
  const { className, item, callData, currentUser } = props;
  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {item &&
          item.map((x, index) => (
            <CardPurchase
              className={styles.card}
              item={x}
              key={index}
              id={index}
              callData={callData}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemOnMarket;
