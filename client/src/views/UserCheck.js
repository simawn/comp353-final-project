import React, { Component } from "react";
import axios from "axios";

export default class UserCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
    };
  }

  componentDidMount = async () => {
    try {
      const result = (await axios.get("/user", { withCredentials: true })).data;
      this.setState({ userDetails: result[0] });
    } catch (error) {
      this.setState({ userDetails: false });
    }
  };

  logout = async () => {
    try {
      await axios.post("/logout", { withCredentials: true });
      this.props.history.push("/");
    } catch (error) {
      console.log("error logging out");
    }
  };

  render() {
    return (
      <div>
        {this.state.userDetails === null && <p>Loading...</p>}
        {this.state.userDetails === false && <p>Error retrieving user details</p>}
        {this.state.userDetails && (
          <p>
            Hi, {this.state.userDetails.userName}! You are a {this.state.userDetails.role}. User info:{" "}
            {JSON.stringify(this.state.userDetails)}
          </p>
        )}
        <button type="button" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}
