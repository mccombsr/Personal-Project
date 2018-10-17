import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSearch} from '../../ducks/reducer';
import {updateUser} from '../../ducks/reducer';
import BusinessCard from './BusinessCard';
import axios from 'axios';

export class Home extends Component{

    async componentDidMount(user){
        let res = await axios.get(`api/user-data`)
        console.log(res.data)
        this.props.updateUser(res.data)
    }


    render(){
        console.log(this.props)
        let {
            users_name,
            users_picture,
        } = this.props.user;
        return(
            <div>
                <h1>Home</h1>
                <div>
                    <p>User Name: {users_name}</p>
                    <img className='userPic' src={users_picture}/>
                </div>
                <input type="text" placeholder="Search by title" onChange={this.props.updateSearch} />
                <BusinessCard/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {search, user} = state;
    console.log(state);
    return{
        search,
        user
    }
}

export default connect(mapStateToProps, {updateSearch, updateUser})(Home);