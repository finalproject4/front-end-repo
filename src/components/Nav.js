import React from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
import image from "./../image/IMG_1094.png";
// import {getLingth} from "./"

class AuthenticatedOptions extends React.Component {
  state = {
    myTools: [],
    myHalls: [],
    myReservations: [],
    toolsR: [],
    hallsR: [],
  }

  getHalls = () => {
    let url = `${apiUrl}/api/user/${getUser().id}/halls`;
      console.log(getUser().id, "test")
      fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({ myHalls: data.user.Halls })
        })
  
        .catch(e => console.log(e));
    };

    getTools = () => {
      let url = `${apiUrl}/api/user/${getUser().id}/tools`;
      console.log(getUser().id)
      fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({ myTools: data.user.Tools })
  
        })
  
        .catch(e => console.log(e));
  
        
    }
    getReservationsH = () => {
      let url = `${apiUrl}/api/user/${getUser().id}/hres`;

      fetch(url, {
          mode: "cors",
          credentials: "include",
          method: "GET",
      })
      .then(response => response.json())
      .then(data => {
      console.log(data, "hallssss")
      this.setState({ hallsR: data.user.hreservations })
      })

      .catch(e => console.log(e));
  };

    
    getReservationsT = () => {
      let url = `${apiUrl}/api/user/${getUser().id}/res`;

      fetch(url, {
          mode: "cors",
          credentials: "include",
          method: "GET",
      })
      .then(response => response.json())
      .then(data => {
      console.log(data, "res")
          this.setState({ toolsR: data.user.reservations })
      })

      .catch(e => console.log(e));
  };
  
  componentDidMount(){
    this.getTools();
    this.getHalls();
     this.getReservationsT();
    this.getReservationsH();

}
  render(){
    const tool = this.state.toolsR.length 
    const hall = this.state.hallsR.length 
    const total = tool + hall
    console.log(this.state.toolsR, "dd")
    return (
     
      <React.Fragment>
      <li
        className="nav-item"
        onClick={() => this.props.changeActivePage("change-password")}
      >
        <div className="nav-link">Change Password</div>
      </li>
      <li className="nav-item" onClick={() => this.props.onSignout()}>
        <div className="nav-link">Sign Out</div>
      </li>
      <li
        className="nav-item"
        onClick={() => this.props.changeActivePage("Add-Tool")}
      >
        <div className="nav-link">Add Tool</div>
      </li>
      <li
        className="nav-item"
        onClick={() => this.props.changeActivePage("my-tools")}
      >
        <div className="nav-link">My Tools ({this.state.myTools.length})</div>
        {/* <div className="nav-link">{this.props.changeCart}</div> */}
      </li>
      <li
        className="nav-item"
        onClick={() => this.props.changeActivePage("add-Hall")}
      >
        <div className="nav-link">Add Hall</div>
      </li>
    
      <li
        className="nav-item"
        onClick={() => this.props.changeActivePage("my-halls")}
      >
        <div className="nav-link">My Halls ({this.state.myHalls.length})</div>
      </li>
      <li
        className="nav-item"
        onClick={() => this.props.changeActivePage("my-res")}
      >
        <div className="nav-link">My Reservations ({total})</div>
      </li>
       
        
        <li className="nav-item" onClick={() => this.props.changeActivePage("profile")} >
        <div className="nav-link">Profile</div>
      </li>
      
    </React.Fragment>
    )
  }
}
//   const authenticatedOptions = (changeActivePage, onSignout) => (
//   <React.Fragment>
//     <li
//       className="nav-item"
//       onClick={() => changeActivePage("change-password")}
//     >
//       <div className="nav-link">Change Password</div>
//     </li>
//     <li className="nav-item" onClick={() => onSignout()}>
//       <div className="nav-link">Sign Out</div>
//     </li>
//     <li
//       className="nav-item"
//       onClick={() => changeActivePage("Add-Tool")}
//     >
//       <div className="nav-link">Add Tool</div>
//     </li>
//     <li
//       className="nav-item"
//       onClick={() => changeActivePage("my-tools")}
//     >
//       <div className="nav-link">My Tools</div>
//       {/* <div className="nav-link">{this.props.changeCart}</div> */}
//     </li>
//     <li
//       className="nav-item"
//       onClick={() => changeActivePage("add-Hall")}
//     >
//       <div className="nav-link">Add Hall</div>
//     </li>
  
//     <li
//       className="nav-item"
//       onClick={() => changeActivePage("my-halls")}
//     >
//       <div className="nav-link">My Halls</div>
//     </li>
//     <li
//       className="nav-item"
//       onClick={() => changeActivePage("my-res")}
//     >
//       <div className="nav-link">My Reservations</div>
//     </li>
     
      
//       <li className="nav-item" onClick={() => changeActivePage("profile")} >
//       <div className="nav-link">Profile</div>
//     </li>
    
    
//   </React.Fragment>
// );

const unauthenticatedOptions = changeActivePage => (
  <React.Fragment>
    <li className="nav-item" onClick={() => changeActivePage("sign-in")}>
      <div className="nav-link">Sign In</div>
    </li>
    <li className="nav-item" onClick={() => changeActivePage("sign-up")}>
      <div className="nav-link">Sign Up</div>
    </li>
  </React.Fragment>
);

const alwaysOptions = changeActivePage => (
  <React.Fragment>
    <li className="nav-item" onClick={() => changeActivePage("home")}>
      <div className="nav-link">Home</div>
    </li>
  </React.Fragment>
);

const Nav = ({ user, changeActivePage, onSignout }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <div className="navbar-brand"></div>
<nav className="navbar navbar-light bg-light">
    <img src={image} width="180" height="70" className="d inline-block align-top" alt="img"/>
</nav>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {alwaysOptions(changeActivePage)}

        {user
          ? < AuthenticatedOptions changeActivePage={changeActivePage} onSignout={onSignout} />
          : unauthenticatedOptions(changeActivePage)}
        {/* {user && (
          <li className="nav-item">
            <div className="nav-link"> Hola, {user.email.split("@")[0]}</div>
          </li>
        )} */}
      </ul>
    </div>
  </nav>
);

export default Nav;
