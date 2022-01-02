import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";
import {
  getUserProfileUsername,
  updateCurrentUserProfile,
} from "../../services/UserService";
import OOPS from "../../components/OOPS/index";
// data
import IntlMessages from "../../i18n/IntlMessages";
import {
  customGetCollectionLength,
  customReadCollectionIds,
  customeGetMetaData,
} from "../../apiContract/listenNFT";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as _ from "lodash";
import S3 from "react-aws-s3";
import { config } from "../../constants/constants";
import {
  customGetMarket,
  customGetListing,
} from "../../apiContract/listenMarketplace";
import ItemMarket from "./ItemOnMarket";

const navLinks = [
  <IntlMessages id="myItem.menu.onSale" />,
  <IntlMessages id="myItem.menu.collectibles" />,
  // <IntlMessages id="myItem.menu.created" />,
  // <IntlMessages id="myItem.menu.likes" />,
  // <IntlMessages id="myItem.menu.following" />,
  // <IntlMessages id="myItem.menu.followers" />,
];

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [photoBg, setPhotoBg] = useState("");
  const [sendBG, setSendBG] = useState();
  const [dataCurrrentMarketPlace, setDataCurrentMarketPlace] = useState(); //
  const history = useHistory();
  const user = useSelector((state) => state.app.user);
  const { userName } = useParams();
  const getUserProfile = () => {
    getUserProfileUsername(userName)
      .then(async (res) => {
        setCurrentUser(res);
        setPhotoBg(res?.user_info?.cover_photo);
        const resCollecttion = await customReadCollectionIds(res?.address_flow);
        const dataTemp = [];
        resCollecttion.map(async (item) => {
          const dataMeta = await customeGetMetaData(res?.address_flow, item);
          dataTemp.push(dataMeta);
          setDataCurrentMarketPlace(dataTemp);
        });
        handleCallMarketPlace(res?.address_flow);
      })
      .catch((errorMessage) => {
        history.push("/404");
      });
  };

  const handleCallMarketPlace = (event) => {
    const dataMartket = [];
    customGetMarket(event).then((res) => {
      res.map(async (item) => {
        const mpItem = await customGetListing(event, item);
        const nft = await customeGetMetaData(event, mpItem.nftIDs[0]);
        dataMartket.push({ item, nft, mpItem });
        setDataItem([...dataMartket]);
      });
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleUploadBackGr = (value) => {
    if (value.target.files && value.target.files[0]) {
      let reader = new FileReader();
      let file = value.target.files[0];
      setSendBG(file);
      reader.onloadend = () => {
        setPhotoBg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSavePhoto = () => {
    setVisible(false);
    new S3(config).uploadFile(sendBG, `${sendBG?.name}`).then((res) => {
      updateCurrentUserProfile({ coverPhoto: res?.location }).then((res) => {
        setPhotoBg(res.cover_photo);
        getUserProfile();
      });
    });
  };
  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage:
            photoBg !== ""
              ? `url(${photoBg})`
              : `url(/images/content/bg-profile.jpg)`,
        }}
      >
        <div className={cn("container", styles.container)}>
          {user && (
            <React.Fragment>
              <div className={styles.btns}>
                <button
                  className={cn("button-stroke button-small", styles.button)}
                  onClick={() => setVisible(true)}
                >
                  <span>
                    <IntlMessages id="user.editCover" />
                  </span>
                  <Icon name="edit" size="16" />
                </button>
                <Link
                  className={cn("button-stroke button-small", styles.button)}
                  to="/my-profile"
                >
                  <span>
                    <IntlMessages id="user.editProfile" />
                  </span>
                  <Icon name="image" size="16" />
                </Link>
              </div>
            </React.Fragment>
          )}
          <div className={styles.file}>
            <input type="file" onChange={handleUploadBackGr} />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>
                <IntlMessages id="user.dragPhoto" />
              </div>
              <div className={styles.text}>
                <IntlMessages id="user.browsePhoto" />
              </div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={sendBG !== undefined ? handleSavePhoto : ""}
            >
              <IntlMessages id="user.savePhoto" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <User className={styles.user} currentUser={currentUser} />
          <div className={styles.wrapperContainer}>
            <div className={styles.wrapper}>
              <div className={styles.nav}>
                {navLinks?.map((x, index) => (
                  <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    key={index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className={styles.group}>
                <div className={styles.item}>
                  <>
                    {activeIndex === 0 && dataItem && dataItem.length > 0 && (
                      <ItemMarket
                        class={styles.items}
                        item={dataItem}
                        callData={getUserProfile}
                        currentUser={currentUser}
                      />
                    )}
                    {activeIndex === 1 &&
                      dataCurrrentMarketPlace &&
                      dataCurrrentMarketPlace.length > 0 && (
                        <Items
                          class={styles.items}
                          item={dataCurrrentMarketPlace}
                          callData={getUserProfile}
                          currentUser={currentUser}
                        />
                      )}
                    {/* {activeIndex === 2 && (
                        <Items class={styles.items} items={bids.slice(0, 2)} />
                      )}
                      {activeIndex === 3 && (
                        <Items class={styles.items} items={bids.slice(0, 3)} />
                      )} */}
                    {/* {activeIndex === 4 && (
                      <Followers className={styles.followers} items={[]} />
                    )}
                    {activeIndex === 5 && (
                      <Followers className={styles.followers} items={[]} />
                    )} */}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
