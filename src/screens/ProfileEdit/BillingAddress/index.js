import React, { useEffect, useState } from "react";
import styles from "./ChooseToken.module.sass";
import Dropdown from "../../../components/DropdownUpdateInfo/DropdownUpdateInfo";
import { ConsoleLogger } from "@aws-amplify/core";
import {
  getCountries,
  getState,
  getCities,
  getDetailCity,
} from "../../../services/Location";
import { UpdateUserAdrress } from "../../../services/UserService";
import IntlMessages from "../../../i18n/IntlMessages";

export default function BillingAddress(props) {
  const { onChangeValue, profile, errorMessage } = props;
  const [valueChangeAddress, setValueChangeAddress] = useState("");
  const [optionsCountry, setOptionsCountry] = useState();
  const [optionsState, setOptionsState] = useState();
  const [optionsCities, setOptionsCities] = useState();
  const [valueZip, setValueZip] = useState();
  const [valueCity, setValueCity] = useState();
  const [valueState, setValueState] = useState();
  const [valueCountry, setValueCountry] = useState();

  const [defaultValueCountry, setDefaultValueContry] = useState();
  const [defaultValueState, setDefaultValueState] = useState();
  const [defaultValueCity, setDefaultValueCity] = useState();

  const handeleValueCountry = (value) => {
    setValueCountry(value);
    setValueState([]);
    setValueCity([]);
    setDefaultValueContry("");
    setDefaultValueState("");
    setDefaultValueCity("");
    onChangeValue("Country", value);
  };

  const handeleValueState = (value) => {
    setValueState(value);
    setDefaultValueState("");
    setValueCity([]);
    onChangeValue("State", value);
  };

  const handeleValueSelected = (value) => {
    setValueCity(value);
    setDefaultValueCity("");
    onChangeValue("Select", value);
  };

  useEffect(() => {
    const dataTemp = [];
    getCountries().then((res) => {
      res?.data?.data?.countries.map((item) => {
        dataTemp.push({
          label: item.name,
          value: item.id,
          iso2: item.iso2,
        });
      });
    });
    setOptionsCountry(dataTemp);
  }, []);
  useEffect(() => {
    const dataTemp = [];
    getState(valueCountry?.iso2).then((res) => {
      res?.data?.data?.states.map((item) => {
        dataTemp.push({
          label: item.name,
          value: item.id,
          state_code: item.state_code,
        });
      });
    });
    setOptionsState(dataTemp);
  }, [valueCountry]);

  useEffect(() => {
    const dataTemp = [];
    if (valueCountry && valueState) {
      getCities(valueCountry?.iso2, valueState?.state_code).then((res) => {
        res?.data?.data?.cities.map((item) => {
          dataTemp.push({
            label: item.name,
            value: item.id,
            state_code: item.state_id,
          });
        });
      });
    }

    setOptionsCities(dataTemp);
  }, [valueState]);

  const onChangeZipCode = (e) => {
    onChangeValue("zipcode", e.target.value);
    setValueZip(e.target.value);
  };
  const onChangeAddress = (e) => {
    onChangeValue("address", e.target.value);
    setValueChangeAddress(e.target.value);
  };

  useEffect(() => {
    setValueZip(profile?.zipcode);
    setValueChangeAddress(profile?.address);
    getDetailCity(profile?.country, profile?.province, profile?.city).then(
      (res) => {
        setDefaultValueContry({
          label: res?.data?.data?.country?.native,
          value: res?.data?.data?.country?.id,
          iso2: res?.data?.data?.country?.iso2,
        });
        setDefaultValueState({
          label: res?.data?.data?.state?.name,
          value: res?.data?.data?.state?.id,
          iso2: res?.data?.data?.state?.state_code,
        });
        setDefaultValueCity({
          label: res?.data?.data?.city?.name,
          value: res?.data?.data?.city?.id,
          iso2: res?.data?.data?.city?.state_id,
        });
      }
    );
  }, [profile]);
  return (
    <>
      <div className={styles.tokenContent}>
        <h1 style={{ fontSize: 18 }}>
          <IntlMessages id="BillingAddress.title" />
        </h1>
        <div className={styles.Token}>
          <IntlMessages id="chooseItem.residential" /> *
          {/* Residental Address */}
        </div>
        <div className={styles.tokenInput}>
          <input
            className={styles.Input}
            type="text"
            name="lastname"
            value={valueChangeAddress}
            onChange={onChangeAddress}
          />
        </div>
        {valueChangeAddress === "" && (
          <i style={{ color: "red", fontWeight: 200, fontSize: 12 }}>
            Please enter address
          </i>
        )}
        <div>
          <div className={styles.Token}>
            <IntlMessages id="chooseItem.country" /> *
          </div>
          <div className={styles.tokenItem}>
            <div className={styles.tokenTem}>
              <Dropdown
                options={optionsCountry}
                defaultValue={defaultValueCountry}
                value={valueCountry}
                error={errorMessage?.country}
                setValue={handeleValueCountry}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={styles.Token}>
            <IntlMessages id="chooseItem.province" /> *
          </div>
          <div className={styles.tokenItem}>
            <div className={styles.tokenTem}>
              <Dropdown
                options={optionsState}
                value={valueState}
                defaultValue={defaultValueState}
                setValue={handeleValueState}
                error={errorMessage?.province}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.Token}>
            <IntlMessages id="chooseItem.city" /> *{/* City */}
          </div>
          <div className={styles.tokenItem}>
            <div className={styles.tokenTem}>
              <Dropdown
                options={optionsCities}
                value={valueCity}
                defaultValue={defaultValueCity}
                setValue={handeleValueSelected}
                error={errorMessage?.city}
              />
            </div>
          </div>
        </div>
        <div className={styles.Token}>
          <IntlMessages id="chooseItem.zip" /> *{/* ZIP/Postal */}
        </div>
        <div className={styles.tokenInput}>
          <input
            className={styles.Input}
            type="text"
            name="zipcode"
            value={valueZip}
            onChange={onChangeZipCode}
          />
        </div>
        {valueZip?.length === 0 && (
          <i style={{ color: "red", fontWeight: 200, fontSize: 12 }}>
            Please enter your zipcode
          </i>
        )}
            {valueZip?.length > 10 && (
          <i style={{ color: "red", fontWeight: 200, fontSize: 12 }}>
            zipcode can not more than 10 characters
          </i>
        )}
        {/* <div className={styles.Btn} onClick={handleSubmit}>
          <IntlMessages id="chooseItem.submit" />
        </div> */}
      </div>
    </>
  );
}
