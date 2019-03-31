import React, { Component } from "react";
import apiUrl from "../apiConfig";

class Home extends Component {
    state = {
        tools: []
    }

    handleLoginRequest = () => {
        let url = `${apiUrl}/api/tools`;
    
        fetch(url, {
          mode: "cors",
          credentials: "include",
          method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            this.setState({ tools: data.tools })})
     
          .catch(e => console.log(e));
      };

      componentDidMount() {
        this.handleLoginRequest();
      }

    render() {
        const tools = this.state.tools.map(tools => {
            return (
              <div>
                <h3>Type </h3> <h4>{tools.type} </h4>
                <h3>Quantity </h3> <h4>{tools.quantity} </h4>
                <h3>Price </h3> <h4>{tools.price} </h4>
              /
              </div>
            );
          });
        return <div>{tools}</div>;
        
        
    }

        
}


export default Home;
