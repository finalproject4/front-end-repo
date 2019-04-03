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
    componentDidMount(){
        let url = `${apiUrl}/api/tool/${this.props.id}`;
    
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
              this.setState({formData: data.tool})
          })
          .catch(e => console.log(e));
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
                            value={this.state.formData.type}
                            onChange={this.handleChange}
                        />
                        <label>Quantity </label>
                        <input
                            name="quantity"
                            type="text"
                            className="form-control"
                            value={this.state.formData.quantity}
                            onChange={this.handleChange}
                        />
                        <label>Price </label>
                        <input
                            name="price"
                            type="text"
                            className="form-control"
                            value={this.state.formData.price}
                            onChange={this.handleChange}
                        />
                        <button className="btn btn-primary">
                        Update
                    </button>
                    </div>

                    
                </form>
            </div>
        );
    }
}

export default EditToolsForm;