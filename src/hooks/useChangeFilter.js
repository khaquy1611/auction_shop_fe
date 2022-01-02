import { useState, useEffect } from "react";

const useChangeFilter = (data) => {
  const [dataItem, setDataItem] = useState();
  const [art, setArt] = useState([]);
  const [game, setGame] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [music, setMusic] = useState([]);
  const [video, setVideo] = useState([]);
  useEffect(() => {
    if (data) {
      const game = [];
      const photo = [];
      const music = [];
      const art = [];
      const video = [];
      data.map((item, index) => {
        if (item?.nftCollection[0]?.nftTypeName === "Photography") {
          photo.push(item);
        }
        if (item?.nftCollection[0]?.nftTypeName === "Game") {
          game.push(item);
        }
        if (item?.nftCollection[0]?.nftTypeName === "Art") {
          art.push(item);
        }
        if (item?.nftCollection[0]?.nftTypeName === "Music") {
          music.push(item);
        }
        if (item?.nftCollection[0]?.nftTypeName === "Video") {
          video.push(item);
        }
      });
      setPhoto(photo);
      setGame(game);
      setArt(art);
      setDataItem(art);
      setMusic(music);
      setVideo(video);
    }
  }, [data]);

  const handleChangeFilter = (value) => {
    if (value === 0) {
      setDataItem(art);
    }
    if (value === 1) {
      setDataItem(game);
    }
    if (value === 2) {
      setDataItem(photo);
    }
    if (value === 3) {
      setDataItem(music);
    }
    if (value === 4) {
      setDataItem(video);
    }
  };

  const dataFilter = (value, data) => {
    const dataFilter = [];
    if (value[0] === 1000) {
      data.map((item) => {
        if (parseInt(item?.currentBid) >= value[0]) {
          dataFilter.push(item);
        }
      });
    }
    if (value[0] < 1000) {
      data.map((item) => {
        if (value[0] >= parseInt(item?.currentBid)) {
          dataFilter.push(item);
        }
      });
    }
    setDataItem(dataFilter);
  };

  const handleSubmitFilter = (value, index) => {
    if (index === 0) {
      dataFilter(value, art);
    }
    if (index === 1) {
      dataFilter(value, game);
    }
    if (index === 2) {
      dataFilter(value, photo);
    }
    if (index === 3) {
      dataFilter(value, music);
    }
    if (index === 4) {
      dataFilter(value, video);
    }
  };
  const handleClearFilter = (value) => {
    handleChangeFilter(value);
  };
  return {
    dataItem,
    handleSubmitFilter,
    handleClearFilter,
    handleChangeFilter,
  };
};

export default useChangeFilter;
