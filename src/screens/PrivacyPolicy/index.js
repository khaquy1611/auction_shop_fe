import React, { useState } from 'react';
import IntlMessages from "../../i18n/IntlMessages";
import "./styles.scss"
import HeaderSlides from '../../components/HeaderSlides/index'

const PrivacyPolicy = () => {
  const [privacyUrl, setPrivacyUrl] = useState("https://drive.google.com/viewerng/viewer?embedded=true&url=" + process.env.PRIVACY_URL + "#toolbar=0&scrollbar=0")

  return (
    <>
    <HeaderSlides/>
    <div className="container wrapper">
      <h2 className="head"><IntlMessages id="term.policyAndPolicy.title" /></h2>
      <div className="content-wrapper">
        <div className='pdf-view'>
          <div>
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PrivacyPolicy;
