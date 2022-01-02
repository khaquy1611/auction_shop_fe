import React, { useState } from "react";
import cn from "classnames";
import styles from "./Privacy.module.sass";
import { handlerTerm } from "../../services/Tern";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../actions/AppActions";
import { getCurrentUserProfile } from "../../services/UserService";
import IntlMessages from "../../i18n/IntlMessages";
function Privacy(props) {
  const [checked, setCheked] = useState(false);
  const dispatch = useDispatch();
  const callApiTern = () => {
    if (!checked) {
      return;
    } else {
      handlerTerm()
        .then((res) => {
          if (res?.Success) {
            getCurrentUserProfile().then((res) => {
              localStorage.setItem("ACCEPT_TERN", res.accept_terms);
              dispatch(
                doLoginAction({
                  user: res,
                })
              );
              window.location.reload();
            });
          } else {
          }
        })
        .catch((err) => {
          let error = err;
          return error;
        });
    }
  };

  const handlerCheck = () => {
    setCheked(!checked);
  };

  return (
    <div className={styles.modal_overlay}>
      <div
        className={`${styles.tern} ${styles.tabletprivacy} ${styles.mobileprivacy} ${styles.desktopprivacy}}`}
      >
        <div className={styles.sub}>
          <h1 className={styles.heading}>
            <IntlMessages id="privacy.h1" />
            {/* Terms and conditions */}
          </h1>
          <div className={`${styles.flex} ${styles.spacing_top}`}>
            <div>
              <img src="/images/content/icons-tern.svg" alt="" />
            </div>

            <div className={styles.spacing}>
              <h1 className={styles.text}>
                <IntlMessages id="privacy.text" />
                {/* These Terms contain IMPORTANT information about your Rights and
                Obligations */}
              </h1>
              <div className={styles.priLink}>
                <img src="/images/content/icons-tern-1.svg" alt="" />
                <a className={styles.href} href="#">
                  https://nft.listencampaign.com/term/LCAS-Terms-of-Use.pdf
                </a>
              </div>
            </div>
          </div>

          <div className={styles.flex}>
            <div>
              <img src="/images/content/icons-tern.svg" alt="" />
            </div>
            <div className={styles.spacing}>
              <h1 className={styles.text}>
                <IntlMessages id="privacy.text1" />
                {/* This Privacy Policy applies only to our online activities of the
                Site */}
              </h1>
              <div className={styles.priLink}>
                <img src="/images/content/icons-tern-1.svg" alt="" />
                <a className={styles.href} href="#">
                  https://nft.listencampaign.com/term/LCAS-Privacy-Policy.pdf
                </a>
              </div>
            </div>
          </div>

          <div
            className={`${styles.flex} ${styles.spacing} ${styles.spacing_top1}`}
          >
            <div className={styles.formCheckbox}>
              <input
                onClick={handlerCheck}
                className={styles.input}
                type="checkbox"
                id="checkbox1"
              />
              <label
                className={styles.label}
                htmlFor="checkbox1"
                tabIndex={1}
              ></label>
            </div>

            <p className={`${styles.spacing} ${styles.p}`}>
              <IntlMessages id="privacy.p" />
              {/* Yes, I agree to the terms and conditions */}
            </p>
          </div>
          <div>
            <button
              onClick={callApiTern}
              disabled={!checked}
              className={`${
                checked
                  ? `${cn("btn", styles.btn1)}`
                  : `${cn("btn1", styles.btn)}`
              }  ${styles.mobilebtn}`}
            >
              <IntlMessages id="privacy.btn" />
              {/* Agree */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Privacy);
