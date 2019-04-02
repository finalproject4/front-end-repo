import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";

class MyRes extends Component {
    state = {
        reservations: [],
        hreservations: []
    }

    handleResRequest = () => {
        let url = `${apiUrl}/api/user/${getUser().id}/res`;
        console.log(getUser().id)
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ reservations: data.user.Reservations })
            })

            .catch(e => console.log(e));
    };

    handleResHRequest = () => {
        let url = `${apiUrl}/api/user/${getUser().id}/hres`;
        console.log(getUser().id)
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ hreservations: data.user.Hreservations })
            })

            .catch(e => console.log(e));
    };

    componentDidMount() {
        this.handleResRequest();
        this.handleResHRequest();
    }

    render() {
        const reservations = this.state.reservations.map(reservations => {
            return (
                <div>
                    <h3>User</h3> <h4>{reservations.user_id} </h4>
                    <h3>Tool </h3> <h4>{reservations.tool_id} </h4>
                    <h3>Date </h3> <h4>{reservations.date} </h4>
                </div>
            );
        }); 
        const hreservations = this.state.hreservations.map(hreservations => {
            return (
                <div>
                    <h3>User</h3> <h4>{hreservations.user_id} </h4>
                    <h3>hall </h3> <h4>{hreservations.hall_id} </h4>
                    <h3>Date </h3> <h4>{hreservations.date} </h4>
                </div>
            );
        }); 
        return <div>
        {reservations}
        {hreservations}
        </div>;


    }


}


export default MyRes;