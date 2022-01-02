import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showPaymentModal } from "../actions/AppActions";

export const useBid = (props) => {
  const { dataItem, balance } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [numberInput, setNumberInput] = useState("");
  const [discount, setdiscount] = useState(0);
  const [serviceFree, setServiceFree] = useState(0);
  const [rateDiscount, setRateDiscount] = useState(0);
  const [tax, setTax] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const paramsSend = {
      price: 60000,
    };
    // discountNFTs(paramsSend).then((res) => {
    //   setRateDiscount(res?.discount);
    // });
    if (parseInt(dataItem?.currentBid) === 0) {
      setNumberInput(
        parseFloat(dataItem?.startingPrice) + parseFloat(dataItem?.bidStep)
      );
      setServiceFree(
        ((parseFloat(dataItem?.startingPrice) + parseFloat(dataItem?.bidStep)) /
          100) *
          5
      );
      setdiscount(
        ((parseFloat(dataItem?.startingPrice) + parseFloat(dataItem?.bidStep)) /
          100) *
          rateDiscount
      );
      setTax(
        ((parseFloat(dataItem?.startingPrice) + parseFloat(dataItem?.bidStep)) /
          100) *
          user?.tax
      );
      setTotal(
        parseFloat(
          parseFloat(dataItem?.startingPrice) + parseFloat(dataItem?.bidStep)
        ) +
          ((parseFloat(dataItem?.startingPrice) +
            parseFloat(dataItem?.bidStep)) /
            100) *
            5 -
          ((parseFloat(dataItem?.startingPrice) +
            parseFloat(dataItem?.bidStep)) /
            100) *
            rateDiscount +
          ((parseFloat(dataItem?.startingPrice) +
            parseFloat(dataItem?.bidStep)) /
            100) *
            user?.tax
      );
    } else {
      setNumberInput(
        parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)
      );
      setServiceFree(
        ((parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)) /
          100) *
          5
      );
      setdiscount(
        ((parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)) /
          100) *
          rateDiscount
      );
      setTax(
        ((parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)) /
          100) *
          user?.tax
      );
      setTotal(
        parseFloat(
          parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)
        ) +
          ((parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)) /
            100) *
            5 -
          ((parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)) /
            100) *
            rateDiscount +
          ((parseFloat(dataItem?.currentBid) + parseFloat(dataItem?.bidStep)) /
            100) *
            user?.tax
      );
    }
  }, [dataItem]);
  const handleInput = (value) => {
    setNumberInput(value);
    setServiceFree((parseFloat(value) / 100) * 5);
    setdiscount((parseFloat(value) / 100) * rateDiscount);
    setTax((parseFloat(value) / 100) * user?.tax);
    setTotal(
      parseFloat(parseFloat(value)) +
        (parseFloat(value) / 100) * 5 -
        (parseFloat(value) / 100) * rateDiscount +
        (parseFloat(value) / 100) * user?.tax
    );
  };
  const handleAddMoney = () => {
    const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    dispatch(showPaymentModal({ isShow: true, walletAddress }));
  };

  const handleUpdateProfile = () => {
    window.location.replace("/my-profile");
  };
  return {
    handleInput,
    handleAddMoney,
    handleUpdateProfile,
    numberInput,
    discount,
    serviceFree,
    tax,
    total,
    balance,
    user,
  };
};
