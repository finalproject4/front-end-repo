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

    delete = (id) => {
        console.log(id)
    }
    handleResRequest = () => {
        let url = `${apiUrl}/api/user/${getUser().id}/resd`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.user, "details")
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
                return <li>{ree}</li>
            })
           return (
            <div className="mt-4">
            <h4>Client Hall Reservation</h4>
            <div className="card m-3">
                <img src="https://imagesawe.s3.amazonaws.com/listing/2019/01/31/al_faisaliah_hotel_1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">{r.name}</h5>
                <p className="card-text">Location: {r.location}</p>
                <p className="card-text">Price: {r.price}</p>
                <p className="card-text">Type: {r.type}</p>
                <p className="card-text">Section: {r.section}</p>
                <p className="card-text">Size: {r.size}</p>
                <p className="card-text">Date: {res}</p>

            </div>
            </div>
            </div>
           
        )})
        const reservationsC = this.state.reservationsC.map(r => {
            const res = r.reservations.map(re => {
                const ree = re.date.split('T')[0]
                return <li>{ree}</li>
            })
           return (
                  <div className="mt-4">
                <h4>Client Tool Reservation</h4>
                <div className="card m-3">
                <img src="https://static.tildacdn.com/tild3166-6166-4965-b466-396633616232/AllEquipmentHire1e1459197308294.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{r.type}</h5>
                    <p className="card-text">Price: {r.price}</p>
                    <p className="card-text">Date: {res}</p>
                </div>
                </div>
                </div>
               
           )
        })
        const reservations = this.state.reservations.map(reservation => {
            
            const date = reservation.reservations.map(date => {
                return <li>{date.date.split('T')[0]}</li>
            })
            return (
                <div className="mt-4">
                <h4>Your Tool Reservation</h4>
                <div className="card m-3">
                <img src="https://static.tildacdn.com/tild3166-6166-4965-b466-396633616232/AllEquipmentHire1e1459197308294.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{reservation.type}</h5>
                    <p className="card-text">Price: {reservation.price}</p>
                    <p className="card-text">Date: {date}</p>
                </div>
                </div>
                </div>
                
            );
        }); 
        const hreservations = this.state.hreservations.map(hreservations => {
            const date = hreservations.hreservations.map(date => {
                return <li>{date.date.split('T')[0]}</li>
            })
            return (
                <div className="mt-4">
                <h4>Your Hall Reservation</h4>
                <div className="card m-3">
                    <img src="https://imagesawe.s3.amazonaws.com/listing/2019/01/31/al_faisaliah_hotel_1.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{hreservations.name}</h5>
                    <p className="card-text">Location: {hreservations.location}</p>
                    <p className="card-text">Price: {hreservations.price}</p>
                    <p className="card-text">Type: {hreservations.type}</p>
                    <p className="card-text">Section: {hreservations.section}</p>
                    <p className="card-text">Size: {hreservations.size}</p>
                    <p className="card-text">Size: {date}</p>

                </div>
                </div>
                </div>
          
            );
        }); 
        return <div className="d-flex justify-content-center mt-5">
        {reservations}
        {hreservations}
        {reservationsC}
        {hreservationsC}
        </div>;


    }


}


export default MyRes;