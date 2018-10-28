import React, { Component } from 'react';
import axios from 'axios';

export default class AccountSetup extends Component {

    updateBusinessAccount(event){
        axios.put('/api/updateba', {}, {
            params: {
                event
            }
        })
        .then( (res)=> {
        console.log(res.data);
            if(res.data === true){
                axios.put(`api/create-business`);
                this.props.history.push(`/businessAccount`)
            } else {
                this.props.history.push(`/customerAccount`);
            }
        })
        // .then(axios.get(`/auth/logout`))
        // .then(this.props.history.push(`/auth`));
    }

    render() {
        console.log(this.props)
        return (
            <div className="AccountSetupContainer">
                <h1>AccountSetup</h1>
                <div>
                    <p>Are you making a business account?</p>
                </div>
                <div>
                    <button onClick={()=> this.updateBusinessAccount(true)}>Yes</button>
                    <button onClick={()=> this.updateBusinessAccount(false)}>No</button>
                </div>
            </div>
        )
    }
}