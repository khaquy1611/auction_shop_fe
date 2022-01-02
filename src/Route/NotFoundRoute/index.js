import * as React from "react";
import { Route } from "react-router-dom";
import NotFoundComponents from "../../components/NotFoundComponents";
function NotFoundRoute(props) {
  return <Route path="*" exact={true} component={NotFoundComponents} />;
}

export default NotFoundRoute;
