import React, { Component } from 'react';

export default class Auth extends Component {

    login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        // window.location.origin ===> fancy way of saying http://localhost:3000
        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }


    render() {
        return (
            <div className="authContainer">
                <h1>Auth</h1>
                <div>
                    <button onClick={this.login}>Login/Register</button>
                </div>
            </div>
        )
    }
}