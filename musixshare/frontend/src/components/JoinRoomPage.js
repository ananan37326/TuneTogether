import React, { Component } from 'react';
import { TextField,Button, Grid, Typography, ThemeProvider } from '@mui/material';
import {Link} from 'react-router-dom';
import { withRouter } from './withRouter';


class JoinRoomPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          roomCode: "",
          error: ""
        }
        
    }

    handleTextFieldChange = (event) => {
        this.setState({
            roomCode: event.target.value,
        });
    }

    handleRoomButtonClick = (event) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: this.state.roomCode
        })
      };
      fetch('/api/join-room', requestOptions).then((response) => {
        if (response.ok){
          this.props.navigate(`/room/${this.state.roomCode}`);
        }
        else {
          this.setState({error: "Room Not Found"});
        }
      }).catch((error) => {
        console.log(error);
      });
    }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
          Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField 
            error={this.state.error}
            label="Room Code"
            placeholder="Enter Room Code"
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="outlined"
            onChange={this.handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={this.handleRoomButtonClick}>Enter</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(JoinRoomPage);
