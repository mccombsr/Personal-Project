import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetState } from '../../ducks/reducer';


export class Nav extends Component {

    // async componentDidMount(user) {
    //     let res = await axios.get(`/api/user-data`)
    //     console.log(res.data)
    //     // invoke action creator
    //     this.props.updateUser(res.data)
    // }



    /**************************************************************
     * THIS SHOULD BE DESTROYING THE SESSION AND SENDING USER BACK TO AUTH PAGE BELOW
     * **********************************************************/
    handleLogout() {
        axios.get(`/auth/logout`)
            .then(() => resetState());
    }
    /**************************************************************
     * THIS SHOULD BE DESTROYING THE SESSION AND SENDING USER BACK TO AUTH PAGE ABOVE
     * **********************************************************/

    render() {
        // console.log(this.props)
        // let {
        //     customer_name,
        //     customer_picture
        // } = this.props.user;
        // if(this.props.location.pathname === '/'){
        //     return null;
        // } else {
        return (
            <div className='navContainer'>
                <Link to='/home' className="home">
                    <img src={require('../../home.png')} alt='home icon' />
                </Link>
                <Link to='customerAccount'>
                    <img src={require('../../user.png')} alt='user account icon'/>
                </Link>
                <Link to='businessAccount'>
                    <img src={require('../../business.png')} />
                </Link>
                <Link to='/' className="logout" onClick={() => { this.handleLogout() }}>
                    <img src={require('../../logout.png')} alt='logout icon' />
                </Link>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { resetState })(Nav);

