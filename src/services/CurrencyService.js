import { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";
import axios from "axios";

export const getCurrencies = (iso, language) => {
  return API.get(API_NAME, "/currency/list", {
    queryStringParameters: {
      iso: iso,
      language: language,
    },
  });
};

//
const APICurrency = process.env.API_CURRENCY;
const account_id = process.env.ACCOUNT_ID_CURRENCY;
const api_key = process.env.API_KEY_CURRENCY;

const credentials = window.btoa(`${account_id}:${api_key}`);

const config = {
  headers: {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  },
};

export const getListCurrency = () => {
  return axios.get(`${APICurrency}/currencies.json/?obsolete=true`, config);
};

export const getListCurrentCurrency = (iso) => {
  return axios.get(
    `${APICurrency}/currencies?iso=${iso}&obsolete=true`,
    config
  );
};

export const convertMoney = (currency, amount) => {
  return axios.get(
    `${APICurrency}/convert_from?from=USD&to=${currency}&amount=${amount}`,
    config
  );
};
