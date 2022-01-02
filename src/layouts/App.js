import Amplify from "aws-amplify";
import _ from "lodash";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doChangeLocaleAction, doLoginAction } from "../actions/AppActions";
import BackOnGoing from "../components/BackOnGoing/index";
import BackToTop from "../components/BackToTop";
import Page from "../components/Page";
import { appRoutes } from "../constants/AppRoutes";
import { lang } from "../constants/constants";
import { privateRoutes } from "../constants/privateRoutes";
// import firebase from "../firebase";
import AppLocale from "../i18n";
import DefaultLayoutRoute from "../Route/DefaulRoute";
import NotFoundRoute from "../Route/NotFoundRoute";
import PrivateRoute from "../Route/PrivateRoute";
import { getCurrentUserProfile } from "../services/UserService";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/app.sass";

function App(props) {
  const { locale } = props;
  const dispatch = useDispatch();
  // const messaging = firebase.messaging();
  // const getToken = async () => {
  //   try {
  //     const token = await messaging.getToken({
  //       vapidKey: process.env.VAPID_KEY_FIREBASE,
  //     });
  //     if (token) {
  //       localStorage.setItem("FCM_TOKEN_KEY", token);
  //       // registerFcmToken({
  //       //   token: token,
  //       // });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // onMessageListener()
  //   .then((payload) => {
  //     console.log("payload", payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  useEffect(() => {
    Amplify.Auth.currentSession()
      .then((res) => {
        /// Push token firebase
        // getToken();
        /// get User Profile
        getCurrentUserProfile().then((res) => {
          localStorage.setItem("ACCEPT_TERN", res.accept_terms);
          if (res?.language?.length > 0) {
            dispatch(
              doChangeLocaleAction({
                locale: _.find(lang, ["locale", res?.language]),
              })
            );
          }
          dispatch(
            doLoginAction({
              user: res,
            })
          );
        });
      })
      .catch((err) => {
        const mute = err 
        // console.log("err", err);
      });
  });

  const renderDefaultRoutes = () => {
    const xhtml = appRoutes.map((route) => (
      <DefaultLayoutRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ));
    return xhtml;
  };

  const renderAdminRoutes = () => {
    const xhtml = privateRoutes.map((route) => (
      <PrivateRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ));
    return xhtml;
  };

  const renderNotFoundRoute = () => <NotFoundRoute />;
  
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#eeeeee">
        <IntlProvider
          locale={AppLocale[locale.locale].locale}
          messages={AppLocale[locale.locale].messages}
        >
          <div className="overlay">
            <Page>
              <Switch>
                {renderDefaultRoutes()}
                {renderAdminRoutes()}
                {renderNotFoundRoute()}
              </Switch>
              <BackToTop />
              <BackOnGoing />
            </Page>
          </div>
        </IntlProvider>
      </SkeletonTheme>
    </Router>
  );
}

const mapStateToProps = ({ app }) => ({
  locale: app.locale,
});

export default React.memo(connect(mapStateToProps)(App));
