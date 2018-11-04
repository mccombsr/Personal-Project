import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';


export class CustomerAccount extends Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.state = {
            name: this.props.user.users_name,
            phone: this.props.user.users_phone,
            email: this.props.user.users_email
        }
        console.log('state', this.state);
    }

    async componentDidMount() {
        let res = await axios.get(`api/user-data`)
        console.log(res.data)
        this.props.updateUser(res.data)
        this.setState({
            name: this.props.user.users_name,
            phone: this.props.user.users_phone,
            email: this.props.user.users_email
        })
        console.log(this.state)
    }

    handleDeleteUser(users_id) {
        console.log(users_id)
        axios.delete(`/api/users/${users_id}`)
            .then(axios.get(`/auth/logout`))
            .then(this.props.history.push('/'));
    }

    async handleSubmit(users_id) {
        console.log(users_id);
        let res = await axios.put(`api/users/${users_id}`, {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email
        })
        this.props.updateUser(res.data);
        console.log(this.props)
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

    handleEmail(value) {
        this.setState({
            email: value
        })
        console.log('new email', this.state.email)
    }

    render() {
        console.log(this.props.user);
        let {
            users_id
        } = this.props.user;
        console.log(users_id);
        return (
            <div className="customerInfoContainer">
                <h1>User Account</h1>
                <div className='customerAccountForm'>
                    <h2>Name: </h2>
                    <input type="text"
                        onChange={(e) => this.handleName(e.target.value)}
                    />
                    <h2>Phone: </h2>
                    <input type="text"
                        onChange={(e) => this.handlePhone(e.target.value)}
                    />
                    <h2>Email: </h2>
                    <input type="text"
                        onChange={(e) => this.handleEmail(e.target.value)}
                    />
                    <Link to='home' className="submitInfo">
                            <button className="submitButton"
                                onClick={() => this.handleSubmit(users_id)}
                            >Submit Changes</button>
                    </Link>
                </div>
                <Link to='/editReviews'>
                    <button>My Reviews</button>
                </Link>
                <div className="deleteAccount" onClick={() => this.handleDeleteUser(users_id)}>
                    <button>Delete Account</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state);
    const { user } = state;
    console.log(user)
    return {
        user
    }
}

export default connect(mapStateToProps, { updateUser })(CustomerAccount);