import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";


class MyHalls extends Component {
  state = {
    halls: []
  }

  re = () => {
    window.location.reload();
  }

  removeHall = id => {
    const copyhalls = this.state.halls.splice(id, 1);
    //updat state
    this.setState({
      halls: copyhalls
    })
  }
  delete = (id) => {


    let url = `${apiUrl}/api/hall/${id}`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "DELETE",
    })
      .then(response => response.json())

      .then(data => {
        console.log(data)

        this.props.changeActivePage('Home');
        this.props.changeActivePage('my-halls');
        console.log(this.props.changeActivePage, "ss")

       this.removeTool();
      })
      .catch(e => console.log(e));
  };


  // edit = () => {
  //   this.props.changeActiveToEdit("Edit-Tool");

  // }

  handleLoginRequest = () => {
    let url = `${apiUrl}/api/user/${getUser().id}/halls`;
    console.log(getUser().id, "test")
    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ halls: data.user.Halls })
      })

      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.handleLoginRequest();
  }

  render() {
    const halls = this.state.halls.map(hall => {
      return (
        <div className="card">
          <img src=".." className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-title"> Name: {hall.name}</p>
            <p className="card-text">Location: {hall.location}</p>
            <p className="card-text">Price: {hall.price}</p>
            <p className="card-text">Type: {hall.type}</p>
            <p className="card-text">Section: {hall.section}</p>
            <p className="card-text">Size: {hall.size}</p>
            <button onClick={() => this.props.changeActiveToEditH("Edit-Hall", hall.id)} className="btn btn-primary mr-3">Edit</button>
            <button onClick={() => this.delete(hall.id)} className="btn btn-primary">Delete</button>
          </div>
        </div>
      );
    });
    return <div className="card-deck">{halls}</div>;



  }


}


export default MyHalls;
