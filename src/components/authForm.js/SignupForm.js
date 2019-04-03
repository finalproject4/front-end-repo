import React, { Component } from "react";
import apiUrl from "../../apiConfig";
import { setUser } from "../../services/AuthService";
class SignupForm extends Component {
  state = {
    formData: {
      first_name: null,
      last_name: null,
      phone_number: null,
      email: null,
      password: null,
      password_confirmation: null
    },
    err: null
  };

  handleLoginRequest = user => {
    let url = `${apiUrl}/sign-up`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ credentials: user })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 299) 
          this.setState({ err: data.message});
        else {
          setUser(data);
          this.props.onSignin();
        }
      })
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleLoginRequest(this.state.formData);
  };

  handleChange = ({ currentTarget }) => {
    const formData = { ...this.state.formData };
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
  };

  render() {
    return (
      <div className="pt-5 mt-5">
        <h1 className="mb-5"> JOIN US! </h1>
        {this.state.err ? (
          <div className="alert alert-warning"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name </label>
            <input
              name="first_name"
              className="form-control"
              onChange={this.handleChange}
            />

            <label>Last Name </label>
            <input
              name="last_name"
              className="form-control"
              onChange={this.handleChange}
            />

            <label>Phone Number </label>
            <input
              name="phone_number"
              className="form-control"
              onChange={this.handleChange}
            />
           

            <label>Email </label>
            <input
              name="email"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />

            <label>Password Confirmation</label>
            <input
              name="password_confirmation"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />
            <button type="submit" className="btn btn-primary">
            Login
          </button>
          </div>

          
        </form>
      </div>
    );
  }
}

export default SignupForm;
