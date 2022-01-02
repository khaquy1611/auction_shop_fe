import React from "react";
import { handleCheckJobId } from "../services/jobsId";
import { toast } from "react-toastify";
export default function useHanlejobID() {
  const handleCheckSetupJobs = (
    value,
    func = () => {},
    messageObject = {},
    onCanCel = () => {},
    callData = () => {}
  ) => {
    handleCheckJobId(value).then((res) => {
      if (res?.status === "Error") {
        toast.error(messageObject.error);
      }
      if (res?.status === "Accepted") {
        //
        toast.warning(messageObject.pleaseWait);
        const interval = setInterval(() => {
          handleCheckJobId(value).then((res) => {
            if (res.status === "Complete") {
              clearInterval(interval);
              onCanCel();
              callData();
              toast.success(messageObject.resSuccess);
                setTimeout(() => {
                  func();
                }, 2000);
            }
            if (res.status === "Error") {
              clearInterval(interval);
              callData();
              toast.error(res.error);
              onCanCel();
            }
          });
        }, 3000);
        //
        setTimeout(() => {
          clearInterval(interval);
        }, 15000);
      }
      if (value?.status === "Complete") {
        toast.success(messageObject.valueSuccess);
        // handleGetWalletInfo();
      }
    });
  };
  return { handleCheckSetupJobs };
}
