import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
import { getUser } from "../services/AuthService";
import swal from 'sweetalert';
class Home extends Component {
    
  state = {
      user: null,
    tools: [],
    reservations: [],
    res: "btn btn-primary",
    activeToolId: [],
    halls: [],
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
      const user = getUser()
      if (user !== null){
    
    let url = `${apiUrl}/api/tool/${toolID}`;

    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "GET",
    })
      .then(response => response.json())
      
      .then(data => {
        console.log(data ,"ddd")
console.log(data)
          const input = data.tool.Reservations
          console.log(input, "test")
          const dateArray = input.map(e => {
             return e.date.split('T')[0]
          })
          console.log(dateArray, "input")
        //   const dateArray = input.split('T');
        //   const userMonth = parseInt(dateArray[1])-1;
          const ourDate = dateArray[0]
     

          const input1 = this.state.formData.date
          console.log(input1,"11111")
          const dateArray1 = input1.split('T');
        //   const userMonth1 = parseInt(dateArray1[1])-1;
          const dbDate = dateArray1[0];
          console.log('dbDate: ', dbDate, ' ourDate: ', ourDate , dateArray[0]);
        if(!dateArray.includes(dbDate) ){
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
         // WHY? 
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
        body: JSON.stringify(this.state.formData)
      })
        .then(res => res.json())
        .then(data => this.updateButton(toolID))
       
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

            <form>
            date:
            <input type="date" name="date" onChange={this.handleChangeDate}/>
            </form>

            {/* <button className={this.state.activeToolId.indexOf(tools.id) > -1 ?  "newR": this.state.res} onClick={(e) => this.handleReserveRequest(tools.id)}> Reserve</button> */}
         <button className="btn btn-primary" onClick={ () =>this.getRes(tools.id)}> Reserve</button>
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
