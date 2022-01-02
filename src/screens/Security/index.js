import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Security.module.sass";
import Icon from "../../components/Icon";
import Image from "../../components/Image";
import IntlMessages from "../../i18n/IntlMessages";
import { FormattedMessage } from "react-intl";
import { getUserProfileHistoryAll } from "../../services/UserService";
import PaginationComponent from "../../components/Pagination";
import { getLocation } from "../../services/Location";
import { validateDate } from "../../constants/Utils";
import { changePasswordUser } from "../../services/UserService";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import Brower from "./ModelHistory/index";

const ChangePassword = () => {
  const [result, setResult] = useState([]);
  const [visibleModalLog, setVisibleModalLog] = useState(false);
  const [total, setTotal] = useState();
  const [pageCurent, setCurent] = useState(1);
  const [oldPassWord, setOldPassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [errorCurrentPassWord, setErrorCurrentPassWord] = useState("");
  const [errorNewPassWord, setErrorNewPassWord] = useState("");
  const [errorConfirmPassWord, setErrorConFirmPassWord] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [browerHistory, setBrowerHistory] = useState(false);
  const [dataBrower, setDataBrower] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  useEffect(() => {
    getUserProfileHistoryAll(pageCurent).then((res) => {
      setResult(res?.data);
      setTotal(res?.total);
      res?.data?.length > 0 &&
        res?.data.map((item, index) => {
          getLocation(item?.ip).then((res) => {
            setCountry(res?.data?.country);
            setRegion(res?.data?.region);
          });
        });
    });
  }, [pageCurent]);

  const handleChangePage = (page) => {
    setCurent(page);
  };
  const handleOldPassWord = (event) => {
    setOldPassWord(event.target.value);
  };

  const handleNewPassWord = (event) => {
    setNewPassWord(event.target.value);
  };

  const handleConFirmPassWord = (event) => {
    setConfirmPassWord(event.target.value);
  };

  const onSubmitChangePassword = () => {
    if (oldPassWord?.length < 6) {
      setErrorCurrentPassWord("Current password must more than 6 characters");
    }
    if (newPassWord?.length < 6) {
      setErrorNewPassWord("New password must more than 6 characters");
    }
    if (confirmPassWord < 6) {
      setErrorConFirmPassWord("Confirm password must more than 6 characters");
    }
    if (
      confirmPassWord !== newPassWord &&
      newPassWord?.length >= 6 &&
      confirmPassWord >= 6
    ) {
      setErrorNewPassWord("");
      setErrorCurrentPassWord("");
      setErrorConFirmPassWord("Confirm password not same new password");
    }
    if (
      oldPassWord?.length >= 6 &&
      newPassWord?.length >= 6 &&
      confirmPassWord >= 6 &&
      confirmPassWord === newPassWord
    ) {
      setErrorCurrentPassWord("");
      setErrorNewPassWord("");
      setErrorConFirmPassWord("");
      const paramSend = {};
      paramSend.password_new = confirmPassWord;
      paramSend.password_old = oldPassWord;
      changePasswordUser(paramSend).then((res) => {
        toast.success("Change password success");
      });
    }
  };

  const handleClearAll = () => {
    setOldPassWord("");
    setNewPassWord("");
    setConfirmPassWord("");
  };
  const handleBrower = (event) => {
    setBrowerHistory(true);
    setDataBrower(event);
  };
  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link className={cn("button-stroke", styles.button)} to="/">
            <Icon name="arrow-prev" size="14" fill="#777E90" />
            <span>
              <IntlMessages id="backToHome" />
            </span>
          </Link>
          {/* <div className={styles.breadcrumb}>
            <ul>
              <li>
                <p>
                  <IntlMessages id="security.profile" />
                </p>
                <Icon name="arrow-bottom" size="10" />
              </li>
              <li>
                <Link className={styles.button} to="/security">
                  <span>
                    <IntlMessages id="security" />
                  </span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <div className={styles.headTitle}>
              <h2>
                <IntlMessages id="security.changePassword" />
              </h2>
              <span className={styles.notes}>
                <IntlMessages id="security.changePassword.description" />
              </span>
            </div>
            <div className={styles.formSubmit}>
              <div className={styles.field}>
                <div className={styles.label}>
                  <label>
                    <IntlMessages id="security.changePassword.currentpassword" />
                  </label>
                </div>
                <div className={styles.input}>
                  <FormattedMessage
                    id="security.changePassword.currentpassword.placeholder"
                    defaultMessage={
                      <IntlMessages id="security.changePassword.currentpassword.placeholder" />
                    }
                  >
                    {(placeholder) => (
                      <input
                        type={"password"}
                        placeholder={placeholder}
                        onChange={handleOldPassWord}
                        value={oldPassWord}
                        defaultValue={oldPassWord}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <i
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: 5,
                    fontWeight: 200,
                  }}
                >
                  {errorCurrentPassWord}
                </i>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>
                  <label>
                    <IntlMessages id="security.changePassword.newPassword" />
                  </label>
                </div>
                <div className={styles.input}>
                  <FormattedMessage
                    id="security.changePassword.newPassword.placeholder"
                    defaultMessage="Password"
                  >
                    {(placeholder) => (
                      <input
                        type={"password"}
                        placeholder={placeholder}
                        onChange={handleNewPassWord}
                        value={newPassWord}
                        defaultValue={newPassWord}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <i
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: 5,
                    fontWeight: 200,
                  }}
                >
                  {errorNewPassWord}
                </i>
              </div>
              <div className={cn(styles.last, styles.field)}>
                <div className={styles.label}>
                  <label>
                    <IntlMessages id="security.changePassword.confirmPassword" />
                  </label>
                </div>
                <div className={styles.input}>
                  <FormattedMessage
                    id="security.changePassword.confirmPassword.placeholder"
                    defaultMessage="Confirm password"
                  >
                    {(placeholder) => (
                      <input
                        type={"password"}
                        placeholder={placeholder}
                        onChange={handleConFirmPassWord}
                        value={confirmPassWord}
                        defaultValue={confirmPassWord}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <i
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: 5,
                    fontWeight: 200,
                  }}
                >
                  {errorConfirmPassWord}
                </i>
              </div>
              <div className={styles.btns}>
                <button
                  type="submit"
                  className={cn("button", styles.button)}
                  onClick={onSubmitChangePassword}
                >
                  <IntlMessages id="security.changePassword.button" />
                </button>
                <button
                  type="submit"
                  onClick={handleClearAll}
                  className={styles.grayButton}
                >
                  <Icon name="close-circle" size="20" />
                  <IntlMessages id="security.changePassword.clearAll" />
                </button>
              </div>
            </div>
          </div>
          {/* <div className={cn(styles.securitySection, styles.section)}>
                        <div className={styles.headTitle}>
                            <h2><IntlMessages id="security"/></h2>
                            <span className={styles.subtitle}><IntlMessages id="security.2fa"/></span>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.box}>
                                <div className={styles.step}>
                                    <label><IntlMessages id="security.step1"/></label>
                                </div>
                                <div className={styles.stepContent}>
                                    <label className={styles.subTitleStep}><IntlMessages id="security.step1.title"/></label>
                                    <span><IntlMessages id="security.step1.download"/></span>
                                    <p>Google Authenticator (<span className={styles.orangeText}>Android</span>, <span
                                        className={styles.orangeText}>iOS</span>)</p>
                                    <p>Duo Mobile (<span className={styles.orangeText}>Android</span>, <span
                                        className={styles.orangeText}>iOS)</span>, <IntlMessages id="security.step1.or"/></p>
                                    <p>Microsoft Authenticator (<span
                                        className={styles.orangeText}>Android</span>, <span
                                        className={styles.orangeText}>iOS)</span>, <IntlMessages id="security.step1.or"/></p>
                                    <span><IntlMessages id="security.step1.forPhoneOrTablet"/></span>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.step}>
                                    <label><IntlMessages id="security.step2"/></label>
                                </div>
                                <div className={styles.stepContent}>
                                    <label className={styles.subTitleStep}><IntlMessages id="security.step2.title"/></label>
                                    <span><IntlMessages id="security.step2.description"/></span>
                                    <div className={styles.qr}>
                                        <Image
                                            className={styles.pic}
                                            src="/images/qr.png"
                                            alt="#"
                                        />
                                    </div>
                                    <span className={styles.orangeText}><IntlMessages id="security.step2.trouble"/></span>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.step}>
                                    <label><IntlMessages id="security.step3"/></label>
                                </div>
                                <div className={styles.stepContent}>
                                    <label className={styles.subTitleStep}><IntlMessages id="security.step3.title"/></label>
                                    <span><IntlMessages id="security.step3.description"/></span>
                                    <div className={styles.field}>
                                        <div className={styles.label}>
                                            <label><IntlMessages id="security.step3.authenticationCode"/></label>
                                        </div>
                                        <div className={styles.input}>
                                            <input type={'text'} defaultValue={''}/>
                                        </div>
                                    </div>
                                    <div className={styles.btns}>
                                        <button className={cn("button", styles.button)}>
                                            <IntlMessages id="security.step3.enable"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
          <div className={cn(styles.history, styles.section)}>
            <div className={styles.headTitle}>
              <h2>
                <IntlMessages id="security.history" />
              </h2>
            </div>
            <div className={styles.content}>
              <div className={styles.tableHistory}>
                <div className={styles.tableTitle}>
                  <label>
                    <IntlMessages id="security.history.activeSession" />
                  </label>
                  <span className={styles.notes}>
                    <IntlMessages id="security.history.activeSession.description" />
                  </span>
                </div>
                <div className={styles.tableContent}>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <IntlMessages id="security.history.table.signedIn" />
                        </th>
                        <th>
                          <IntlMessages id="security.history.table.location" />
                        </th>
                        <th>
                          <IntlMessages id="security.history.table.ip" />
                        </th>
                        <th>
                          <IntlMessages id="security.history.table.browser" />
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {result?.length > 0 &&
                        result?.map((item, index) => (
                          <tr key={index}>
                            <td>{validateDate(item?.created_at)}</td>
                            <td>
                              {region}, {country}
                            </td>
                            <td>{item?.ip}</td>
                            <td className={styles.browser}>{item?.browser}</td>
                            <td>
                              <button
                                onClick={() => handleBrower(item?.browser)}
                              >
                                <Image
                                  className={styles.pic}
                                  src="/images/content/icon-infor.svg"
                                  alt="icon"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div
                    style={{
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      marginRight: 20,
                    }}
                  >
                    <PaginationComponent
                      handleChange={handleChangePage}
                      current={1}
                      total={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal visible={browerHistory} onClose={() => setBrowerHistory(false)}>
        <Brower
          dataBrower={dataBrower}
          onCancel={() => setBrowerHistory(false)}
        />
      </Modal>
    </div>
  );
};

export default ChangePassword;
