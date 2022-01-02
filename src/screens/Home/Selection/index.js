import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Selection.module.sass";
import Icon from "../../../components/Icon";
import Connect from "../../../components/Connect";
import Bid from "../../../components/Bid";
import Modal from "../../../components/Modal";
import IntlMessages from "../../i18n/IntlMessages";

const items = [
  {
    title: "The future of USD®",
    content: "Highest bid",
    counter: "18 in stock",
    price: "1,000 USD",
    url: "/item",
    avatar: "/images/content/avatar-1.jpg",
    image: "/images/content/selection-pic-1.jpg",
    image2x: "/images/content/selection-pic-1@2x.jpg",
  },
  {
    title: " ART never die",
    content: "1 of 12",
    price: "1,000 USD",
    url: "/item",
    avatar: "/images/content/avatar-4.jpg",
    image: "/images/content/selection-pic-2.jpg",
    image2x: "/images/content/selection-pic-2@2x.jpg",
  },
  {
    title: "Future coming soon",
    content: "1 of 3",
    price: "1,000 USD",
    url: "/item",
    avatar: "/images/content/avatar-3.jpg",
    image: "/images/content/selection-pic-1.jpg",
    image2x: "/images/content/selection-pic-1@2x.jpg",
  },
  {
    title: "Elon Musk silver coin 3d print",
    content: "1 of 4",
    price: "1,000 USD",
    url: "/item",
    avatar: "/images/content/avatar-4.jpg",
    image: "/images/content/selection-pic-3.jpg",
    image2x: "/images/content/selection-pic-3@2x.jpg",
  },
];

const users = [
  {
    name: "Payton Harris",
    price: "<span>2.456</span> USD",
    counter: "6",
    avatar: "/images/content/avatar-1.jpg",
  },
  {
    name: "Anita Bins",
    price: "<span>2.456</span> USD",
    counter: "2",
    avatar: "/images/content/avatar-2.jpg",
  },
  {
    name: "Joana Wuckert",
    price: "<span>2.456</span> USD",
    counter: "3",
    avatar: "/images/content/avatar-3.jpg",
  },
  {
    name: "Lorena Ledner",
    price: "<span>2.456</span> USD",
    counter: "4",
    avatar: "/images/content/avatar-4.jpg",
  },
];

const Selection = () => {
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  return (
    <div className={cn("section-pb", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            {items.map(
              (x, index) =>
                index === 0 && (
                  <Link className={styles.card} to={x.url} key={index}>
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Selection"
                      />
                    </div>
                    <div className={styles.head}>
                      <div className={styles.line}>
                        <div className={styles.avatar}>
                          <img src={x.avatar} alt="Avatar" />
                        </div>
                        <div className={styles.description}>
                          <div className={styles.title}>{x.title}</div>
                          <div className={styles.counter}>{x.counter}</div>
                        </div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.content}>{x.content}</div>
                        <div className={styles.price}>{x.price}</div>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
          <div className={styles.col}>
            {items.map(
              (x, index) =>
                index > 0 && (
                  <Link className={styles.item} to={x.url} key={index}>
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Selection"
                      />
                    </div>
                    <div className={styles.description}>
                      <div className={styles.title}>{x.title}</div>
                      <div className={styles.line}>
                        <div className={styles.avatar}>
                          <img src={x.avatar} alt="Avatar" />
                        </div>
                        <div className={styles.price}>{x.price}</div>
                        <div className={styles.content}>{x.content}</div>
                      </div>
                      <button
                        className={cn(
                          "button-stroke button-small",
                          styles.button
                        )}
                        onClick={() => setVisibleModalBid(true)}
                      >
                        <IntlMessages id="selection.btn" />
                        {/* Place a bid */}
                      </button>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.info}>
            <IntlMessages id="selection.info" />
            {/* Latest upload from creators */}
            <span className={styles.smile} role="img" aria-label="fire">
              🔥
            </span>
          </div>
          <div className={styles.list}>
            {users.map((x, index) => (
              <div className={styles.user} key={index}>
                <div className={styles.avatar}>
                  <img src={x.avatar} alt="Avatar" />
                  <div className={styles.number}>{x.counter}</div>
                </div>
                <div className={styles.description}>
                  <div className={styles.name}>{x.name}</div>
                  <div
                    className={styles.money}
                    dangerouslySetInnerHTML={{ __html: x.price }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            className={cn("button-stroke button-small", styles.button)}
            to="/search01"
          >
            <span>
                <IntlMessages id="selection.link"/>
                {/* Discover more */}
                </span>
            <Icon name="arrow-next" size="10" />
          </Link>
        </div>
      </div>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Connect />
        <Bid />
      </Modal>
    </div>
  );
};

export default Selection;
