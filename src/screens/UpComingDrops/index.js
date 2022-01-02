import React, { useEffect, useState } from "react";
import { customeGetAuctionMetaByStatus } from "../../apiContract/listenAuction";
import UpcomingDropsComponent from "./UpcomingDropsComponent";
import HeaderSlides from "../../components/HeaderSlides";
import { getListAuctions } from "../../services/Location";

const DEFAULT_FILTER_UPCOMING_DROPS = {
  page: 1,
  pageSize: 8,
  sort: "startingPrice,asc",
  auctionState: "Upcoming",
  startingPrice: [100, 100000],
  nftType: "",
  position: 2,
};
const UpcomingDrops = () => {
  const [dataUpComingDrops, setDataUpComingDrops] = useState();
  const [filter, setFilter] = useState(DEFAULT_FILTER_UPCOMING_DROPS);
  const [hasMore, setHasMore] = useState(true);

  const handleGetData = (filter) => {
    //  console.log(filter);
    getListAuctions(filter).then((res) => {
      setDataUpComingDrops(res?.data?.data?.auctions);
      setHasMore(true);
      if (res?.data?.data?.totalRecord === res?.data?.data?.auctions?.length) {
        setHasMore(false);
      }
    });
  };


  useEffect(() => {
    handleGetData(filter);
    // callAllData();
  }, [filter]);

  const handleChangeFilter = (name) => {
    if (name === "ALL ") {
      setFilter({
        ...filter,
        nftType: name,
      });
    } else {
      setFilter({
        ...filter,
        nftType: name,
      });
    }
  };
  const handleSubmitFilter = (priceRange, type) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: filter.name,
    });
  };
  const handleClearFilter = (priceRange, currentFilter) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: `${currentFilter.name}`,
    });
  };
  const handleLoadMore = () => {
    setFilter({
      ...filter,
      pageSize: filter?.pageSize + 4,
    });
  };
  //   useEffect(() => {
  //     let isMounted = true;
  //     if (isMounted) {
  //       callAllData();
  //     }
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  return (
    <>
      <HeaderSlides />
      <UpcomingDropsComponent
        data={dataUpComingDrops}
        //   callAllData={callAllData}
        hasMore={hasMore}
        handleChangeFilter={handleChangeFilter}
        handleClearFilter={handleClearFilter}
        handleSubmitFilter={handleSubmitFilter}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
};

export default UpcomingDrops;
