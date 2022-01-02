import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import IntlMessages from "../../i18n/IntlMessages";

export function AuthCluster() {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => fcl.currentUser().subscribe(setUser), []);

  if (user.loggedIn) {
    return (
      <div>
        <span>{user?.addr ?? "No Address"}</span>
        <br />
        <button onClick={fcl.unauthenticate}>
          <IntlMessages id="onFlow.logOut" />
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={fcl.logIn}>
          <IntlMessages id="onFlow.logIn" />
        </button>
        <button onClick={fcl.signUp}>
          <IntlMessages id="onFlow.SignIn" />
        </button>
      </div>
    );
  }
}
