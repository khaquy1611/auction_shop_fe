import React from "react";
import cn from "classnames";
import styles from "./Options.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";
import IntlMessages from "../../../i18n/IntlMessages";
import { useSelector } from "react-redux";
import ShareSocial from "../../../components/Actions/actionShare/actionShare";

const Options = ({ className, items }) => {
  const user = useSelector((state) => state.app.user);

  return (
    <div className={cn(styles.options, className)}>
      <div className={styles.btnItem}>
        <span>
          <IntlMessages id="itemDetail.share" />
        </span>
        <ShareSocial className={styles.actions} />
        {/* <FacebookShareButton url={'https://testnet.pentawork.com/'}>
          <span>
            <IntlMessages id="itemDetail.share" />
          </span>
          <button className={cn("button-circle-stroke", styles.button)}>
            <Icon name="share" size="24" />
          </button>
        </FacebookShareButton> */}
      </div>
      <div className={styles.btnItem}>
        <span>
          <IntlMessages id="itemDetail.action.report" />
        </span>
        <button
          className={cn("button-circle-stroke", styles.button, styles.favorite)}
        >
          <Icon name="info-circle" size="24" />
        </button>
      </div>
      {/* {user ? (
        <div className={styles.btnItem}>
          <span>
            <IntlMessages id="itemDetail.more" />
          </span>
          <Actions className={styles.actions} />
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Options;
