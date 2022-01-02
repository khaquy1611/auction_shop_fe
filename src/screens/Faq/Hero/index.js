import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Dropdown from "../../../components/Dropdown/DropdownFaq";
import Icon from "../../../components/Icon";
import Item from "./Item";
import IntlMessages from "../../../i18n/IntlMessages";

const items = [
  {
    title: "Getting started",
    icon: "home",
    items: [
      {
        name: "What is an NFT?",
        id: 1,
      },
      {
        name: "What is the Listen Campaign?",
        id: 2,
      },
      {
        name: "What is the Listen Auction Shop?",
        id: 3,
      },
      {
        name: "What is a $LSTN token?",
        id: 4,
      },
      {
        name: "How to sign up for LCAS?",
        id: 5,
      },
    ],
  },
  {
    title: "Deposit and withdraw ",
    icon: "circle-and-square",
    items: [
      {
        name: "How can I connect wallet on LCAS?",
        id: 6,
      },
      {
        name: "How can I deposit money to the wallet?",
        id: 7,
      },
      {
        name: "Which blockchains does LCAS support? Pros and cons of each one (Gas fee, tx time etc)?",
        id: 8,
      },
      {
        name: "How to see my transaction status?",
        id: 9,
      },
    ],
  },
  {
    title: "Bidding and items",
    icon: "lightning",
    items: [
      {
        name: "How to join bidding to get NFT on LCAS?",
        id: 10,
      },
      {
        name: "How can I send my NFT to others?",
        id: 11,
      },
      {
        name: "How to sell my NFT? Can I mint a new one?",
        id: 12,
      },
    ],
  },
];

const Hero = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [direction, setDirection] = useState(options[0]);

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <h1>
            <IntlMessages id="faq.hero.stage" />
          </h1>
          <Dropdown
            className={cn("mobile-show", styles.dropdown)}
            value={direction}
            setValue={setDirection}
            options={options}
          />
        </div>
        <div className={styles.row}>
          <div>
            <div className={styles.nav}>
              {items.map((x, index) => (
                <div
                  className={cn(styles.link, {
                    [styles.active]: x.title === direction,
                  })}
                  onClick={() => setDirection(x.title)}
                  key={index}
                >
                  <Icon name={x.icon} size="16" />
                  <span>
                    <IntlMessages id={"Faq.hero.item." + x.icon} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            {items
              .find((x) => x.title === direction)
              .items.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
