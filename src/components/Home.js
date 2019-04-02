import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
import { getUser } from "../services/AuthService";
import swal from 'sweetalert';
class Home extends Component {
    
  state = {
      user: getUser().id,
    tools: [],
    reservations: [],
    res: "btn btn-primary",
    activeToolId: [],
    check: "",
    formData: {
    date: new Date()
    }
   
  }


  handleChangeDate = ({ currentTarget }) => {
    const formData = { ...this.state.formData };
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
    console.log(this.state.formData)
  };

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

  getRes = ( toolID ) => {
    // console.log(getUser().id)
    //   console.log(getUser().id)
      if (this.state.user != null ){
    
    let url = `${apiUrl}/api/user/${getUser().id}/res`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "GET",
    })
      .then(response => response.json())
      
      .then(data => {
        console.log(data ,"ddd")
        console.log(this.state.formData.date)
        console.log(data.user.Reservations[0].date)
          const input = data.user.Reservations[0].date
          const dateArray = input.split('T');
          const userMonth = parseInt(dateArray[1])-1;
          const ourDate = dateArray[0]
     

          const input1 = this.state.formData.date
          const dateArray1 = input1.split('T');
          const userMonth1 = parseInt(dateArray1[1])-1;
          const dbDate = dateArray1[0]
        if(dbDate !== ourDate){
            this.handleReserveRequest(toolID)
            swal({
                title: "Reserved! ",
                text: "",
                icon: "success",
                button: "Back",
              });
        } else {
            swal({
                title: "Oops ! This date has been reserved ",
                text: "Please, choose another date",
                icon: "warning",
                button: "Back",
              });
            }
         this.setState({ reservations: data.tools })
      })

      .catch(e => console.log(e));
    }
     else {
        swal({
            title: "Do you have account ?",
            text: "Sign Up for free!",
            icon: "warning",
            button: "Back",
          });
  
  };
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
        body: JSON.stringify(this.state.formData)
      })
        .then(res => res.json())
        .then(data => this.updateButton(toolID))
       
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

            <form action="/action_page.php">
            date:
            <input type="date" name="date" onChange={this.handleChangeDate}/>
            </form>

            {/* <button className={this.state.activeToolId.indexOf(tools.id) > -1 ?  "newR": this.state.res} onClick={(e) => this.handleReserveRequest(tools.id)}> Reserve</button> */}
         <button className="btn btn-primary" onClick={ () =>this.getRes(tools.id)}> Reserve</button>
          </div>
        </div>
      );
    });
    // () => this.handleReserveRequest(tools.id)
    return <div className="card-group">{tools}</div>;


  }


}


export default Home;
