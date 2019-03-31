import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
class ToolForm extends Component {
    state = {
        formData: {
            type: null,
            quantity: null,
            price:null,
            
        },
        err: null
    };

    handleLoginRequest = tool => {
        let url = `${apiUrl}/api/user/${getUser().id}/tools`;
        console.log(getUser().id);

        console.log(url);
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( tool )
        })
            .then(res => res.json())
            .then(data => {
                this.props.changeActivePage("home");
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
                <h1>Tool</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Type</label>
                        <input
                            name="type"
                            className="form-control"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <label>Quantity </label>
                        <input
                            name="quantity"
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
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add
          </button>
                </form>
            </div>
        );
    }
}

export default ToolForm;