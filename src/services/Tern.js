import { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";

export const handlerTerm = () => {
    return API.post(API_NAME ,  '/user/accept-terms', {});
};