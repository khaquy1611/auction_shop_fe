import { API } from "aws-amplify";
import axios from "axios";
import { API_NAME } from "../constants/Configs";

export const getWalletGroups = () => {
  return API.get(API_NAME, "/wallet/group", {});
};

export const getWalletBases = (groupId) => {
  return API.get(API_NAME, "/wallet/group/" + groupId + "/wallet-base", {});
};

export const getWalletInfo = (walletBaseId) => {
  return API.get(API_NAME, "/wallet/accounts/wallet-base/" + walletBaseId, {});
};

export const transferWallet = (walletBaseId, payload) => {
  return API.post(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/mint-lusd",
    {
      body: payload,
    }
  );
};

export const burnLusd = (walletBaseId, payload) => {
  return API.post(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/burn-lusd",
    {
      body: payload,
    }
  );
};

export const postWithDraw = (address, payload) => {
  return API.post(
    API_NAME,
    "/wallet/accounts/wallet-base/" + address + "/withdrawals",
    {
      body: payload,
    }
  );
};

export const getWalletBase = () => {
  return API.get(API_NAME, "/wallet/accounts/wallet-base/", {});
};

export const createWallet = (walletBaseId) => {
  return API.post(API_NAME, "/wallet/accounts/wallet-base/" + walletBaseId, {});
};

export const createMetaMaskWallet = (walletBaseId, payload) => {
  return API.post(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/option",
    {
      body: payload,
    }
  );
};

export const createFlowWallet = (walletBaseId) => {
  return API.post(
    API_NAME,
    "/accounts/" +
      {
        body: walletBaseId,
      }
  );
};

export const getListDeposit = (walletBaseId) => {
  return API.get(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/deposits",
    {}
  );
};

export const getListDepositByTransferId = (walletBaseId, transferId) => {
  return API.get(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/deposits/" + transferId,
    {}
  );
};

export const getListWithdraw = (walletBaseId) => {
  return API.get(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/withdrawals",
    {}
  );
};

export const createWithdraw = (walletBaseId, payload) => {
  return API.post(
    API_NAME,
    "/wallet/accounts/wallet-base/" + walletBaseId + "/withdrawals",
    payload
  );
};

export const getWithdrawByTransferId = (walletBaseId, transferId) => {
  return API.get(
    API_NAME,
    "/wallet/accounts/wallet-base/" +
      walletBaseId +
      "/withdrawals/" +
      transferId,
    {}
  );
};

export const createMoonPayTransaction = (transactionId, status) => {
  return API.post(API_NAME, "/wallet/accounts/moonpay/transactions", {
    body: {
      id: transactionId,
      status: status,
    },
  });
};

export const handleCheckJobId = (payload) => {
  return API.post(API_NAME, "/jobs/" + { payload });
};

export const getProfileUser = (address) => {
  return API.get(API_NAME, `/wallet/accounts/address?addresss=${address}`);
};

export const signMoonpayUrl = (walletAddress) => {
  return axios({
    method: 'post',
    baseURL: process.env.HOST_WALLET,
    url: `/payment/moonpay/${walletAddress}/sign_url`,
    data: {},
    headers: {
      "api-key": process.env.WALLET_API_KEY
    }
  })
};
export const getTransactionWallet = () => {
  const ActivityWalletDeposit = "ActivityWalletDeposit";
  const ActivityWalletWithdrawal = "ActivityWalletWithdrawal";

  return API.get(
    API_NAME,
    `/user/activity-history?type-activity=${ActivityWalletDeposit}&type-activity=${ActivityWalletWithdrawal}&page-number=1&page-size=2`
  );
};
