// import libraly
import { config, query } from "@onflow/fcl";
import { replaceAllTokenAddress } from "./utils";
import { flowTestNet } from "../constants/testnetAdress";
import getAuctionMeta from "../contracts/scripts/ListenAuction/get_auction_meta.cdc";
import getAuctionMetaByStatus from "../contracts/scripts/ListenAuction/get_auctions_meta_by_status.cdc";
import getAucionsMeta from "../contracts/scripts/ListenAuction/get_auctions_meta.cdc";
import getAuctions from "../contracts/scripts/ListenAuction/get_auctions.cdc";
import getHistoryAuction from "../contracts/scripts/ListenAuction/get_history_auction.cdc";

export const customeGetAucionsMeta = () => {
  return fetch(getAucionsMeta)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [],
      });
      return data;
    });
};

export const customeGetAuctionMetaByStatus = (Status, Position) => {
  return fetch(getAuctionMetaByStatus)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [
          arg(Status, t.String),
          arg(parseInt(Position), t.UInt64),
        ],
      });
      return data;
    });
};

export const customeGetAucionMeta = (auctionID) => {
  return fetch(getAuctionMeta)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [arg(parseInt(auctionID), t.UInt64)],
      });
      return data;
    });
};

export const customeGetAucions = () => {
  return fetch(getAuctions)
    .then((r) => r.text())
    .then(async (text) => {
      const cadence = replaceAllTokenAddress(text);
      config().put("accessNode.api", flowTestNet);
      const data = await query({
        cadence,
        args: (arg, t) => [],
      });
      return data;
    });
};
