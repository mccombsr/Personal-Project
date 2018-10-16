import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { updateUser } from '../../ducks/reducer';
// import axios from 'axios';
import './Nav.css';



class Nav extends Component {

    // async componentDidMount(user) {
    //     let res = await axios.get(`/api/user-data`)
    //     console.log(res.data)
    //     // invoke action creator
    //     this.props.updateUser(res.data)
    // }

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
                <Link to='/home'>
                    <button>Home</button>
                </Link>
                {/* <Link to='/post'>
                    <button>New Post</button>
                </Link> */}
                <Link to='/'>
                    <button>Logout</button>
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

export default Nav;