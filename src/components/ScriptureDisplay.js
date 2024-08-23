// ScriptureDisplay.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import scrollBackground from '../assets/background.jpg'; // Example background image

const ScriptureDisplay = ({ currentScripture }) => {
  return (
    <Card sx={{ mt: 4, maxWidth: 600, mx: 'auto', position: 'relative' }}>
      <CardMedia
        component="img"
        height="140"
        image={scrollBackground}
        alt="Scroll Background"
        sx={{ opacity: 0.5 }}
      />
      <CardContent sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
          "{currentScripture.text}"
        </Typography>
        <Typography variant="subtitle1" align="right">
          - Book Name?
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScriptureDisplay;
