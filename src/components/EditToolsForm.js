import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
class EditToolsForm extends Component {
    state = {
        formData: {
            type: null,
            quantity: null,
            price:null,
            
        },
        err: null
    };
    handleChange = ({ currentTarget }) => {
        const formData = { ...this.state.formData };
        formData[currentTarget.name] = currentTarget.value;
        this.setState({ formData });
      };
     handleSubmit = (event) => {
            event.preventDefault();
          let url = `${apiUrl}/api/tool/${this.props.id}`;
          console.log(url)
          console.log(this.state.formData)
            fetch(url, {
              mode: "cors",
              credentials: "include",
              method: "PUT",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({tool: this.state.formData})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
                this.props.changeActivePage('my-tools');
                console.log(this.props.changeActivePage,"ss")
            })
            .catch(e => console.log(e));
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

                    <button className="btn btn-primary">
                        Update
                    </button>
                </form>
            </div>
        );
    }
}

export default EditToolsForm;