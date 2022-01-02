import React, { useState } from "react";
import { useSelector } from "react-redux";
import { currencies } from "currencies.json";
import * as _ from 'lodash'
const useCurrency = () => {
    const user = useSelector((state) => state.app.user);
    const currency = _.find(currencies, ["code", user?.currency])?.symbol
    return { currency }
};

export default useCurrency;
