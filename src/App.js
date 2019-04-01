import React, { Component } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { getUser, Signout } from "./services/AuthService";
import SigninForm from "./components/authForm.js/SigninForm";
import SignupForm from "./components/authForm.js/SignupForm";
import ToolForm from "./components/ToolForm";
import ChangePasswordForm from "./components/authForm.js/ChangePasswordForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import MyTools from "./components/myTools";
import MyRes from "./components/myres";
import EditToolsForm from "./components/EditToolsForm";
import EditProfileForm from "./components/EditProfileForm";
import './App.css';
import MyHalls from "./components/myHalls";
import HallForm from "./components/HallForm";
import EditHallsForm from "./components/EditHallsForm";

class App extends Component {
  state = {
    user: null,
    activePage: "home",
    currentTool: null,
    currentHall: null,
    currentUser: null
  };

  changeActiveToEdit = (activePage, id) => {
    this.setState({ activePage: activePage, currentTool: id });

  }
  changeActiveToEditH = (activePage, id) => {
    this.setState({ activePage: activePage, currentHall: id });

  }
  changeActiveToEditP = (activePage, id) => {
    this.setState({ activePage: activePage, currentUser: id });

  }
  componentDidMount() {
    // check if we have a token in the local storage
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }

  changeActivePage = activePage => {
    this.setState({ activePage });
  };
  onSignin = () => {
    this.setState({ user: getUser() });
    this.changeActivePage("profile");
  };
  onSignout = () => {
    console.log("sigin out");
    this.setState({ user: null });
    Signout();
  };
  render() {
    const { user, activePage } = this.state;
    return (
      <div>
        <Nav
          user={user}
          changeActivePage={this.changeActivePage}
          onSignout={this.onSignout}
        />

        <div className="container">
          {activePage === "home" ? <Home /> : ""}
          {activePage === "sign-in" ? (
            <SigninForm onSignin={this.onSignin} />
          ) : (
              ""
            )}
          {activePage === "sign-up" ? (
            <SignupForm onSignin={this.onSignin} />
          ) : (
              ""
            )}
          {activePage === "change-password" ? (
            <ChangePasswordForm changeActivePage={this.changeActivePage} />
          ) : (
              ""
            )}
          {activePage === "Add-Tool" ? (
            <ToolForm changeActivePage={this.changeActivePage} />
          ) : (
              ""
            )}
          {activePage === "add-Hall" ? (
            <HallForm changeActivePage={this.changeActivePage} />
          ) : (
              ""
            )}
          {activePage === "Edit-Tool" ? (
            <EditToolsForm changeActivePage={this.changeActivePage} id={this.state.currentTool} />
          ) : (
              ""
            )}
          {activePage === "my-tools" ? (
            <MyTools changeActivePage={this.changeActivePage} changeActiveToEdit={this.changeActiveToEdit} />
          ) : (
              ""
          )}
          {activePage === "my-halls" ? (
            <MyHalls changeActivePage={this.changeActivePage} changeActiveToEditH={this.changeActiveToEditH} />
          ) : (
              ""
          )}
          {activePage === "Edit-Hall" ? (
            <EditHallsForm changeActivePage={this.changeActivePage} id={this.state.currentHall} changeActiveToEditH={this.changeActiveToEditH} />
          ) : (
              ""
          )}
          {activePage === "my-res" ? (
            <MyRes changeActivePage={this.changeActivePage} />
          ) : (
              ""
          )}
            
          
          {activePage === "profile" ? (
          <Profile changeActivePage={this.changeActivePage} changeActiveToEditP={this.changeActiveToEditP} />
           ) :( 
             "" 
             )}
               {activePage === "Edit-profile" ? (
            <EditProfileForm changeActivePage={this.changeActivePage} id={this.state.currentUser} />
          ) : (
              ""
            )}
        </div>
      </div>
    );
  }
}

export default App;
