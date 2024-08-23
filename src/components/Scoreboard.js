// Scoreboard.js
import React from 'react';
import {  Paper, Typography, Grid } from '@mui/material';

const Scoreboard = ({ score, streak, totalStreaks, round }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, backgroundColor: '#fff8e1' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Typography variant="h6">Score: {score}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Streak: {streak}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Total Streaks: {totalStreaks}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Round: {round} / 30</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Scoreboard;
