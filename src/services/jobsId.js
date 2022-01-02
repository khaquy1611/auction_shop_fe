import { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";

export const handleCheckJobId = (payload) => {
  return API.get(API_NAME, "/jobs/" +  payload );
};
