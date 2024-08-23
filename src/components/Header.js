// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <MenuBookIcon sx={{ mr: 2, fontSize: 40 }} />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: 'Frank Ruhl Libre, serif' }}>
          Scripture Guessing Game
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
