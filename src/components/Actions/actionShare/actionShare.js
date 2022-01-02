import cn from "classnames";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Icon from "../../Icon";
import styles from "./share.module.sass";
import {
  FacebookIcon,
  TwitterIcon,
  TumblrIcon,
  RedditIcon,
  PinterestIcon,
  FacebookShareButton,
  PinterestShareButton,
  TumblrShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share";

const ShareSocial = ({ className, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalTransfer, setVisibleModalTransfer] = useState(false);
  const [visibleModalRemoveSale, setVisibleModalRemoveSale] = useState(false);
  const [visibleModalBurn, setVisibleModalBurn] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);

  const items = [
    {
      title: "Facebook",
      icon: FacebookIcon,
      share: FacebookShareButton,
      url: window.location.href,
    },
    {
      title: "Twitter",
      icon: TwitterIcon,
      share: TwitterShareButton,
      url: window.location.href,
    },
    {
      title: "Pinterest",
      icon: PinterestIcon,
      share: PinterestShareButton,
      url: window.location.href,
    },
    {
      title: "Reddit",
      icon: RedditIcon,
      share: RedditShareButton,
      url: window.location.href,
    },
    {
      title: "Tumblr",
      icon: TumblrIcon,
      share: TumblrShareButton,
      url: window.location.href,
    },
  ];

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div
          className={cn(styles.actions, className, {
            [styles.active]: visible,
          })}
        >
          <button
            className={cn("button-circle-stroke", styles.button)}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="share" size="24" />
          </button>
          <div className={styles.body}>
            {items.map((x, index) => (
              <React.Fragment key={index}>
                {x.title === "Pinterest" ? (
                  <div className={styles.item} >
                    <x.share url={x.url} media={x.url}>
                      <x.icon size={20} round={true} />
                      <span>{x.title}</span>
                    </x.share>
                  </div>
                ) : (
                  <div className={styles.item}>
                    <x.share url={x.url} media={x.url}>
                      <x.icon size={20} round={true} />
                      <span>{x.title}</span>
                    </x.share>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
      {/* <Modal
        visible={visibleModalTransfer}
        onClose={() => setVisibleModalTransfer(false)}
      >
        <Transfer />
      </Modal>
      <Modal
        visible={visibleModalRemoveSale}
        onClose={() => setVisibleModalRemoveSale(false)}
      >
        <RemoveSale />
      </Modal>
      <Modal
        visible={visibleModalBurn}
        onClose={() => setVisibleModalBurn(false)}
      >
        <Burn />
      </Modal>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal> */}
    </>
  );
};

export default ShareSocial;
