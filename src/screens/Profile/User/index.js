import React, { useState } from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../../components/Icon";
import Report from "../../../components/Report";
import Modal from "../../../components/Modal";
import { Link } from "react-router-dom";
import { setLengthString } from "../../../constants/Utils";
import IntlMessages from "../../../i18n/IntlMessages";
import Actions from "../../../components/Actions";
import ShareSocial from "../../../components/Actions/actionShare/actionShare";
import {
  FacebookIcon,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  FacebookShareButton,
  TwitterShareButton,
  InstapaperIcon,
} from "react-share";
// import { isStepDivisible } from "react-range/lib/utils";

const shareUrlFacebook = "#";
const shareUrlTwitter = "#";

const User = (props) => {
  const { currentUser, className, item, user } = props;
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [checkCopy, setCheckCopy] = useState("");
  const [visibleModalReport, setVisibleModalReport] = useState(false);

  const copyAddress = (value) => {
    navigator.clipboard.writeText(value);
    setCheckCopy(value);

  };


  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          <img
            src={
              currentUser?.user_info?.avatar?.length > 0
                ? currentUser?.user_info?.avatar
                : "/images/photo_2021-11-26_15-52-36.jpg"
            }
            alt="Avatar"
          />
        </div>
        <div className={styles.name}>
          {(currentUser?.user_info?.displayName.length > 0 &&
            currentUser?.user_info?.displayName) ||
            (currentUser?.user_info?.displayName.length === 0 &&
              currentUser?.user_info?.userName.length > 0 &&
              setLengthString(currentUser?.user_info?.userName, 5, "...")) ||
            (currentUser?.user_info?.displayName.length === 0 &&
              currentUser?.user_info?.userName.length === 0 &&
              setLengthString(currentUser?.user_info?.email, 5, "..."))}
        </div>
        <div className={styles.code}>
          {currentUser?.address_flow !== "" && (
            <>
              <div className={styles.number}>{currentUser?.address_flow}</div>
              <div className={styles.styleCopyContainer}>
                <img
                  className={styles.copy}
                  onClick={() => copyAddress(currentUser?.address_flow)}
                  src="/images/content/iconCopy.svg"
                  alt="Icon"
                ></img>
                {checkCopy ? (
                  <div>
                    <div className={styles.styleCheck}>Copied</div>
                  </div>
                ) : (
                  <div>
                    <div className={styles.styleCheck}>Copy to clipboard</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className={styles.info}>{currentUser?.user_info?.bio}</div>

        <div className={cn(styles.options)}>
          {/* <div className={styles.btns}>
            <Link className={cn("button", styles.button)} to="/item">
              Follow
            </Link>
          </div> */}
          <div className={styles.btnItem}>
            <ShareSocial className={styles.actions} currentUser={currentUser} />
          </div>
          {/* {currentUser ? (
            <div className={styles.btnItem}>
              <button
                className={cn("button-circle-stroke", styles.button)}
                // onClick={() => setVisible(!visible)}
              >
                <Icon name="more" size="24" />
              </button> */}
          {/* <Actions className={styles.actions} /> */}
          {/* </div>
          ) : (
            ""
          )} */}
        </div>
        <div className={cn(styles.socials)}>
          <a href={currentUser?.user_info?.Social?.url_tw} target="_blank">
            <TwitterIcon size={20} round={true} />
          </a>
          <a href={currentUser?.user_info?.Social?.url_ins} target="_blank">
            <InstapaperIcon size={20} round={true} />
          </a>
          <a href={currentUser?.user_info?.Social?.url_fb} target="_blank">
            <FacebookIcon size={20} round={true} />
          </a>
        </div>
        {/* <div className={styles.link}>
          <Link to={"https://listencampaign.com/"}>
            <Icon name={"globe"} size="16" fill={"#777E91"} />
            <span>https://listencampaign.com/</span>
          </Link>
        </div> */}
        {/* <div className={styles.control}>
          <div className={styles.btns}>
            <button
              className={cn(
                "button button-small",
                { [styles.active]: visible },
                styles.button
              )}
              onClick={() => setVisible(!visible)}
            >
              <span>
                <IntlMessages id="user.follow" />
              </span>
              <span>
                <IntlMessages id="user.unfollow" />
              </span>
            </button>
            <button
              className={cn(
                "button-circle-stroke button-small",
                { [styles.active]: visibleShare },
                styles.button
              )}
              onClick={() => setVisibleShare(!visibleShare)}
            >
              <Icon name="share" size="20" />
            </button>
            <button
              className={cn("button-circle-stroke button-small", styles.button)}
              onClick={() => setVisibleModalReport(true)}
            >
              <span className={styles.more}>...</span>
            </button>
          </div>
          <div className={cn(styles.box, { [styles.active]: visibleShare })}>
            <div className={styles.stage}>
              <IntlMessages id="user.share" />
            </div>
            <div className={styles.share}>
              <TwitterShareButton
                className={styles.direction}
                url={shareUrlTwitter}
              >
                <span>
                  <Icon name="twitter" size="20" />
                </span>
              </TwitterShareButton>
              <FacebookShareButton
                className={styles.direction}
                url={shareUrlFacebook}
              >
                <span>
                  <Icon name="facebook" size="20" />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div className={styles.socials}>
          {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="20" />
            </a>
          ))}
        </div>
        <div className={styles.note}>
          <IntlMessages id="user.memberSince" /> Mar 15, 2021
        </div> */}
      </div>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal>
    </>
  );
};

export default User;
