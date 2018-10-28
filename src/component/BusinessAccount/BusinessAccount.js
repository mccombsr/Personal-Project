import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateBusinessAccount } from '../../ducks/reducer';
import axios from 'axios';

export class BusinessAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            businessName: '',
            businessPhone: '',
            businessEmail: '',
            businessBlurb: '',
            operatingZips: '',
        }
    }


    async componentDidMount() {
        let res1 = await axios.get(`api/user-data`)
        console.log(res1.data)
        this.props.updateUser(res1.data);

        let res2 = await axios.get(`api/business-data/${res1.data.users_id}`);
        console.log('this is res2.data[0]', res2.data[0])
        this.props.updateBusinessAccount(res2.data[0])
        this.setState({
            businessName: this.props.businessAccount.business_name,
            businessPhone: this.props.businessAccount.business_phone,
            businessEmail: this.props.businessAccount.business_email,
            businessBlurb: this.props.businessAccount.business_blurb,
            operatingZips: this.props.businessAccount.operating_zips
        })
        console.log(this.state)
    }

    handleDeleteBusiness(props) {
        // console.log(props)
        console.log(props.businessAccount.business_id)
        console.log(props.user.users_id)
        axios.delete(`api/delete-business/${props.businessAccount.business_id}/${props.user.users_id}`)
        .then(axios.get(`/auth/logout`))
        .then(this.props.history.push('/'));
    }

    handleSubmit (props){
        console.log(props.businessAccount.business_id);
        console.log(this.state);
        axios.put(`/api/update-business-info/${props.businessAccount.business_id}`, {
            businessName: this.state.businessName,
            businessPhone: this.state.businessPhone,
            businessEmail: this.state.businessEmail,
            businessBlurb: this.state.businessBlurb,
            operatingZips: this.state.operatingZips
        })
    }

    handleBusinessName(value){
        this.setState({
            businessName: value
        })
        console.log(`businessName: ${this.state.businessName}`)
    }
    handleBusinessPhone(value){
        this.setState({
            businessPhone: value
        })
        console.log(`businessPhone: ${this.state.businessPhone}`)
    }

    handleBusinessEmailbusinessEmail(value){
        this.setState({
            businessEmail: value
        })
        console.log(`businessEmail: ${this.state.businessEmail}`)
    }

    handleBusinessBlurb(value){
        this.setState({
            businessBlurb: value
        })
        console.log(`businessBlurb: ${this.state.businessBlurb}`)
    }

    handleOperatingZips(value){
        this.setState({
            operatingZips: value
        })
        console.log(`operatingZips: ${this.state.operatingZips}`)
    }

    render() {
        return (
            <div className="businessAccountContainer">
                <h1>Business Account</h1>
                <div className='businessAccountForm'>
                    <h2>Business Name: </h2>
                    <input type="text"
                        onChange={(e) => this.handleBusinessName(e.target.value)}
                    />
                    <h2>Phone: </h2>
                    <input type="text"
                        onChange={(e) => this.handlePhone(e.target.value)}
                    />
                    <h2>Email: </h2>
                    <input type="text"
                        onChange={(e) => this.handleEmail(e.target.value)}
                    />
                    <h2>About Us: </h2>
                    <input type="text"
                        onChange={(e) => this.handleBlurb(e.target.value)}
                    />
                    <h2>Locations of Operation: </h2>
                    <input type="text"
                        onChange={(e) => this.handleOperatingZips(e.target.value)}
                    />
                </div>
                <div className="submitInfo">
                    <button onClick={()=> this.handleSubmit(this.props)}>Submit</button>
                </div>
                <div className="deleteAccount">
                    <button onClick={() => this.handleDeleteBusiness(this.props)}>Delete Account</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { businessAccount, user } = state;
    console.log(businessAccount)
    return {
        businessAccount,
        user
    }
}

export default connect(mapStateToProps, { updateUser, updateBusinessAccount })(BusinessAccount);