import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import CardPurchase from "../../../components/CardPurchaseMyItem/CardPurchase";

const Items = (props) => {
  const { className, item ,currentUser} = props;
  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {item &&
          item.map((x, index) => (
            <Card className={styles.card} dataTemp={x} key={index} currentUser={currentUser}/>
          ))}
      </div>
    </div>
  );
};

export default Items;
