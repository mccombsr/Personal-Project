import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { updateUser } from '../../ducks/reducer';
// import axios from 'axios';


export default class Nav extends Component {

    // async componentDidMount(user) {
    //     let res = await axios.get(`/api/user-data`)
    //     console.log(res.data)
    //     // invoke action creator
    //     this.props.updateUser(res.data)
    // }


    
/**************************************************************
 * THIS SHOULD BE DESTROYING THE SESSION AND SENDING USER BACK TO AUTH PAGE BELOW
 * **********************************************************/ 
    handleLogout(){
        axios.get(`/auth/logout`)
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
                    <img src="https://cdn1.iconfinder.com/data/icons/mirrored-twins-icon-set-hollow/512/PixelKit_home_icon.png" alt='home icon'/>
                </Link>

                <Link to='/' className="logout" onClick={()=>{this.handleLogout()}}>
                    <img src="https://cdn1.iconfinder.com/data/icons/interface-elements-ii-1/512/Logout-512.png" alt='logout icon'/>
                </Link>
            </div>
        )
    }
}


// function mapStateToProps(state) {
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps, { updateUser })(Nav);

