import React from "react";
import cn from "classnames";
import styles from "./ProfileEdit.module.sass";
import Control from "../../components/Control";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown/DropdownObject";
import DropdownCurrency from "../../components/Dropdown/DropdownCurrency";
import Modal from "../../components/Modal";
import ZipPopup from "./PopUpZipCode/index";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../../services/UserService";
import {
  getListCurrency,
  getListCurrentCurrency,
} from "../../services/CurrencyService";
import IntlMessages from "../../i18n/IntlMessages";
import {
  languages,
  listCurrency,
  config,
  breadcrumbs,
} from "../../constants/constants";
import { FormattedMessage } from "react-intl";
import S3 from "react-aws-s3";
import * as _ from "lodash";
import BillingAddress from "./BillingAddress";
import { toast } from "react-toastify";
import { getTax } from "../../services/Tax";

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarDf: "/images/photo_2021-11-26_15-52-36.jpg",
      avatar: "",
      profile: null,
      language: languages[0],
      currency: [],
      valueCurrenct: null,
      valueProfile: null,
      defaulValue: null,
      inputList: [],
      errors: {},
      checkCopy: "",
      checkBtnOnUpdate: false,
      tax: null,
      popUpZipCode: false,
    };
  }

  handleAddInput = () => {
    this.setState({
      inputList: [
        ...this.state.inputList,
        { label: "Facebook", message: "facebook", url: "" },
        { label: "Instagram", message: "instagram", url: "" },
      ],
    });
  };

  async componentDidMount() {
    getListCurrency().then((res) => {
      this.setState({
        currency: res?.data?.currencies,
      });
    });
    await getCurrentUserProfile()
      .then((res) => {
        this.setState({
          profile: res,
        });
        if (res?.Social?.url_fb?.length > 0) {
          this.setState({
            inputList: [
              ...this.state.inputList,
              {
                label: "Facebook",
                message: "facebook",
                url: res?.Social?.url_fb,
              },
            ],
          });
        }
        if (res?.Social?.url_ins?.length > 0) {
          this.setState({
            inputList: [
              ...this.state.inputList,
              {
                label: "Instagram",
                message: "instagram",
                url: res?.Social?.url_ins,
              },
            ],
          });
        }
        if (res.language.length > 0) {
          this.setState({
            language: _.find(languages, ["value", res.language]),
          });
        }
        if (res.currency.length > 0) {
          getListCurrentCurrency(res?.currency).then((res) => {
            const currencyTemp = res?.data?.currencies[0];
            this.setState({
              defaulValue: currencyTemp,
            });
          });
        }
      })
      .catch((err) => {});
  }

  changeLanguage = (lang) => {
    this.setState({
      language: lang,
    });
  };

  changeCurrency = (currency) => {
    this.setState({
      valueCurrenct: currency,
    });
  };

  onChangeValue = (value) => {
    value.preventDefault();
    if (value.target.files && value.target.files[0]) {
      let reader = new FileReader();
      let file = value.target.files[0];
      reader.onloadend = () => {
        this.setState({
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
      new S3(config).uploadFile(file, `${file.name}`).then((res) => {
        this.setState({
          valueProfile: {
            ...this.state.valueProfile,
            img: res.location,
          },
        });
      });
    }
    if (value.target.name === "userName") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          userName: value.target.value,
        },
      });
    }

    if (value.target.name === "Name") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          name: value.target.value,
        },
      });
    }
    if (value.target.name === "img") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          img: value.target.value,
        },
      });
    }
    if (value.target.name === "Url") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          Url: value.target.value,
        },
      });
    }
    if (value.target.name === "Bio") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          Bio: value.target.value,
        },
      });
    }
    if (value.target.name === "Twitter") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          Twitter: value.target.value,
        },
      });
    }
    if (value.target.name === "Facebook") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          Facebook: value.target.value,
        },
      });
    }
    if (value.target.name === "Instagram") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          Instagram: value.target.value,
        },
      });
    }
  };

  onChangeBilling(name, event) {
    if (name === "address") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          address: event,
        },
        tax: {
          address: event,
        },
      });
    }
    if (name === "Country") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          country: `${event?.iso2}`,
        },
      });
      this.setState({
        tax: {
          ...this.state.tax,
          country: event,
        },
      });
    }
    if (name === "State") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          stateProvider: `${event?.state_code}`,
        },
      });
      this.setState({
        tax: {
          ...this.state.tax,
          stateProvider: event,
        },
      });
    }
    if (name === "Select") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          city: `${event?.value}`,
        },
      });
      this.setState({
        tax: {
          ...this.state.tax,
          city: event,
        },
      });
    }
    if (name === "zipcode") {
      this.setState({
        valueProfile: {
          ...this.state.valueProfile,
          zipcode: event,
        },
      });
      this.setState({
        tax: {
          ...this.state.tax,
          zipcode: event,
        },
      });
    }
  }
  onUpdate() {
    const paramSend = {};
    const errors = {};
    const ParamTax = {};
    paramSend.userName =
      this.state.valueProfile?.userName || this.state.profile.userName;
    paramSend.displayName =
      this.state.valueProfile?.name || this.state.profile.displayName;
    paramSend.customUrl =
      this.state.valueProfile?.Url || this.state.profile.customUrl;
    paramSend.bio = this.state.valueProfile?.Bio || this.state.profile.bio;
    paramSend.avatar =
      this.state.valueProfile?.img || this.state.profile.avatar;
    paramSend.language =
      this.state.language.value || this.state.profile.language;
    paramSend.currency =
      this.state.valueCurrenct?.iso || this.state.profile?.currency;

    paramSend.twitter =
      this.state.valueProfile?.Twitter || this.state.profile?.url_tw;
    paramSend.facebook =
      this.state.valueProfile?.Facebook || this.state.profile?.url_fb;
    paramSend.instagram =
      this.state.valueProfile?.Instagram || this.state.profile?.url_ins;

    paramSend.address =
      this.state.valueProfile?.address || this.state.profile?.address;
    paramSend.city = this.state.valueProfile?.city || this.state.profile?.city;
    paramSend.country =
      this.state.valueProfile?.country || this.state.profile?.country;
    paramSend.province =
      this.state.valueProfile?.stateProvider || this.state.profile?.province;
    paramSend.zipcode =
      this.state.valueProfile?.zipcode || this.state.profile?.zipcode;

    if (this.state?.valueProfile?.address?.length === 0) {
      errors.billing = "Billing cannot be empty";
    }
    if (this.state?.valueProfile?.country?.length === 0) {
      errors.country = "Country cannot be empty";
    }
    if (this.state?.valueProfile?.province?.length === 0) {
      errors.province = "Province cannot be empty";
    }
    if (this.state?.valueProfile?.city?.length === 0) {
      errors.city = "City cannot be empty";
    }
    if (this.state?.valueProfile?.zipcode?.length === 0) {
      errors.zipcode = "Zipcode cannot be empty";
    }
    this.setState({
      errors: { ...this.state.errors, ...errors },
    });

    ParamTax.line1 = this.state.tax?.address || this.state.profile?.address;
    ParamTax.postalCode =
      this.state.tax?.zipcode || this.state.profile?.zipcode;
    ParamTax.country =
      this.state.tax?.country?.iso2 || this.state.profile?.country;
    ParamTax.region =
      this.state.tax?.stateProvider?.state_code || this.state.profile?.province;
    ParamTax.city = this.state.tax?.city?.label || this.state.profile?.city;
    if (paramSend) {
      getTax(ParamTax)
        .then((res) => {
          paramSend.tax = res?.summary[0]?.rate;
          updateCurrentUserProfile(paramSend)
            .then((res) => {
              if(Object.keys(errors).length === 0 && errors.constructor === Object) {
                toast.success("Update success");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              }
            })
            .catch((err) => {
              console.log("err", err);
              this.setState({
                popUpZipCode: true,
              });
            });
        })
        .catch((err) => {
          console.log("err", err);
          this.setState({
            popUpZipCode: true,
          });
        });
    } else {
      console.log("Error");
    }
  }

  handlecopyProfile = (profile) => {
    const hostName = window.location.host;
    navigator.clipboard.writeText(`${hostName}/profile/${profile?.userName}`);
    this.setState({
      checkCopy: `${profile?.userName}`,
    });
  };

  handleClickBtn = (values) => {};

  render() {
    const hostName = window.location.host;
    const {
      checkCopy,
      profile,
      language,
      errors,
      currency,
      checkBtnOnUpdate,
      avatar,
      avatarDf,
      valueCurrenct,
      defaulValue,
      inputList,
    } = this.state;
    return (
      <div className={styles.page}>
        <Control className={styles.control} item={breadcrumbs} />
        {profile && (
          <div className={cn("section-pt80", styles.section)}>
            <div className={cn("container", styles.container)}>
              <div className={styles.top}>
                <div className={styles.ProfileEditContaiNer}>
                  <div>
                    <h1 className={cn("h2")}>
                      <IntlMessages id="profile.editProfile" />
                    </h1>
                  </div>
                  <div className={styles.btns}>
                    <button className={styles.clear}>
                      <Icon name="circle-close" size="24" />
                      <IntlMessages id="profile.clearAll" />
                    </button>
                    <button
                      className={cn("button", styles.button)}
                      onClick={() => this.onUpdate()}
                    >
                      <IntlMessages id="profile.updateProfile" />
                    </button>
                  </div>
                </div>
                <div className={styles.info}>
                  <IntlMessages id="profile.description1" />
                  <strong>
                    <IntlMessages id="profile.description2" />
                  </strong>
                  <IntlMessages id="profile.description3" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.user}>
                    <div className={styles.avatar}>
                      <img
                        src={
                          avatar
                            ? avatar
                            : profile?.avatar?.length > 0
                            ? profile?.avatar
                            : avatarDf
                        }
                        alt="Avatar"
                      />
                    </div>
                    <div className={styles.details}>
                      <div className={styles.stage}>
                        <strong>
                          <IntlMessages id="profile.photo" />
                        </strong>
                      </div>
                      <div className={styles.text}>
                        <IntlMessages id="profile.photo.description" />
                      </div>
                      <div className={styles.file}>
                        <button
                          className={cn(
                            "button-stroke button-small",
                            styles.button
                          )}
                        >
                          <IntlMessages id="profile.photo.upload" />
                        </button>
                        <input
                          className={styles.load}
                          name="img"
                          type="file"
                          onChange={this.onChangeValue}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 40 }} className={styles.user}>
                    <BillingAddress
                      onChangeValue={(name, event) =>
                        this.onChangeBilling(name, event)
                      }
                      profile={profile}
                      errorMessage={this.state.errors}
                    />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.list}>
                    <div className={styles.item}>
                      <div className={styles.category}>
                        <strong>
                          <IntlMessages id="profile.accountInfo" />
                        </strong>
                      </div>
                      <div className={styles.fieldset}>
                        <FormattedMessage
                          id="profile.userName.placeholder"
                          defaultMessage="Enter your username "
                        >
                          {(placeholder) => (
                            <TextInput
                              className={styles.field}
                              label={<IntlMessages id="profile.email" />}
                              onChange={this.onChangeValue}
                              name="userName"
                              type="text"
                              defaultValue={profile.email}
                              // ref={(username) => (this.username = username)}
                              placeholder={placeholder}
                              required
                            />
                          )}
                        </FormattedMessage>
                        <FormattedMessage
                          id="profile.userName.placeholder"
                          defaultMessage="Enter your username "
                        >
                          {(placeholder) => (
                            <TextInput
                              className={styles.field}
                              label={<IntlMessages id="profile.userName" />}
                              onChange={this.onChangeValue}
                              name="userName"
                              type="text"
                              defaultValue={profile.userName}
                              // ref={(username) => (this.username = username)}
                              placeholder={placeholder}
                              required
                            />
                          )}
                        </FormattedMessage>
                        <FormattedMessage
                          id="profile.displayName.placeholder"
                          defaultMessage="Enter your display name"
                        >
                          {(placeholder) => (
                            <TextInput
                              className={styles.field}
                              label={<IntlMessages id="profile.displayName" />}
                              onChange={this.onChangeValue}
                              name="Name"
                              type="text"
                              defaultValue={profile.displayName}
                              // ref={(displayName) =>
                              //   (this.displayName = displayName)
                              // }
                              placeholder={placeholder}
                              required
                            />
                          )}
                        </FormattedMessage>
                        <div
                          className={styles.field}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ width: "49%" }}>
                            <div className={styles.label}>
                              <IntlMessages id="profile.language" />
                            </div>
                            <Dropdown
                              className={styles.dropdown}
                              value={language}
                              setValue={(language) =>
                                this.changeLanguage(language)
                              }
                              options={languages}
                            />
                          </div>
                          <div style={{ width: "49%" }}>
                            <div className={styles.label}>
                              <IntlMessages id="profile.currency" />
                            </div>
                            <DropdownCurrency
                              className={styles.dropdown}
                              value={valueCurrenct}
                              defaulValue={defaulValue?.iso}
                              setValue={(currency) =>
                                this.changeCurrency(currency)
                              }
                              options={currency}
                            />
                          </div>
                        </div>

                        <FormattedMessage
                          id="profile.bio.placeholder"
                          defaultMessage="About yourselt in a few words"
                        >
                          {(placeholder) => (
                            <TextArea
                              className={styles.field}
                              label={<IntlMessages id="profile.bio" />}
                              name="Bio"
                              defaultValue={profile.bio}
                              onChange={this.onChangeValue}
                              placeholder={placeholder}
                              required="required"
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.item}>
                      <div className={styles.category}>
                        <strong>
                          <IntlMessages id="profile.social" />
                        </strong>
                      </div>
                      <div className={styles.linkProfilE}>
                        <FormattedMessage
                          id="profile.userName.placeholder"
                          defaultMessage="Enter your username "
                        >
                          {(placeholder) => (
                            <TextInput
                              className={styles.field}
                              label={<IntlMessages id="profile.link" />}
                              onChange={this.onChangeValue}
                              name="link"
                              type="text"
                              defaultValue={`${hostName}/profile/${profile?.userName}`}
                              // ref={(username) => (this.username = username)}
                              placeholder={placeholder}
                              required
                            />
                          )}
                        </FormattedMessage>
                        <div className={styles.categoryCopyInfo}>
                          <button
                            className={styles.categoryCopyInfoBtn}
                            style={{ borderLeft: 0, marginLeft: -10 }}
                            onClick={() => this.handlecopyProfile(profile)}
                          >
                            Copy
                            {checkCopy ? (
                              <div>
                                <div className={styles.styleCheck}>Copied</div>
                              </div>
                            ) : (
                              <div>
                                <div className={styles.styleCheck}>
                                  Copy to clipboard
                                </div>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>

                      <TextInput
                        className={styles.fielD}
                        label={<IntlMessages id="profile.customURL" />}
                        name="Url"
                        type="text"
                        placeholder="http://"
                        defaultValue={profile?.custom_url}
                        required
                        onChange={this.onChangeValue}
                      />
                      <div className={styles.fieldset}>
                        {/* <TextInput
                          className={styles.field}
                          label={<IntlMessages id="profile.website" />}
                          name="Portfolio"
                          type="text"
                          placeholder="Enter URL"
                          required
                          onChange={this.onChangeValue}
                        /> */}
                        <div className={styles.box}>
                          <FormattedMessage
                            id="profile.twitter.placeholder"
                            // defaultMessage="@twitter username"
                          >
                            {(placeholder) => (
                              <TextInput
                                className={styles.field}
                                label={<IntlMessages id="profile.Twitter" />}
                                name="Twitter"
                                type="text"
                                placeholder={placeholder}
                                defaultValue={profile?.Social?.url_tw}
                                required
                                onChange={this.onChangeValue}
                              />
                            )}
                          </FormattedMessage>
                          {/* <button
                            className={cn(
                              "button-stroke button-small",
                              styles.button
                            )}
                          >
                            <IntlMessages id="profile.verify" />
                          </button> */}
                        </div>
                      </div>
                      {inputList.length > 0 &&
                        inputList.map((item, index) => {
                          return (
                            <div className={styles.box}>
                              <FormattedMessage
                                id={`profile.${item.message}.placeholder`}
                                // defaultMessage={`@${item.message} username`}
                              >
                                {(placeholder) => (
                                  <TextInput
                                    className={styles.field}
                                    label={
                                      <IntlMessages
                                        id={`profile.${item.label}`}
                                      />
                                    }
                                    name={item.label}
                                    defaultValue={item.url}
                                    type="text"
                                    placeholder={placeholder}
                                    required
                                    onChange={this.onChangeValue}
                                  />
                                )}
                              </FormattedMessage>
                            </div>
                          );
                        })}
                      {/* {this.handleClickBtn ? (
                        <TextInput
                          className={styles.field}
                          name="Portfolio"
                          type="text"
                          placeholder="Add social media"
                          required
                          onChange={this.onChangeValue}
                        />
                      ) : null}*/}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {this.state.inputList.length >= 2 ? (
                          ""
                        ) : (
                          <button
                            className={cn("button-stroke", styles.addSocial)}
                            onClick={this.handleAddInput}
                          >
                            <Icon name="plus-circle" size="16" />
                            <span>
                              <IntlMessages id="profile.addMoreSocial" />
                            </span>
                          </button>
                        )}
                      </div>
                      <div className={styles.note}>
                        <IntlMessages id="profile.hint" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              visible={this.state.popUpZipCode}
              onClose={() =>
                this.setState({
                  popUpZipCode: false,
                })
              }
            >
              <ZipPopup
                onCancel={() =>
                  this.setState({
                    popUpZipCode: false,
                  })
                }
              />
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
