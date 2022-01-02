import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import IntlMessages from "../../../../i18n/IntlMessages";
import Faq1 from "./Faq1";
import Faq2 from "./Faq2";
import Faq3 from "./Faq3";
import Faq4 from "./Faq4";
import Faq5 from "./Faq5";
import Faq6 from "./Faq6";
import Faq7 from "./Faq7";
import Faq8 from "./Faq8";
import Faq9 from "./Faq9";
import Faq10 from "./Faq10";
import Faq11 from "./Faq11";
import Faq12 from "./Faq12";
const Preview = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.item, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        <IntlMessages id={"Preview." + item?.id} />
        {/* {item?.name} */}
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          {item?.id === 1 && <Faq1 />}
          {item?.id === 2 && <Faq2 />}
          {item?.id === 3 && <Faq3 />}
          {item?.id === 4 && <Faq4 />}
          {item?.id === 5 && <Faq5 />}
          {item?.id === 6 && <Faq6 />}
          {item?.id === 7 && <Faq7 />}
          {item?.id === 8 && <Faq8 />}
          {item?.id === 9 && <Faq9 />}
          {item?.id === 10 && <Faq10 />}
          {item?.id === 11 && <Faq11 />}
          {item?.id === 12 && <Faq12 />}
        </div>
        {/* <button className={cn("button-stroke button-small", styles.button)}>
          <IntlMessages id="faq.hero.item.button" />
        </button> */}
      </div>
    </div>
  );
};

export default Preview;
