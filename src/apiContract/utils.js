// address testnet
import {
  NonFungibleToken,
  FungibleToken,
  ListenNFT,
  ListenAuction,
  ListenUSD,
  ListenMarketplace,
} from "../constants/testnetAdress";

export const replaceAllTokenAddress = (source) => {
  source = source
    .replaceAll(
      `"../../contracts/dependencies/NonFungibleToken.cdc"`,
      NonFungibleToken
    )
    .replaceAll(
      `"../../contracts/dependencies/FungibleToken.cdc"`,
      FungibleToken
    )
    .replaceAll(`"../../contracts/ListenNFT.cdc"`, ListenNFT)
    .replaceAll(`"../../contracts/ListenAuction.cdc"`, ListenAuction)
    .replaceAll(`"../../contracts/ListenUSD.cdc"`, ListenUSD)
    .replaceAll(`"../../contracts/ListenMarketplace.cdc"`, ListenMarketplace);
  return source;
};
