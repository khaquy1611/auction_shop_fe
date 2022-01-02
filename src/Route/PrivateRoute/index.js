import React from "react";
import { Route, Redirect } from "react-router-dom";
import Privacy from "../../components/Privacy";

function PrivateRoute(props) {
  const { component: ChildrenAdminComponent, ...remainProps } = props;
  return (
    <>
      <Route
        exact
        {...remainProps}
        render={(routeProps) =>
          localStorage.getItem("TOKEN_KEY")  ? (
            localStorage.getItem("ACCEPT_TERN") === 'true' ? (
              <ChildrenAdminComponent {...routeProps} />
            ) : (
              <Privacy />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    </>
  );
}



export default React.memo(PrivateRoute);
