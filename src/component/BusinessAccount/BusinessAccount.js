import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateBusinessAccount } from '../../ducks/reducer';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export class BusinessAccount extends Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.state = {
            businessName: '',
            businessPhone: '',
            businessEmail: '',
            businessBlurb: '',
            operatingZips: '',
            isUploading: false,
            images: [],
            url: '',
            value: ''
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
            operatingZips: this.props.businessAccount.operating_zips,
            url: this.props.businessAccount.business_picture
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

    handleSubmit(props) {
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

    handleBusinessName(value) {
        this.setState({
            businessName: value
        })
        console.log(`businessName: ${this.state.businessName}`)
    }
    handleBusinessPhone(value) {
        this.setState({
            businessPhone: value
        })
        console.log(`businessPhone: ${this.state.businessPhone}`)
    }

    handleBusinessEmail(value) {
        this.setState({
            businessEmail: value
        })
        console.log(`businessEmail: ${this.state.businessEmail}`)
    }

    handleBusinessBlurb(value) {
        this.setState({
            businessBlurb: value
        })
        console.log(`businessBlurb: ${this.state.businessBlurb}`)
    }

    handleOperatingZips(value) {
        this.setState({
            operatingZips: value
        })
        console.log(`operatingZips: ${this.state.operatingZips}`)
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true })
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

        axios.get('/api/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then((response) => {
            console.log(response.data)
            const { signedRequest, url } = response.data
            this.uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err)
        })
    }

    uploadFile = (file, signedRequest, url) => {
        var options = {
            headers: {
                'Content-Type': file.type
            }
        }

        axios.put(signedRequest, file, options)
            .then(response => {
                this.setState({ isUploading: false, url: url });
                console.log(url)
                console.log(this.props.businessAccount.business_id)
                axios.put(`/api/set-business-logo`, {
                    businessID: this.props.businessAccount.business_id,
                    url: url
                })
                    .catch(err => {
                        console.log(err)
                    })


            })
            .catch(err => {
                this.setState({
                    isUploading: false
                })
                if (err.response.status === 403) {
                    alert('Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that your created in the IAM dashboard. You may need to generate new keys\n' + err.stack)
                } else {
                    alert(`ERROR: ${err.status}\n ${err.stack}`)
                }
            })
    }


    render() {
        return (
            <div className="businessAccountContainer">
                <h1>Business Account</h1>
                <div className='businessAccountForm'>
                <div className='logoEditor'>
                    <img src={this.state.url} alt='Business Logo' />
                    {/* This is where I want the dropzone to go */}
                    <Dropzone
                        className='dropZone'
                        onDropAccepted={this.getSignedRequest}
                        accept='image/*'
                        multiple={false}
                    >

                        {this.state.isUploading
                            ? <GridLoader />
                            : <p>Edit Picture</p>
                        }
                    </Dropzone>
                    {/* ^^This is where I want the dropzone to go */}
                </div>

                    <h2>Business Name: </h2>
                    <input type="text"
                        onChange={(e) => this.handleBusinessName(e.target.value)}
                    />
                    <h2>Phone: </h2>
                    <input type="text"
                        onChange={(e) => this.handleBusinessPhone(e.target.value)}
                    />
                    <h2>Email: </h2>
                    <input type="text"
                        onChange={(e) => this.handleBusinessEmail(e.target.value)}
                    />
                    <h2>About Us: </h2>
                    <input type="text"
                        onChange={(e) => this.handleBusinessBlurb(e.target.value)}
                    />
                    <h2>Locations of Operation: </h2>
                    <input type="text"
                        onChange={(e) => this.handleOperatingZips(e.target.value)}
                    />
                </div>
                <Link to='businessInfo'>
                    <div className="submitInfo">
                        <button onClick={() => this.handleSubmit(this.props)}>Submit</button>
                    </div>
                </Link>
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