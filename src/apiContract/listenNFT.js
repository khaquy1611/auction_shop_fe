// import libraly
import { config, query } from "@onflow/fcl";
import { replaceAllTokenAddress } from "./utils";
import { flowTestNet } from "../constants/testnetAdress";
import getCollectionLength from "../contracts/scripts/ListenNFT/get_collection_length.cdc";
import getCollectionMeta from "../contracts/scripts/ListenNFT/get_collection_meta.cdc";
import getMetaData from "../contracts/scripts/ListenNFT/get_metadata.cdc";
import getSupply from "../contracts/scripts/ListenNFT/get_supply.cdc";
import readCollectionIds from "../contracts/scripts/ListenNFT/read_collection_ids.cdc";

//get_metadata.cdc

export const customeGetMetaData = (Address, NFTid) => {
  return fetch(getMetaData)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [arg(Address, t.Address), arg(NFTid, t.UInt64)],
      });
      return data;
    });
};

// get_collection_meta.cdc

export const customGetCollectionMeta = (Address, NFTid) => {
  return fetch(getCollectionMeta)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [arg(Address, t.Address), arg(NFTid, t.UInt64)],
      });
      return data;
    });
};

export const customGetCollectionLength = (Address) => {
  return fetch(getCollectionLength)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [arg(Address, t.Address)],
      });
      return data;
    });
}


export const customReadCollectionIds = (Address) => {
  return fetch(readCollectionIds)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [arg(Address, t.Address)],
      });
      return data;
    });
}

