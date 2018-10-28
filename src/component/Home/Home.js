import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer';
import BusinessCard from './BusinessCard';
import axios from 'axios';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    async componentDidMount() {
        let res = await axios.get(`api/user-data`)
        console.log(res.data)
        this.props.updateUser(res.data)
        console.log(this.props.user)
    }

    handleSearchUpdate(value) {
        console.log(value)
        this.setState({
            search: value
        })
        console.log(this.state.search)
    }

    async handleSearchSubmit() {
        console.log(this.state.search)
        let res = await axios.get(`/api/zip-search/${this.state.search}`)
        console.log(res.data)
        var businesses = res.data.map(business => {
            return (
                <BusinessCard businessInfo={business} />
            )
        })
        return businesses;
    }


    render() {
        // console.log(this.props)
        let {
            users_name,
            users_picture,
        } = this.props.user;

        // if(businesses){
        //     return(
        //         <div>
        //             {businesses}
        //         </div>
        //     )
        // } else {
        //     return(
        //         <div></div>
        //     )
        // }

        return (
            <div className="homeContainer">
                <h1>Home</h1>

                <div className="userInfoContainer">
                    <p>{users_name}</p>
                    <img className='userPic' src={users_picture} alt='userpic' />
                </div>

                <input type="text" placeholder="Search by zip code" onChange={(e) => this.handleSearchUpdate(e.target.value)} />
                <button onClick={() => this.handleSearchSubmit()}>Search</button>
                <div>
                    {businesses}
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    console.log(state);
    return {
        user
    }
}

export default connect(mapStateToProps, { updateUser })(Home);