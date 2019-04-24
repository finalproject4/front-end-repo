import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
import { getUser } from "../services/AuthService";
import swal from 'sweetalert';
class Reservations extends Component {
    
    state = {
        user: null,
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
                const input = data.tool.reservations
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
                this.setState({ reservations: data.tools })
            })

            .catch(e => console.log(e));
        } else {
            swal({
                title: "Do you have account ?",
                text: "Sign Up for free!",
                icon: "warning",
                button: "Back",
            });
        
        };
    }


    handleToolsRequest = () => {
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
        this.handleToolsRequest();

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

    render() {
        console.log(this.state.tools.length , ";ll")
        
        const tools = this.state.tools.map(tools => {
            return (
                <div className="col-sm-4">
                <div className="card m-3">
                <img src="https://static.tildacdn.com/tild3166-6166-4965-b466-396633616232/AllEquipmentHire1e1459197308294.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{tools.type}</h5>
                    <p className="card-text">Quantity: {tools.quantity}</p>
                    <p className="card-text">Price: {tools.price}</p>

                    <form action="/action_page.php">
                    <input type="date" name="date" onChange={this.handleChangeDate}/>
                    </form>

                    {/* <button className={this.state.activeToolId.indexOf(tools.id) > -1 ?  "newR": this.state.res} onClick={(e) => this.handleReserveRequest(tools.id)}> Reserve</button> */}
                <button className="btn btn-primary" onClick={ () =>this.getRes(tools.id)}> Reserve</button>
                </div>
                </div>
                </div>
            );
        });
        return (
            <div className="row">{tools}</div>
        )
    }


}


export default Reservations;





  
