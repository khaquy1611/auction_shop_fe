import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import * as _ from "lodash";
import Skeleton from "react-loading-skeleton";
import BeatLoader from "react-spinners/BeatLoader";
const CardMarket = (props) => {
  const { className } = props;
  return (
    <div
      className={cn(styles.card, className)}
    >
      <div className={styles.preview}>
        <div style={{ width: '250px', height: '150px', display: 'flex', backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center' }}>
          <BeatLoader loading={true} color="#ee4e00" size={10} />
        </div>
        <div className={styles.control}>
          {/* add icon plus */}

          <button
            className={cn(styles.plus)}
            target="_black"
          >
            <img
              className={styles.search}
              src="/images/ipfs.svg"
              alt="Search"
            />
          </button>

        </div>
      </div>
      <Link className={styles.link}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>
              <Skeleton width={100} />
              <Skeleton width={50} />
            </div>
          </div>
          <div className={styles.time}>
            <div className={styles.logTime}>
              <Skeleton width={130} />
            </div>
          </div>
          <div>
            <div className={styles.des}>
              <span className={styles.spaB}>
                <Skeleton width={50} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(CardMarket);
