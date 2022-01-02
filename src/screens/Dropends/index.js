import React, { useEffect, useMemo, useState } from "react";
import { customeGetAuctionMetaByStatus } from "../../apiContract/listenAuction";
import DropendsComponent from "./Dropends";
import { getListAuctions } from '../../services/Location'

const DEFAULT_FILTER_ENDED_DROPS = {
  page: 1,
  pageSize: 4,
  sort: "currentBid,desc",
  auctionState: "Complete",
  currentBid: [100, 1000],
  nftType: "",
  position: 0
}
const Dropends = (props) => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState(DEFAULT_FILTER_ENDED_DROPS)
  const [hasMore, setHasMore] = useState(true)

  // const hanldeCompleteAuctionMetaByStatus = () => {
  //   const Complete = "Complete";
  //   const Position = '0'
  //   customeGetAuctionMetaByStatus(Complete, Position).then((res) => {
  //     setData(res);
  //   });
  // };

  const handleGetData = (filter) => {
    getListAuctions(filter).then(res => {
      setData(res?.data?.data?.auctions)
      setHasMore(true)
      if (res?.data?.data?.totalRecord === res?.data?.data?.auctions?.length) {
        setHasMore(false)
      }
    })
  }


  useEffect(() => {
    handleGetData(filter)
    // callAllData();
  }, [filter]);

  const handleChangeFilter = (name) => {
    if (name === "ALL ") {
      setFilter({
        ...filter,
        nftType: ""
      })
    } else {
      setFilter({
        ...filter,
        nftType: name
      })
    }
  }
  const handleSubmitFilter = (priceRange, type) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: filter.name
    })
  }
  const handleClearFilter = () => {
    
  }
  const handleLoadMore = () => {
      setFilter({
        ...filter,
        pageSize: filter?.pageSize + 4,
      })
  }
  const callAllData = () => {
    // hanldeCompleteAuctionMetaByStatus();
  };
  return (
    <>
      <DropendsComponent data={data}
        handleChangeFilter={handleChangeFilter}
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
        handleLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </>
  );
};

export default Dropends;
