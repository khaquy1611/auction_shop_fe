import { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";

export const purchaseListing = (payload) => {
  return API.post(API_NAME, "/listen-mkp/transactions/purchase-listing", {
    body: {
      arguments: [
        { type: "UInt64", value: `${payload.idItem}` },
        { type: "Address", value: `${payload.address}` },
      ],
      code: "string",
    },
  });
};

export const createListing = (payload) => {
  return API.post(API_NAME, "/listen-mkp/transactions/create-listing", {
    body: {
      arguments: [
        {
          type: "Array",
          value: [
            {
              type: "UInt64",
              value: `${payload.itemId}`,
            },
          ],
        },
        {
          type: "UFix64",
          value: `${parseFloat(payload.price).toFixed(1)}`,
        },
      ],
      code: "string",
    },
  });
};