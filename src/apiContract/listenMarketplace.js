// import libraly
import { config, query } from "@onflow/fcl";
import { replaceAllTokenAddress } from "./utils";
import { flowTestNet } from "../constants/testnetAdress";
import getListing from "../contracts/scripts/ListenMarketplace/read_listing_details.cdc";
import getMarket from "../contracts/scripts/ListenMarketplace/read_marketplace_ids.cdc";

export const customGetListing = (Address, NFTid) => {
  return fetch(getListing)
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
// read_marketplace_ids.cdc
export const customGetMarket = (Address) => {
  return fetch(getMarket)
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
};
