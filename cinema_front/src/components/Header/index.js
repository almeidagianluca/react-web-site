import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

import './style.css'
import AuthService from '../../services/AuthService';

export default function Header() {

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
  const user = AuthService.getCurrentUser();
  if (user) {
  setCurrentUser(user);
  }
  }, []);

  const refresh = () => {
    window.location.href = '/';
  };

  function navigateToCatalog() {
    window.location.href = '/';
  }

  function navigateToUpdate() {
    window.location.href = '/update-movies';
  }

  function navigateToLogin() {
    window.location.href = '/login';
  }

  function navigateToLogout() {
    window.location.href = '/logout';
  }

  return (
    <AppBar position="static" className='appBar'>
      <Toolbar>
        <IconButton
          onClick={refresh}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <LocalMoviesIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cinema
        </Typography>
        <Button color="inherit" onClick={navigateToCatalog}>Movies</Button>
        <Button color="inherit" onClick={navigateToUpdate}>Update Catalog</Button>
        {currentUser ? (
          <Button color="inherit" onClick={navigateToLogout}>logout</Button>
        ) : (
          <Button color="inherit" onClick={navigateToLogin}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
