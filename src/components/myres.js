import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";

class MyRes extends Component {
    state = {
        reservations: [],
        reservationsC: [],
        hreservations: [],
        hreservationsC: []
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
                this.setState({ reservations: data.user.reservations })
            })

            .catch(e => console.log(e));
    };
    handleClientResRequest = () => {
        let url = `${apiUrl}/api/user/${getUser().id}/cres`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.user, "resC")
                this.setState({ reservationsC: data.user })
            })

            .catch(e => console.log(e));
    };
    handleClientHResRequest = () => {
        let url = `${apiUrl}/api/user/${getUser().id}/cresh`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.user, "resC")
                this.setState({ hreservationsC: data.user })
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
                this.setState({ hreservations: data.user.hreservations })
            })

            .catch(e => console.log(e));
    };

    componentDidMount() {
        this.handleResRequest();
        this.handleClientResRequest();
        this.handleResHRequest();
        this.handleClientHResRequest();
    }

    render() {
        const hreservationsC = this.state.hreservationsC.map(r => {
            const res = r.hreservations.map(re => {
                const ree = re.date.split('T')[0]
                return <h3>Date: {ree}</h3>
            })
           return <div>
               <h2>Halls Clients Reservations</h2>
                <h3>Name: {r.name}</h3>
                <h3>Type: {r.type}</h3>
                <h3>Price: {r.price}</h3>
                <h3>Size: {r.size}</h3>
                <h3>Section: {r.section}</h3>
                <h3>Location: {r.location}</h3>
                {res}
            </div>
        })
        const reservationsC = this.state.reservationsC.map(r => {
            const res = r.reservations.map(re => {
                const ree = re.date.split('T')[0]
                return <h3>Date: {ree}</h3>
            })
           return <div>
               <h2>Clients Reservations</h2>
                <h3>Type: {r.type}</h3>
                <h3>Price: {r.price}</h3>
                {res}
            </div>
        })
        const reservations = this.state.reservations.map(reservations => {
            const date = reservations.date.split('T')[0]
            return (
                <div>
                    <h3>User</h3> <h4>{reservations.user_id} </h4>
                    <h3>Tool </h3> <h4>{reservations.tool_id} </h4>
                    <h3>Date </h3> <h4>{date} </h4>
                </div>
            );
        }); 
        const hreservations = this.state.hreservations.map(hreservations => {
            const date = hreservations.date.split('T')[0]
            return (
                <div>
                    <h3>User</h3> <h4>{hreservations.user_id} </h4>
                    <h3>hall </h3> <h4>{hreservations.hall_id} </h4>
                    <h3>Date </h3> <h4>{date} </h4>
                </div>
            );
        }); 
        return <div>
        {reservations}
        {hreservations}
        {reservationsC}
        {hreservationsC}
        </div>;


    }


}


export default MyRes;