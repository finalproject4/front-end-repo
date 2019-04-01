import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";

class MyRes extends Component {
    state = {
        reservations: []
    }

    handleResRequest = () => {
        let url = `${apiUrl}/api/user/${getUser().id}`;
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

    componentDidMount() {
        this.handleResRequest();
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
        return <div>{reservations}</div>;


    }


}


export default MyRes;