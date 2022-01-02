import React, { useState } from "react";
import Pagination from "rc-pagination";
import "./styles.css";

function PaginationComponent(props) {
  const { handleChange, current, total } = props;
  //   const onChange = (page) => {
  //     handleChange(page);
  //   };
  return <Pagination onChange={handleChange} current={current} total={total} />;
}

export default PaginationComponent;
