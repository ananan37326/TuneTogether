import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from './withRouter';


class CreateRoomPage extends Component {

  defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
          guestCanPause: true,
          votesToSkip: this.defaultVotes,
        };
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVoteToSkipChange = this.handleVoteToSkipChange.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    handleVoteToSkipChange = (event) => {
      this.setState({votesToSkip: event.target.value});
    }

    handleGuestCanPauseChange = (event) => {
      this.setState({guestCanPause: event.target.value==='true'?true:false});
    }

    handleCreateRoom = () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: this.state.votesToSkip,
          guest_can_pause: this.state.guestCanPause,
        }),
      };
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.navigate("/room/" + data.code));
    
    }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">
                Guest control 
              </div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
              <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement='bottom'/>
              <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No control" labelPlacement='bottom'/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField required={true} onChange={this.handleVoteToSkipChange}
                       type="number" defaultValue={this.defaultVotes} label="Votes required to skip"
                        inputProps={{
                          min: 1,
                        }}/>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant='contained' color='primary' onClick={this.handleCreateRoom}>
            Create Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant='contained' color='secondary' to='/' component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default withRouter(CreateRoomPage);