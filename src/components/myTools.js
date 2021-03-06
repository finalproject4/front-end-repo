import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";
import EditToolsForm from "./EditToolsForm";

class MyTools extends Component {

  state = {
    tools: []
  }
  
 
  removeTool = id => {
    const copytools = this.state.tools.splice(id, 1);
    //updat state
    this.setState({
      tools: copytools
    })
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

       this.removeTool();
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
  re = () => {
   console.log(this.state.tools.length, "tools.length")
   this.props.changeCart(this.state.tools.length)
    // this.props.changeCart(this.state.tools.length)

   }
 

  componentDidMount() {
    this.handleLoginRequest();
   
  }

  render() {
    // this.props.changeCart(this.state.tools.length)
    const tools = this.state.tools.map(tool => {
      return (
        <div className="col-sm-4">
        <div className="card">
          <img src="https://static.tildacdn.com/tild3166-6166-4965-b466-396633616232/AllEquipmentHire1e1459197308294.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tool.type}</h5>
            <p className="card-text">Quantity: {tool.quantity}</p>
            <p className="card-text">Price: {tool.price}</p>
            <button onClick={() => this.props.changeActiveToEdit("Edit-Tool", tool.id)} className="btn btn-primary">Edit</button>
            <button onClick={() => this.delete(tool.id)} className="btn btn-primary">Delete</button>
          </div>
        </div>
        </div>
      );
    });
    return <div className="row mt-5">{tools}</div>;



  }


}


export default MyTools;
