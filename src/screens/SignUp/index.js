import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { doLoginAction, doChangeLocaleAction } from "../../actions/AppActions";
import {
  getCurrentUserProfile,
  synchronizeUser,
  activityLogin,
} from "../../services/UserService";
import * as _ from "lodash";
import { lang } from "../../constants/constants";
let lastEvent;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (localStorage.getItem("TOKEN_KEY")) {
      this.props.history.push("/");

      this.props.dispatch(
        doLoginAction({
          user: this.state.user,
        })
      );
    }
  }

  componentDidMount() {
    onAuthUIStateChange(async (authState, authData) => {
      if (
        AuthState.SignedIn === authState &&
        authState !== lastEvent &&
        !localStorage.getItem("TOKEN_KEY")
      ) {
        localStorage.setItem("TOKEN_KEY", authData.userDataKey);
        activityLogin();
        let dbUser = await getCurrentUserProfile()
          .then((res) => {
            localStorage.setItem("ACCEPT_TERN", res.accept_terms);
            if (res.language.length > 0) {
              this.props.dispatch(
                doChangeLocaleAction({
                  locale: _.find(lang, ["locale", res.language]),
                })
              );
            }
            return res;
          })
          .catch((err) => {
            console.log("err", err);
          });

        this.setState({
          user: dbUser,
        });

        if (!dbUser) {
          const { email, sub } = authData;
          const result = await synchronizeUser({ email, sub });

          this.setUser(result);
        }
      }
      // dhs shit lib fired many request/event.
      lastEvent = authState;
    });
  }

  render() {
    return (
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Email: ",
              placeholder: "Enter your email",
              inputProps: { required: true, autocomplete: "username" },
            },
            {
              type: "password",
              label: "Password: ",
              placeholder: "Enter your password",
              inputProps: { required: true, autocomplete: "new-password" },
            },
          ]}
        />
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      </AmplifyAuthenticator>
    );
  }
}

export default withRouter(connect()(SignUp));
