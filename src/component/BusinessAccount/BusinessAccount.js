import React, {Component} from 'react';

export default class BusinessAccount extends Component{


    render(){
        return(
            <div className="businessAccountContainer">
                <h1>Business Account</h1>
                <div className="submitInfo">
                    <button>Submit</button>
                </div>
                <div className="deleteAccount">
                    <button>Delete Account</button>
                </div>
            </div>
        )
    }
}