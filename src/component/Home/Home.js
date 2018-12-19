import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import BusinessCard from "./BusinessCard";
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      toggle: false,
      businesses: []
    };
  }

  async componentDidMount() {
    let res = await axios.get(`api/user-data`);
    console.log(res.data);
    this.props.updateUser(res.data);
    console.log(this.props.user);
  }

  handleSearchUpdate(value) {
    console.log(value);
    this.setState({
      search: value
    });
    console.log(this.state.search);
  }

  async handleSearchSubmit() {
    console.log(this.state.search);
    let res = await axios.get(`/api/zip-search/${this.state.search}`);
    console.log(res.data);

    this.setState({
      toggle: true,
      businesses: res.data
    });
  }

  render() {
    // console.log(this.props)
    // let { users_name, users_picture } = this.props.user;

    var businesses = this.state.businesses.map(business => {
      return <BusinessCard businessInfo={business} />;
    });
    return (
      <div className="homeContainer">
        <h1>Find small and independent cleaning businesses near you!</h1>

        {/* <div className="userInfoContainer">
                    <p>{users_name}</p>
                    <img className='userPic' src={users_picture} alt='userpic' />
                </div> */}
        <div className="search">
          <input
            type="text"
            placeholder="Search by zip code"
            onChange={e => this.handleSearchUpdate(e.target.value)}
          />
          <button
            onClick={() => {
              this.handleSearchSubmit();
            }}
          >
            Search
          </button>
          <p className="demoText">
            For Demo: use 84045 as zip code and select McCombs Cleaning Services
          </p>
        </div>
        <div className="businessCardContainer">
          {this.state.toggle ? <div>{businesses}</div> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  console.log(state);
  return {
    user
  };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(Home);
