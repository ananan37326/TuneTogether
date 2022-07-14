import React, { Component } from 'react';
import {Link, Redirect, Grid, Button, ButtonGroup, Typography } from '@mui/material';


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        
    }


    

  render() {
    return (
      <Grid container spacing={3} align="center">
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            TuneTogether
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" href="/join" component={Link}>JoinRoom</Button>
            <Button color="secondary" href="/create" component={Link}>Create Room</Button>    
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }
}
