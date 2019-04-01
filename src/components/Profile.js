import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";

class Profile extends Component {
state = {
    my_profile: {}
}
// const Profile = () => <div>Profile</div>;

handleLoginRequest = user => {
    let url = `${apiUrl}/api/user/${getUser().id}`;
    
    fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(user => {
        console.log(user.user)

        this.setState({ my_profile: user.user })
        
        }).catch(e => console.log(e));
 

  };
 

  componentDidMount() {
    this.handleLoginRequest();
  }
render() {
return (
    <div> 
      <h1>Hello</h1>
      <h3>First Name </h3> 
      <h4>{this.state.my_profile.first_name} </h4>
      <h3>Last Name </h3> 
      <h4>{this.state.my_profile.last_name} </h4>
      <h3>Email </h3> 
      <h4>{this.state.my_profile.email} </h4>
      <h3>Phone Number</h3> 
      <h4>{this.state.my_profile.phone_number} </h4>
      <button onClick={() => this.props.changeActiveToEditP("Edit-profile", this.state.my_profile.id)} className="btn btn-primary mr-3">Edit</button>

    </div> 
)}};
export default Profile;
