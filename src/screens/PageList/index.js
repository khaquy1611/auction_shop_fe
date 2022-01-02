import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./PageList.module.sass";
import IntlMessages from "../../i18n/IntlMessages";

const PageList = () => {
  return (
    <div className={styles.page}>
      <div className={cn("container", styles.container)}>
        <p>
          <Link to="/">
            <IntlMessages id="pageList.link1" />
            {/* Home Page */}
          </Link>
        </p>
        <p>
          <Link to="/upload-variants">
            <IntlMessages id="pageList.link2" />
            {/* Upload Variants */}
          </Link>
        </p>
        <p>
          <Link to="/upload-details">
            <IntlMessages id="pageList.link3" />
            {/* Upload Details */}
          </Link>
        </p>
        <p>
          <Link to="/connect-wallet">
            <IntlMessages id="pageList.link4" />
            {/* Connect wallet */}
          </Link>
        </p>
        <p>
          <Link to="/faq">
            <IntlMessages id="pageList.link5" />
            {/* FAQ */}
          </Link>
        </p>
        <p>
          <Link to="/activity">
            <IntlMessages id="pageList.link6" />
            {/* Activity */}
          </Link>
        </p>
        <p>
          <Link to="/search01">
            <IntlMessages id="pageList.link7" />
            {/* Search01 */}
          </Link>
        </p>
        <p>
          <Link to="/search02">
            <IntlMessages id="pageList.link8" />
            {/* Search02 */}
          </Link>
        </p>
        <p>
          <Link to="/profile">
            <IntlMessages id="pageList.link9" />
            {/* Profile */}
          </Link>
        </p>
        <p>
          <Link to="/my-profile">
            <IntlMessages id="pageList.link10" />
            {/* Profile Edit */}
          </Link>
        </p>
        <p>
          <Link to="/item">
            <IntlMessages id="pageList.link11" />
            {/* Item */}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageList;
