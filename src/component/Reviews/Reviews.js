import React, { Component } from 'react';

export default class Reviews extends Component {


    render() {

        console.log(this.props);
        return (
                <div className="reviewInstance">
                    <div className='reviewHeader'>
                        <h1>{this.props.reviewInfo.users_name}</h1>
                        {/* <div className='stars' data-rating="3">
                            review
                        </div> */}
                    </div>
                    <div className="reviewComment">
                        <p>
                            {this.props.reviewInfo.review}
                        </p>
                    </div>
                </div>
        )
    }
}