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
  
<div className="d-flex justify-content-center">
    
      <div className="profile">
        <img src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898-300x300.png" className="profile-img"  />
          <div className="p-body">
          <h6>Hello {this.state.my_profile.first_name}</h6>
          <p>Name: {this.state.my_profile.first_name} {this.state.my_profile.last_name} </p>
           <p>Email: {this.state.my_profile.email} </p>
           <p>Phone Number: {this.state.my_profile.phone_number} </p>
           <button onClick={() => this.props.changeActiveToEditP("Edit-profile", this.state.my_profile.id)} className="btn btn-primary">Edit</button>
       </div>
       </div>           
    </div> 
)}
}
export default Profile;
