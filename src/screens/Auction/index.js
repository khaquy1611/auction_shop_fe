import React, { useEffect, useState } from "react";
import { customeGetAuctionMetaByStatus } from "../../apiContract/listenAuction";
import AuctionComponent from "./AuctionComponent";
import { getListAuctions } from "../../services/Location";

const DEFAULT_FILTER_AUCTION = {
  page: 1,
  pageSize: 8,
  sort: "startingPrice,desc",
  auctionState: "Open",
  currentBid: [100, 100000],
  nftType: "",
  position: 4,
};
const Auction = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState(DEFAULT_FILTER_AUCTION);
  const [hasMore, setHasMore] = useState(true);
  const handleGetData = (filter) => {
    getListAuctions(filter).then((res) => {
      setData(res?.data?.data?.auctions);
      setHasMore(true);
      if (res?.data?.data?.totalRecord === res?.data?.data?.auctions?.length) {
        setHasMore(false);
      }
    });
  };
  useEffect(() => {
    // callAllData();
    handleGetData(filter);
  }, [filter]);

  const handleChangeFilter = (name) => {
    if (name === "ALL ") {
      setFilter({
        ...filter,
        nftType: "",
      });
    } else {
      setFilter({
        ...filter,
        nftType: name,
      });
    }
  };
  const handleSubmitFilter = (priceRange, currentFilter) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: `${currentFilter.name}`,
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

  return (
    <>
      <AuctionComponent
        data={data}
        callAllData={() => {}}
        handleChangeFilter={handleChangeFilter}
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
        handleLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </>
  );
};

export default Auction;
