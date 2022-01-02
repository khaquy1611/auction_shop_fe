import React, { useState } from "react";
import IntlMessages from "../../i18n/IntlMessages";
import styles from "./TermAndCondtion.module.sass";
import HeaderSlides from "../../components/HeaderSlides/index";

const TermAndCondition = () => {
  const [termsUrl, setTermsUrl] = useState(
    "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
      process.env.TERMS_URL +
      "#toolbar=0&scrollbar=0"
  );

  return (
    <>
      <HeaderSlides />
      <div className="container wrapper">
        <h2 className="head">
          <IntlMessages id="term.policy.title" />
        </h2>

        <div className="content-wrapper">
          
        </div>
      </div>
    </>
  );
};

export default TermAndCondition;
