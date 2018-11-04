import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentBusiness } from '../../ducks/reducer';

export class BusinessCard extends Component {

    render() {
        console.log(this.props.businessInfo)

        return (
            <Link to='/BusinessInfo'>
                <div className="businessCardContainer">
                    <div className='businessCard'>
                        <div onClick={() => this.props.updateCurrentBusiness(this.props.businessInfo)}>
                            <h1>{this.props.businessInfo.business_name}</h1>
                            <img src={this.props.businessInfo.business_picture} alt="logo" />
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps(state) {
    const { currentBusiness } = state;
    console.log(currentBusiness)
    return {
        currentBusiness
    }
}

export default connect(mapStateToProps, { updateCurrentBusiness })(BusinessCard);