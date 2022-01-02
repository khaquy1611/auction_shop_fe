import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "../../screens/MarketPlace/MarketPlace.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown/DropdownObject";
import IntlMessages from "../../i18n/IntlMessages";
import { getNFTs, getNFTTypes } from "../../services/NFT";

const dateOptions = [
  {
    label: <IntlMessages id="market.filter.recentlyAdded" />,
    value: true,
  },
  {
    label: <IntlMessages id="market.filter.oldest" />,
    value: false,
  },
];
const likesOptions = [
  {
    label: <IntlMessages id="market.filter.mostLiked" />,
    value: true,
  },
  {
    label: <IntlMessages id="market.filter.leastLiked" />,
    value: false,
  },
];
const creatorOptions = [
  {
    label: <IntlMessages id="market.filter.verifiedOnly" />,
    value: 1,
  },
  {
    label: <IntlMessages id="market.filter.all" />,
    value: 2,
  },
];

const DEFAULTFILTER = {
  step: 1,
  min: 10,
  max: 100000,
  priceRange: [100, 100000],
};

const FilterComponent = (props) => {
  const { handleChangeFilter, handleSubmitFilter, handleClearFilter } = props;
  const [activeIndex, setActiveIndex] = useState(5);
  const [filter, setFilter] = useState();
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [priceRange, setPriceRange] = useState(DEFAULTFILTER.priceRange);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [nftTypes, setNftList] = useState([]);
  const [type, setType] = useState("");

  const loadNFTTypes = () => {
    getNFTTypes().then((res) => {
      setNftList(res);
      setFilter(res[0]);
    });
  };
  const ChangeActive = (type, index) => {
    setFilter(type);
    setActiveIndex(index);
    handleChangeFilter(type?.name);
  };

  const onSearchChange = (e) => {
    let sr = e.target.value;
    setSearch(sr);
  };
  const handleFilter = () => {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setShowFilter(true);
      } else {
        setShowFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);
    loadNFTTypes();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hanldeSubmitForm = () => {
    handleSubmitFilter(priceRange, filter);
  };

  const hanldeClearForm = () => {
    handleClearFilter(DEFAULTFILTER.priceRange, filter);
    setDate(dateOptions[0]);
    setLikes(likesOptions[0]);
    setCreator(creatorOptions[0]);
    setPriceRange(DEFAULTFILTER.priceRange);
    //  hanldeSubmitForm()
  };

  return (
    <>
      <div className={styles.filterMobile} style={{}}>
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            type="text"
            value={search}
            onChange={onSearchChange}
            name="search"
            placeholder="Type your keywords"
            required
          />
        </div>
        <div className={styles.item}>
          <Dropdown
            className={styles.dropdown}
            value={date}
            setValue={(date) => setDate(date)}
            options={dateOptions}
          />
        </div>
      </div>
      <div className={styles.nav}>
        {nftTypes
          .sort((a, b) => a.id - b.id)
          .map((type, index) => {
            return (
              <button
                className={cn(styles.link, {
                  [styles.active]: index === activeIndex,
                })}
                onClick={() => ChangeActive(type, index)}
                key={index}
              >
                <IntlMessages id={"market.navs." + type.name} />
              </button>
            );
          })}
        <div className={styles.reset}>
          <button
            className={cn("button", styles.button)}
            onClick={() => handleFilter()}
          >
            <span>
              <IntlMessages id="market.filter" />
            </span>
            <Icon
              name={showFilter ? "close" : "filter"}
              size={showFilter ? "10" : "15"}
            />
          </button>
        </div>
      </div>
      <div className={cn(showFilter ? styles.showFilter : "", styles.filters)}>
        <div className={styles.range}>
          <div className={styles.label}>
            <IntlMessages id="market.filter.priceRange" />
          </div>
          <Range
            values={priceRange}
            step={DEFAULTFILTER.step}
            min={DEFAULTFILTER.min}
            max={DEFAULTFILTER.max}
            rtl={false}
            onChange={(priceRange) => setPriceRange(priceRange)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                  // backgroundColor: 'coral'
                }}
              >
                <div
                  className={styles.processBar}
                  ref={props.ref}
                  style={{
                    height: "16px",
                    width: "100%",
                    borderRadius: "8px",
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ["#E6E8EC", "#ee4e00", "#E6E8EC"],
                      min: DEFAULTFILTER.min,
                      max: DEFAULTFILTER.max,
                      rtl: false,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "24px",
                  width: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#ee4e00",
                  border: "4px solid #FCFCFD",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-33px",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontFamily: "Poppins",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    backgroundColor: isDragged ? "#548BF4" : "#CCC",
                  }}
                >
                  {priceRange[index].toFixed(1)}
                </div>
              </div>
            )}
          />
          <div className={styles.scale}>
            <div className={styles.number}>$10</div>
            <div className={styles.number}>$1,000</div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <IntlMessages id="home.filter.price" />
          </div>
          <Dropdown
            className={styles.dropdown}
            value={date}
            setValue={(date) => setDate(date)}
            options={dateOptions}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <IntlMessages id="market.filter.likes" />
          </div>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <IntlMessages id="market.filter.creator" />
          </div>
          <Dropdown
            className={styles.dropdown}
            value={creator}
            setValue={(creator) => setCreator(creator)}
            options={creatorOptions}
          />
        </div>
        <div className={styles.BtnFilter}>
          <button className={styles.clear} onClick={hanldeClearForm}>
            <Icon name="circle-close" size="24" />
            <IntlMessages id="profile.clearAll" />
          </button>
          <p className={styles.SubmitFilter} onClick={hanldeSubmitForm}>
            <IntlMessages id="filter.btn" />
          </p>
        </div>
      </div>
    </>
  );
};
export default FilterComponent;
