// import libraly
import { config, query } from "@onflow/fcl";
import { replaceAllTokenAddress } from "./utils";
import { flowTestNet } from "../constants/testnetAdress";
import getBalance from "../contracts/scripts/ListenUSD/get_balance.cdc";
import getSupply from "../contracts/scripts/ListenUSD/get_supply.cdc";

export const customGetBalance = (Address) => {
  return fetch(getBalance)
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

export const customGetSupply = () => {
  return fetch(getSupply)
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
