import React, { Component } from 'react';

export default class AccountSetup extends Component {

    

    render() {
        return (
            <div className="AccountSetupContainer">
                <h1>AccountSetup</h1>
                <div>
                    <p>Are you making a business account?</p>
                </div>
                <div>
                    <button>Yes</button>
                    <button>No</button>
                </div>
            </div>
        )
    }
}