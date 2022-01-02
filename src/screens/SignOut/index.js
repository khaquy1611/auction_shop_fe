import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Auth} from 'aws-amplify';
import {doLogoutAction} from "../../actions/AppActions";
import {FCM_TOKEN_KEY} from "../../constants/Configs";
import {deleteFcmToken} from '../../services/UserService';

class SignOut extends React.Component {

    componentDidMount() {
        Auth.signOut();
        this.props.dispatch(doLogoutAction());
        this.props.history.push("/");

        const fcmToken = localStorage.getItem(FCM_TOKEN_KEY);

        deleteFcmToken({
            sub: this.props.user.sub,
            token: fcmToken
        });

        localStorage.removeItem(FCM_TOKEN_KEY);
        localStorage.clear()
    }

    render() {
        return <></>;
    }
}

const mapStateToProps = ({app}) => ({
    user: app.user
})

export default withRouter(connect(mapStateToProps)(SignOut));
