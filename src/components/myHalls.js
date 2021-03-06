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
    console.log(this.state.halls.length)
    const halls = this.state.halls.map(hall => {
      return (
        <div className="col-sm-4">
        <div className="card">
          <img src="https://imagesawe.s3.amazonaws.com/listing/2019/01/31/al_faisaliah_hotel_1.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-title">{hall.name}</p>
            <p className="card-text">Location: {hall.location}</p>
            <p className="card-text">Price: {hall.price}</p>
            <p className="card-text">Type: {hall.type}</p>
            <p className="card-text">Section: {hall.section}</p>
            <p className="card-text">Size: {hall.size}</p>
            <button onClick={() => this.props.changeActiveToEditH("Edit-Hall", hall.id)} className="btn btn-primary">Edit</button>
            <button onClick={() => this.delete(hall.id)} className="btn btn-primary">Delete</button>
          </div>
        </div>
        </div>
      );
    });
    return <div className="row">{halls}</div>;



  }


}


export default MyHalls;
