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
                    <img src="https://cdn1.iconfinder.com/data/icons/mirrored-twins-icon-set-hollow/512/PixelKit_home_icon.png" alt='home icon' />
                </Link>
                <Link to='customerAccount'>
                    <img src='https://cdn0.iconfinder.com/data/icons/logistics-4/512/customer-512.png'/>
                </Link>
                <Link to='businessAccount'>
                    <img src='https://cdn2.iconfinder.com/data/icons/cut-away/164/2-512.png' />
                </Link>
                <Link to='/' className="logout" onClick={() => { this.handleLogout() }}>
                    <img src="https://cdn1.iconfinder.com/data/icons/interface-elements-ii-1/512/Logout-512.png" alt='logout icon' />
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

