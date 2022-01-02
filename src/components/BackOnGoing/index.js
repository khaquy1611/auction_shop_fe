import React, { useState, useEffect } from "react";
import styles from "./BackToTop.module.sass";
import icon from "./images/gif-ri_auction-line.gif";
import { useLocation, useHistory } from "react-router";
import IntlMessages from "../../i18n/IntlMessages";
import { PATH_ROUTES } from '../../constants/Path'

function BackOnGoing() {
  const [is_visible, setIsVisible] = useState(false);
  const location = useLocation();
  const history = useHistory()

  const scrollToTop = () => {
    history.push(PATH_ROUTES.upcomingdrops)
  };

  return (
    <>
      {location.pathname == "/" && (
        <div className={styles.backToTop}>
          <div className={styles.ImgBtn}>
            <img className={styles.ImgGif} src={icon} alt="Go to top" />
          </div>
          <div onClick={scrollToTop} className={styles.backToTop2}>
            <IntlMessages id="backOnGoing.back" />
            {/* Upcoming */}
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(BackOnGoing);
