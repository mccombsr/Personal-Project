import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {updateCurrentBusiness} from '../../ducks/reducer';

export class BusinessCard extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         currentBusiness: this.props.business_id
    //     }
    //     console.log(this.props.businessInfo)
    // }

    render() {
        console.log(this.props.businessInfo)
        // let {
        //     business_id,
        //     users_id,
        //     operating_zips,
        //     business_picture,
        //     business_phone,
        //     business_name,
        //     business_email,
        //     business_blurb
        // } = this.props.businessInfo
        // console.log(this.props.businessInfo)


        return (
            <div className="businessCardContainer">
                <Link to='/BusinessInfo'>
                    <div onClick={()=>this.props.updateCurrentBusiness(this.props.businessInfo)}>
                        <h1>{this.props.businessInfo.business_name}</h1>
                        <img src={this.props.businessInfo.business_picture} alt="logo"/>
                    </div>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentBusiness} = state;
    console.log(currentBusiness)
    return {
        currentBusiness
    }
}

export default connect(mapStateToProps, {updateCurrentBusiness})(BusinessCard);