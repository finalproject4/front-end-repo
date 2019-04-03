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
        let url = `${apiUrl}/api/user/${getUser().id}/resd`;
        console.log(getUser().id)
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data, "details")
                this.setState({ reservations: data.user })
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
        let url = `${apiUrl}/api/user/${getUser().id}/hresd`;
        console.log(getUser().id)
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ hreservations: data.user })
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
               
                <h3>Type: {r.type}</h3>
                <h3>Price: {r.price}</h3>
                {res}
            </div>
        })
        const reservations = this.state.reservations.map(reservations => {
            const date = reservations.reservations.map(date => {
                return <h4>{date.date.split('T')[0]}</h4>
            })
            return (
                <div className="card">
                    <h2>Tool Client Reservations</h2>
                    <h3>Type: {reservations.type} </h3>
                    <h3>Price: {reservations.price} </h3>
                    <h3>Date: {date}</h3> 
                </div>
            );
        }); 
        const hreservations = this.state.hreservations.map(hreservations => {
            const date = hreservations.hreservations.map(date => {
                return <h4>{date.date.split('T')[0]}</h4>
            })
            return (
                <div className="card">
                    <h2>Hall Client Reservations</h2>
                    <h3>Name: {hreservations.name} </h3>
                    <h3>Price: {hreservations.price} </h3>
                    <h3>Type: {hreservations.type} </h3>
                    <h3>Size: {hreservations.size} </h3>
                    <h3>Location: {hreservations.location} </h3>
                    <h3>Section: {hreservations.section} </h3>
                    <h3>Date: {date} </h3>
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