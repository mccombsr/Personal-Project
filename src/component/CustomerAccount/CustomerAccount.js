import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import axios from 'axios';


export class CustomerAccount extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: this.props.user.users_name,
            phone: this.props.user.users_phone,
            email: this.props.user.users_email
        }
        console.log('state', this.state);
    }

    async componentDidMount(user){
        let res = await axios.get(`api/user-data`)
        // console.log(res.data)
        this.props.updateUser(res.data)
    }

    handleDeleteUser(users_id) {
        console.log(users_id)
        axios.delete(`/api/users/${users_id}`)
            .then(axios.get(`/auth/logout`))
            .then(this.props.history.push('/'));
    }

    handleSubmit(users_id) {
        console.log(users_id);
        axios.put(`api/users/${users_id}`, {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email
        })
    }

    handleName(value) {
        this.setState({
            name: value
        })
        console.log('new name', this.state.name)
    }

    handlePhone(value) {
        this.setState({
            phone: value
        })
        console.log('new phone', this.state.phone)
    }

    handleEmail(value){
        this.setState({
            email: value
        })
        console.log('new email', this.state.email)
    }

    render() {
        // console.log(this.props.user[0]);
        let {
            users_id
        } = this.props.user;
            console.log(users_id);
        return (
            <div className="customerInfoContainer">
                <h1>Customer Account</h1>
                <div className='customerAccountForm'>
                    <h2>Name: </h2>
                    <input type="text" 
                    onChange={(e)=>this.handleName(e.target.value)}
                    />
                    <h2>Phone: </h2>
                    <input type="text" 
                    onChange={(e)=>this.handlePhone(e.target.value)}
                    />
                    <h2>Email: </h2>
                    <input type="text"
                        onChange={(e) => this.handleEmail(e.target.value)}
                    />
                </div>
                <div className="submitInfo">
                    <button className="submitButton"
                        onClick={() => this.handleSubmit(users_id)}
                    >Submit</button>
                </div>
                <div className="deleteAccount" onClick={() => this.handleDeleteUser(users_id)}>
                    <button>Delete Account</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    }
}

export default connect(mapStateToProps, {updateUser})(CustomerAccount);