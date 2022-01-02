import React, { useEffect, useMemo, useState } from "react";
import {
  customGetListing,
  customGetMarket,
} from "../../apiContract/listenMarketplace";
import { customeGetMetaData } from "../../apiContract/listenNFT";
import MarketPlaceComponent from "./MaketPlace";
import { getListMaketPlace } from '../../services/Location'

const DEFAULT_FILTER_MAKET_PLACE = {
  page: 1,
  pageSize: 10,
  sort: "marketPlaceId,asc;salePrice,asc",
  salePrice: "",
  nftType: "",
  purchased: "false",
}
const MarketPlace = (props) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER_MAKET_PLACE)
  const [hasMore, setHasMore] = useState(true)

  const handleGetData = (filter) => {
    getListMaketPlace(filter).then(res => {
      setData(res?.data?.data?.marketPlaces)
      setHasMore(true)
      if ( res?.data?.data?.marketPlaces === res?.data?.data?.marketPlaces?.length ) {
        setHasMore(false)
      }
      if ( !res?.data?.data?.marketPlaces?.nfts ) {
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
  const handleClearFilter = (priceRange, currentFilter) => {
    setFilter({
      ...filter,
      currentBid: priceRange,
      nftType: `${currentFilter.name}`,
    });
    
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
      <MarketPlaceComponent data={data} handleChangeFilter={handleChangeFilter}
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
        handleLoadMore={handleLoadMore}
        hasMore={hasMore} />
    </>
  );
};
export default MarketPlace;
