import React, { useEffect, useState } from "react";
import { getProfileUser } from "../../services/WalletService";
import styles from "./Bidder.module.sass" ;
import {useHistory} from 'react-router-dom'
function Bidder(props) {
  const { bidder } = props;
  const [bidderHistory, setBidderHistory] = useState("");
  const [user,setUser] = useState()
  const history = useHistory()
  useEffect(() => {
    if (bidder?.bidderAddress?.length > 0) {
      getProfileUser(bidder.bidderAddress).then((res) => {
        setUser(res)
        if (res?.listen_user?.displayName?.length > 0) {
          setBidderHistory(res?.listen_user?.displayName);
        } else if (res?.listen_user?.userName?.length > 0) {
          setBidderHistory(res?.listen_user?.userName);
        }
      });
    }
  }, [bidder]);
  const handleOnClick = (event) => {
    history.push(`/profile/${event?.listen_user?.userName}`)
  }
  return (
    <div className={styles.Bidder}
      onClick={() => handleOnClick(user)}
    >
      {bidderHistory}
    </div>
  );
}
export default Bidder;
