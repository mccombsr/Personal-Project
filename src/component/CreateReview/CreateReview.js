import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class CreateReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newReview: 'newReview'
        }
        console.log(this.props)
    }

    handleNewReview(value) {
        this.setState({
            newReview: value
        })
        console.log(this.state)
    }

    handleSubmitReview(newReview) {
        const {
            users_id
        } = this.props.user;
        console.log(users_id)
        const {
            business_id
        } = this.props.currentBusiness;
        console.log(business_id)

        axios.post(`/api/submit-review/${users_id}/${business_id}`, {
            newReview
        })
    }

    render() {
        console.log(this.state.newReview)
        console.log(this.props)
        return (
            <div className="createReviewContainer">
                <div>
                    <h1>McCombs Cleaning Services</h1>
                </div>
                <textarea maxLength='5000'
                    onChange={(e) => this.handleNewReview(e.target.value)} />
                <Link to='/businessInfo' className="submitReview">
                <button
                    onClick={() => this.handleSubmitReview(this.state.newReview)}
                >Submit Review</button>
                </Link>
                <Link to='/businessInfo' className="cancelReview">
                    <button>Cancel</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return (
        state
    )
}

export default connect(mapStateToProps)(CreateReview);