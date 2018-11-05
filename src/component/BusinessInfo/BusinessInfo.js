import React, { Component } from 'react';
import Reviews from '../Reviews/Reviews';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class BusinessInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
    }


    async componentDidMount() {
        console.log(this.props.business_id);
        let res = await axios.get(`/api/business-reviews/${this.props.business_id}`)
        console.log(res.data);
        this.setState({
            reviews: res.data
        })

    }

    render() {
        let {
            business_blurb,
            business_email,
            business_id,
            business_name,
            business_phone,
            business_picture
        } = this.props;

        console.log(this.state.reviews);

        let displayReviews = this.state.reviews.map(review => {
            console.log(review);
            return <Reviews key={review.users_name} reviewInfo={review} />
        })


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
                <div className="reviewsContainer">
                    {/* <h1 className='reviewContainerHeader'>Reviews</h1> */}
                    {displayReviews}
                    {/* <div className="newReview"></div> */}
                </div>
                <Link to='/createReview' className='reviewButton'>
                    Write a Review
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