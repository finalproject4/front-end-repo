import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
import EditToolsForm from "./EditToolsForm";

class MyTools extends Component {
  state = {
    tools: []
  }

  re = () => {
    window.location.reload();
  }


  delete = (id) => {


    let url = `${apiUrl}/api/tool/${id}`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "DELETE",
    })
      .then(response => response.json())

      .then(data => {
        console.log(data)

        this.props.changeActivePage('Home');
        this.props.changeActivePage('my-tools');
        console.log(this.props.changeActivePage, "ss")


      })
      .catch(e => console.log(e));
  };


  // edit = () => {
  //   this.props.changeActiveToEdit("Edit-Tool");

  // }

  handleLoginRequest = () => {
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
        this.setState({ tools: data.user.Tools })
      })

      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.handleLoginRequest();
  }

  render() {
    const tools = this.state.tools.map(tool => {
      return (
        <div className="card">
          <img src=".." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tool.type}</h5>
            <p className="card-text">Quantity: {tool.quantity}</p>
            <p className="card-text">Price: {tool.price}</p>
            <button onClick={() => this.props.changeActiveToEdit("Edit-Tool", tool.id)} className="btn btn-primary mr-3">Edit</button>
            <button onClick={() => this.delete(tool.id)} className="btn btn-primary">Delete</button>
          </div>
        </div>
      );
    });
    return <div className="card-deck">{tools}</div>;



  }


}


export default MyTools;
