import { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";

export const getTax = (payload) => {
  return API.post(API_NAME, "/user/avatax/create-transaction", {
    body: {
      lines: [
        {
          number: "1",
          quantity: 1,
          amount: 100,
          taxCode: "PS081282",
          itemCode: "Y0001",
          description: "Yarn",
        },
      ],
      type: "SalesInvoice",
      companyCode: "DEFAULT",
      date: "2021-12-15",
      customerCode: "ABC",
      purchaseOrderNo: "2021-12-15-001",
      addresses: {
        singleLocation: {
          line1: payload?.line1,
          city: payload?.city,
          region: payload?.region,
          country: payload?.country,
          postalCode: payload?.postalCode,
        },
      },
      commit: true,
      currencyCode: "USD",
      description: "Yarn",
    },
  });
};
