import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
import { getUser } from "../services/AuthService";
import swal from 'sweetalert';
class HReservations extends Component {
    
    state = {
        user: null,
        hreservations: [],
        res: "btn btn-primary",
        halls: [],
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


    getResH = ( hallID ) => {
        const user = getUser()
        if (user !== null){

            let url = `${apiUrl}/api/hall/${hallID}`;

            fetch(url, {
                mode: "cors",
                credentials: "include",
                method: "GET",
            })
            .then(response => response.json())
            
            .then(data => {
            
            const input = data.hall.hreservations
            console.log(data)
            if (input === undefined){
                this.handleReserveHRequest(hallID)
                swal({
                    title: "Reserved! ",
                    text: "",
                    icon: "success",
                    button: "Back",
                });
            } else {
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
                if(!dateArray.includes(dbDate) ){
                    this.handleReserveHRequest(hallID)
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
            }
                this.setState({ hreservations: data.halls })
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
        this.handleHallsRequest();

    }

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
        body: JSON.stringify(this.state.formData)

        })
        .then(res => res.json())

        .catch(e => console.log(e));
    };
    componentWillMount(){
        this.handleHallsRequest();

    }
    render() {
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
                    <form action="/action_page.php">
                    date:
                    <input type="date" name="date" onChange={this.handleChangeDate}/>
                    </form>
                    <button className="btn btn-primary" onClick={(e) => this.getResH(halls.id)}>Reserve </button>
                    </div>
                </div>
            );
        });
        return (
                <div className="card-group">{halls}</div>
        )
    }


}


export default HReservations;





  
