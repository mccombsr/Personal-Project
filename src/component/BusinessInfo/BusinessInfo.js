import React, { Component } from 'react';
import Reviews from '../Reviews/Reviews';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


export class BusinessInfo extends Component {

    render() {
        let {
            business_blurb,
            business_email,
            business_id,
            business_name,
            business_phone,
            business_picture
        } = this.props;

        return (
            <div className="businessInfoContainer">
                <h1 className="businessName">{business_name}</h1>
                <div className="businessPicture">
                    <img src={business_picture} alt='logo' />
                </div>
                <div className='contactInfo'>
                    <p>Phone: {business_phone}</p>
                    <p>Email: {business_email}</p>
                </div>
                {/* <div className='zipContainer'>
                    <ul>
                        <li>84045</li>
                        <li>84045</li>
                        <li>84045</li>
                    </ul>
                </div> */}
                <p className='blurb'>{business_blurb}</p>
                <Reviews />
                <Link to='/createReview' className='reviewButton'>
                <button>Write a Review</button>
                </Link>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { currentBusiness } = state
    console.log(currentBusiness)
    return (
        currentBusiness
    )
}

export default connect(mapStateToProps)(BusinessInfo);