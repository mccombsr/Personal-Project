import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class EditReviews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
    }

    async componentDidMount() {
        let res = await axios.get(`/api/customer-reviews/${this.props.users_id}`)
        this.setState({
            reviews: res.data
        })
    }

    async handleDeleteReview(review_id, users_id) {

        let res = await axios.delete(`/api/delete-review/${review_id}/${users_id}`)
        this.setState({
            reviews: res.data
        })
    }

    handleNewReview() {

    }

    render() {
        console.log(this.state.reviews)

        let displayReviews = this.state.reviews.map(review => {
            console.log(review.review_id)
            let { users_id } = this.props;
            console.log(users_id);

            return (
                <div>
                    <div className="myReviewContainer">
                    <div className='myReviewHeader'>
                        <h1>{review.business_name}</h1>
                        <h1>{review.users_name}</h1>
                    </div>
                        <p>{review.review}</p>
                        {/* <Link to='/newReview'>
                            Write a new review
                    </Link> */}
                        <button onClick={() => this.handleDeleteReview(review.review_id, users_id)}>Delete</button>
                    </div>
                </div>
            )
        })

        return (
            <div className='editReviewsContainer'>
                <h1 className='myReviewsHeader'>My Reviews</h1>
                <div className='myReviewsContainer'>
                    {displayReviews}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user } = state
    console.log(user);
    return (
        user
    )
}

export default connect(mapStateToProps)(EditReviews)