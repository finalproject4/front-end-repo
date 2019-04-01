import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
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
        this.setState({ tools: data.tools })
      })

      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.handleLoginRequest();
  }

  render() {
    const tools = this.state.tools.map(tools => {
      return (
        <div className="card">
          <img src="https://cdn2.iconfinder.com/data/icons/bar-and-pub-flaticon/64/music-party-food_and_restaurant-disc-tools-musical-tool-512.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tools.type}</h5>
            <p className="card-text">Quantity: {tools.quantity}</p>
            <p className="card-text">Price: {tools.price}</p>
            <a href="#" className="btn btn-primary">Reserve</a>
          </div>
        </div>
      );
    });
    return <div className="card-group">{tools}</div>;


  }


}


export default Home;
