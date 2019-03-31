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


    delete = (id ) => {
      
      
      let url = `${apiUrl}/api/tool/${id}`;
      
      fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "DELETE",
      })
      .then(response =>  response.json())
      
      .then(data => {
          console.log(data)
          
          this.props.changeActivePage('Home');
          this.props.changeActivePage('my-tools');
          console.log(this.props.changeActivePage,"ss")
         
         
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
            this.setState({ tools: data.user.Tools })})
     
          .catch(e => console.log(e));
      };
    
      componentDidMount() {
        this.handleLoginRequest();
      }

    render() {
        const tools = this.state.tools.map(tool => {
            return (
              <div>
                <h3>Type </h3> <h4>{tool.type} </h4>
                <h3>Quantity </h3> <h4>{tool.quantity} </h4>
                <h3>Price </h3> <h4>{tool.price} </h4>
                <button onClick={()=> this.props.changeActiveToEdit("Edit-Tool", tool.id)}>Edit</button>
             <button  onClick={ () => this.delete(tool.id)}>Delete</button>
            
              </div>
            );
          });
        return <div>{tools}</div>;
        
        
    }

        
}


export default MyTools;
