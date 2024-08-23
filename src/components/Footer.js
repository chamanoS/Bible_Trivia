// Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ mt: 29, py: 2, backgroundColor: '#3E2723', color: '#fff', textAlign: 'center' }}>
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Scripture Guessing Game. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
