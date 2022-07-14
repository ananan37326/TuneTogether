import React, { Component } from 'react';
import HomePage from './HomePage';
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import {BrowserRouter as Router, Route, Routes, Link, Redirect} from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
          };
    }

    async componentDidMount() {
        fetch('/api/user-in-room').then(response => response.json()).then(data => {
          this.setState({roomCode: data.code});
        });
  
      }

    clearRoomCode = () => {
        this.setState({roomCode: null});
    }

  render() {
    return (
        
        <Router>
            <Routes>
            <Route exact path="/" element={this.state.roomCode ? (<Navigate replace to={`/room/${this.state.roomCode}`} />) : <HomePage />} />
                <Route path="/join" element={<JoinRoomPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route
                  path="/room/:roomCode"
                  element={<Room leaveRoomCallback={this.clearRoomCode} />}
                />
            </Routes>
        </Router>

        
        
    )
  }
}
