import React, { Component } from "react";
import apiUrl from "../apiConfig";
import '../App.css';
import { getUser } from "../services/AuthService";
import swal from 'sweetalert';
import Reservations from './Reservations';
import HReservations from './HReservations';

class Home extends Component {
    
    state = {
    }
    render() {
     
        return (
            <div>
                <Reservations />
                <HReservations />
            </div>
        )
    }


}


export default Home;





  
