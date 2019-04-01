import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
import { getUser } from "../services/AuthService";
class Home extends Component {
  state = {
    tools: [],
    res: "btn btn-primary",
    activeToolId: [],
    halls: []
  }

  updateButton = (id) => {
    const activeToolId = [...this.state.activeToolId]
    const index = this.state.activeToolId.indexOf(id)
    if (index > -1 ){
      activeToolId.splice(index , 1)
    } else { 
      activeToolId.push(id)
    }

    this.setState({ activeToolId })
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
  handleHallsRequest = () => {
    let url = `${apiUrl}/api/halls`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, "halls")
        this.setState({ halls: data.halls })
      })

      .catch(e => console.log(e));
  };

  componentDidMount() {
     this.handleLoginRequest();
  }
  componentWillMount(){
    this.handleHallsRequest();

  }

  handleReserveRequest = (toolID) => {
    console.log("tool = " ,toolID )

    
      let url = `${apiUrl}/api/user/${getUser().id}/tool/${toolID}`;
      console.log(getUser().id);

      console.log(url);
      fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => res.json())
        .then(data => this.updateButton(toolID))
        // .then(data => {
        //   // this.props.changeActivePage("my-res");
        // })
        .catch(e => console.log(e));
    // this.updateButton()
    };
  handleReserveHRequest = (hallID) => {
    console.log("hall = " ,hallID )

    
      let url = `${apiUrl}/api/user/${getUser().id}/hall/${hallID}`;
      console.log(getUser().id);

      console.log(url);
      fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => res.json())

        .catch(e => console.log(e));
    };


  render() {
   
    const tools = this.state.tools.map(tools => {
      return (
        <div className="card">
          <img src="https://cdn2.iconfinder.com/data/icons/bar-and-pub-flaticon/64/music-party-food_and_restaurant-disc-tools-musical-tool-512.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tools.type}</h5>
            <p className="card-text">Quantity: {tools.quantity}</p>
            <p className="card-text">Price: {tools.price}</p>
            <button className={this.state.activeToolId.indexOf(tools.id) > -1 ?  "newR": this.state.res} onClick={(e) => this.handleReserveRequest(tools.id)}>Reserve </button>
          </div>
        </div>
      );
    });
    const halls = this.state.halls.map(halls => {
      return (
        <div className="card">
          <img src="https://cdn2.iconfinder.com/data/icons/bar-and-pub-flaticon/64/music-party-food_and_restaurant-disc-tools-musical-tool-512.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{halls.name}</h5>
            <p className="card-text">Location: {halls.location}</p>
            <p className="card-text">Price: {halls.price}</p>
            <p className="card-text">Type: {halls.type}</p>
            <p className="card-text">Section: {halls.section}</p>
            <p className="card-text">Size: {halls.size}</p>
            <button className="btn btn-primary" onClick={(e) => this.handleReserveHRequest(halls.id)}>Reserve </button>
          </div>
        </div>
      );
    });
    // () => this.handleReserveRequest(tools.id)
    return (
    <div>
    <div className="card-group">{tools}</div>
    <div className="card-group">{halls}</div>
    </div>
    )
  }


}


export default Home;
