import {API} from "aws-amplify";
import {API_NAME} from "../constants/Configs";

// export const getAuctions = (filter) => {
//     return API.get(API_NAME, '/listen-auction/auctions', {
//         queryStringParameters: filter
//     });
// }

export const getAuctions = (payload) => {
    return API.post(API_NAME, '/listen-auction/scripts/get-auctions-meta', 
    {
        body: payload
    });
}

export const getAuction = (auctionId) => {
    return API.get(API_NAME, '/listen-auction/auctions/' + auctionId, {});
}

// export const bidding = (payload) => {
//     return API.post(API_NAME, '/listen-auction/auctions/' + payload.auction_id + '/bid', {
//         body: payload
//     });
// }


export const bidding = (payload) => {
    return API.post(API_NAME, '/listen-auction/transactions/place-bid', {
        body:  {
            "arguments": [
              {"type":"UInt64","value": `${payload.auctionId}`},
              {"type":"UFix64","value": `${payload.amount}`},
            ],
            "code": "string"
          }
    });
}

export const getBidHistory = (auctionId) => {
    return API.get(API_NAME, '/listen-auction/auctions/' + auctionId + '/bid', {});
}