import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useCurrency from "../../../hooks/useCurrency";
import { convertMoney } from "../../../services/CurrencyService";
import { numberWithCharacter } from "../../../constants/Utils";
const Currency = (props) => {
  const { dataItem } = props;
  const [balanceCurrency, setBalanceCurrency] = useState(0);
  const user = useSelector((state) => state.app.user);
  const currency = useCurrency()?.currency;
  useEffect(() => {
    convertMoney(user?.currency ? user?.currency : "USD", dataItem).then(
      (res) => {
        setBalanceCurrency(res?.data?.to[0]?.mid);
      }
    );
  }, [dataItem]);

  return (
    <>
      <div>
        {parseInt(balanceCurrency) > 0
          ? `~${currency}${" "}${numberWithCharacter(balanceCurrency)}`
          : ""}
      </div>
    </>
  );
};

export default Currency;
