import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
// import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
import ClipLoader from "react-spinners/ClipLoader";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    window.scrollTo(0, 0);
    // clearAllBodyScrollLocks();
  }, [pathname]);
  const handleLoader = (value) => { 
    if (value) {
      setLoader(false)
    }
  }
  return (
    <>
      {
        loader && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',backgroundColor: '#f5f5f5' }}>
          <ClipLoader color="#ee4e00" loading={loader} size={50} />
        </div>
      }
      <div className={styles.page} style={{ display: loader ? 'none' : '' }}>
        <Header handleLoader={handleLoader}/>
        <div className={styles.inner}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default withRouter(React.memo(Page));
