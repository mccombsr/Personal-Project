import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetState } from '../../ducks/reducer';
import user_account from '../../images/user_account.png'


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
                    <img onLoad={()=>console.log('loaded home img')} src={require('../../images/home.png')} alt='home icon' />
                </Link>
                <Link to='customerAccount'>
                    <img onLoad={(e)=>{
                        e.target.style.fontFamily = 'initial'
                        let element = e.target
                        setTimeout(()=>{
                            element.style.fontFamily = 'inherit'
                        },0)
                    }} 
                    src={user_account} alt='user account icon'/>
                </Link>
                <Link to='businessAccount'>
                    <img src={require('../../images/business_account.png')} />
                </Link>
                <Link to='/' className="logout" onClick={() => { this.handleLogout() }}>
                    <img src={require('../../images/Logout.png')} alt='logout icon' />
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

