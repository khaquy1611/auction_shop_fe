import React, { useEffect, useState } from "react";
import ClosingComponent from "./UpcomingDropsComponent";
import { getListAuctions } from "../../services/Location";
const DEFAULT_FILTER_CLOSING = {
  page: 1,
  pageSize: 8,
  sort: "currentBid,desc",
  auctionState: "Closing",
  currentBid: [100, 100000],
  nftType: "",
  position: 0,
};
const Closing = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState(DEFAULT_FILTER_CLOSING);
  const [hasMore, setHasMore] = useState(true);
  const handleGetData = (filter) => {
    console.log("filter", filter);
    getListAuctions(filter).then((res) => {
      console.log("res", res);
      setData(res?.data?.data?.auctions);
      setHasMore(true);
      if (res?.data?.data?.totalRecord === res?.data?.data?.auctions?.length) {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
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
      <ClosingComponent
        data={data}
        handleChangeFilter={handleChangeFilter}
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
        handleLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </>
  );
};

export default Closing;
