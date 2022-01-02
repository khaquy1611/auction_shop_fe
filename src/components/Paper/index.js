import React from "react";
import styles from "./Paper.module.sass";
function Paper(props) {
  const { children } = props;
  return (
    <>
     {children}
    </>
  );
}

export default Paper;
