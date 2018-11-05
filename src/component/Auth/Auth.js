import React, { Component } from 'react';

export default class Auth extends Component {

    login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }


    render() {
        return (
            <div className="authContainer">
                <h1>Please login or register to get started</h1>
                <div>
                    <button onClick={this.login}>Login/Register</button>
                </div>
            </div>
        )
    }
}