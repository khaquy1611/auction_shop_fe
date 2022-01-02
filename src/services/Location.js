import axios from "axios";
const API = process.env.HOST_WALLET;
const APILocation = process.env.API_LOCATION;
const API_KEY = process.env.API_KEY_WALLET

const config = {
  headers: {
    "api-key": API_KEY,
  },
};


export const getCountries = () => {
  return axios.get(`${API}/countries`, config);
};
export const getState = (countryCode) => {
  return axios.get(`${API}/countries/${countryCode}/states`, config);
};
export const getCities = (countryCode, stateCode) => {
  return axios.get(
    `${API}/countries/${countryCode}/states/${stateCode}/cities`, config
  );
};
export const getDetailCity = (countryCode, stateCode, cityCode) => {
  return axios.get(
    `${API}/countries/${countryCode}/states/${stateCode}/cities/${cityCode}`, config
  );
};

export const getLocation = (IpLocation) => {
  return axios.get(`${APILocation}/json/${IpLocation}`);
};


//filter 
export const getListAuctions = (payload) => {
  return axios.post(`${API}/auctions`, payload, config);
};

export const getAuctionCollection = () => {
  return axios.get(`${API}/auctions/group_by_collection?page=1&pageSize=100`, config);
}
export const getListMaketPlace = (payload) => {
  return axios.post(`${API}/market_places`, payload, config);
};