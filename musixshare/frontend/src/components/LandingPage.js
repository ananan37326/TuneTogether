import React, { Component } from 'react';
import HomePage from './HomePage';
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import {BrowserRouter as Router, Route, Routes, Link, Redirect} from 'react-router-dom';


export default class LandingPage extends Component {

    constructor(props) {
        super(props);
    }

  render() {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/join" element={<JoinRoomPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>

        
        
    )
  }
}
