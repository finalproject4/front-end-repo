import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
class EditProfileForm extends Component {
    state = {
        formData: {
            first_name: null,
            last_name: null,
            email: null,
            phone_number: null
            
        },
        err: null
    };
    componentDidMount(){
        let url = `${apiUrl}/api/user/${getUser().id}`;
            fetch(url, {
              mode: "cors",
              credentials: "include",
              method: "GET",
              headers: {
                "Content-type": "application/json"
              },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data, "profile")
                this.setState({formData: data.user})
            })
            .catch(e => console.log(e));
    }
    handleChange = ({ currentTarget }) => {
        const formData = { ...this.state.formData };
        formData[currentTarget.name] = currentTarget.value;
        this.setState({ formData });
      };
     handleSubmit = (event) => {
            event.preventDefault();
          let url = `${apiUrl}/api/user/${getUser().id}`;
          console.log(url)
          console.log(this.state.formData)
            fetch(url, {
              mode: "cors",
              credentials: "include",
              method: "PUT",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({user: this.state.formData})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
                this.props.changeActivePage('profile');
                console.log(this.props.changeActivePage,"ss")
            })
            .catch(e => console.log(e));
          };
    
        
    

    render() {
        return (
            <div className="pt-5 mt-5">
                        <h1>Profile</h1>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>First Name </label>
                        <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            value={this.state.formData.first_name}
                            onChange={this.handleChange}
                        />
                        <label>Last Name </label>
                        <input
                         name="last_name"
                         type="text"
                         value={this.state.formData.last_name}
                         className="form-control"
                         onChange={this.handleChange}
                        />
        <label>Email </label>
        <input
            name="email"
            type="text"
            className="form-control"
            value={this.state.formData.email}
            onChange={this.handleChange}
        />
        <label>Phone Number </label>
        <input
            name="phone_number"
            type="text"
            className="form-control"
            value={this.state.formData.phone_number}
            onChange={this.handleChange}
        />
    </div>
                    <button className="btn btn-primary">
                        Update
                    </button>
                </form>
            </div>
        );
    }
}

export default EditProfileForm;