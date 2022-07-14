import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import props from "prop-types";
import { useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

export default function Room() {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { roomCode } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback; // clears roomCode state in HomePage
          navigate("/");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }, []);

  const handleLeaveRoom = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/leave-room`, requestOptions).then((_response) => {
      props.leaveRoomCallback; // clears roomCode state in HomePage
      navigate("/");
    });
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={3} align="center">
        {/* <Grid item xs={12}>
          <CreateRoomPage />
        </Grid> */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSettingsButton = () => {
    if (isHost) {
      return (
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </Button>
        </Grid>
      );
    }
  };

  if (showSettings) {
    renderSettings();
  } else {
    return (
      <Grid container spacing={1} align="center">
        >
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h6" variant="h6">
            Guest can pause: {guestCanPause ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h6" variant="h6">
            Votes to skip: {votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h6" variant="h6">
            Host: {isHost ? "Yes" : "No"}
          </Typography>
        </Grid>
        {renderSettingsButton()}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLeaveRoom}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
