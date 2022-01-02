import { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";
import queryString from "query-string";

export const getNFTTypes = () => {
  return API.get(API_NAME, "/listen-nft/nft/types", {});
};

export const getNFTs = (filter) => {
  return API.get(API_NAME, "/listen-nft/nft/items/filter", {
    queryStringParameters: filter,
  });
};

export const discountNFTs = (price) => {
  return API.get(API_NAME, `/listen-nft/nft/discount/price?${queryString.stringify(price)}`);
};
