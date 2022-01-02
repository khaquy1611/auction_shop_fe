import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Hero from "./Hero";
import HotBid from "../../components/HotBid";
import UpComincgDrops from "../../components/UpComing/index";
import Discover from "./Discover";
import Picture from "./Picture";
import IntlMessages from "../../i18n/IntlMessages";
import { getWalletBase } from "../../services/WalletService";
import { customGetBalance } from "../../apiContract/listenUSD";
import { showPaymentModal } from "../../actions/AppActions";
import * as _ from "lodash";
import { getAuctionCollection } from '../../services/Location'
import ClipLoader from "react-spinners/ClipLoader";

const Home = (props) => {
  const [data, setData] = useState();
  const [balace, setBalance] = useState();
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    callAllData();
    getWalletBase().then((res) => {
      const addressFlow = _.find(res, { wallet_base: { wallet_type: "FLOW" } });
      if (addressFlow) {
        customGetBalance(addressFlow?.wallet_address).then((res) => {
          setBalance(res);
        });
      }
    });
  }, []);

  const handleGetDataTop = () => {
    getAuctionCollection().then(res => {
      setData(res.data.data.collections)
      setLoader(false)
    })
  };

  const handleAddMoney = () => {
    const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    dispatch(showPaymentModal({ isShow: true, walletAddress }));
  };

  const callAllData = () => {
    handleGetDataTop();
  };

  return (
    <>
      {
        loader && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
          <ClipLoader color="#ee4e00" loading={loader} size={50} />
        </div>
      }
      <div style={{ display: loader ? 'none' : '' }}>
        <Hero
          items={data}
          callData={callAllData}
          balace={balace}
          handleAddMoney={handleAddMoney}
        />
        <UpComincgDrops
          classSection="section"
          title={<IntlMessages id="home.title.upcoming" />}
          // callData={callAllData}
        />
        <HotBid
          classSection="section"
          title={<IntlMessages id="home.title.hotbid" />}
          // callData={callAllData}
        />
        <Discover callData={callAllData} />
        <Picture />
        {/* <Popular />
      <Collections />
       <Description /> */}
      </div>
    </>
  );
};

export default Home;