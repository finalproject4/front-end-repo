import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
class HallForm extends Component {
    state = {
        formData: {
            type: null,
            section: null,
            price:null,
            location: null,
            size: null,
            name: null
            
        },
        err: null
    };

    handleLoginRequest = hall => {
        let url = `${apiUrl}/api/user/${getUser().id}/halls`;
        console.log(getUser().id);

        console.log(url);
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( hall )
        })
            .then(res => res.json())
            .then(data => {
                // this.props.changeActivePage("home");
                window.location.reload()
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
                <h1>Hall</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            className="form-control"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <label>Type</label>
                        <input
                            name="type"
                            className="form-control"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <label>Location </label>
                        <input
                            name="location"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                        <label>Price </label>
                        <input
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                        <label>Size </label>
                        <input
                            name="size"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                        <label>Section </label>
                        <input
                            name="section"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                         <button type="submit" className="btn btn-primary">
                            Add
                         </button>
                    </div>

                   
                </form>
            </div>
        );
    }
}

export default HallForm;