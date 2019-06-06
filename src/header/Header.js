import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

import './Header.scss'

const authenticatedOptions = (
  <Toolbar>
    <Grid item>
      <Button href="#change-password">Change Password</Button>
      <Button href="#sign-out">Sign Out</Button>
      <Button href="#videos">Home</Button>
    </Grid>
  </Toolbar>
)

const unauthenticatedOptions = (
  <Toolbar>
    <Grid item>
      <Button href="#sign-up">Sign Up</Button>
      <Button href="#sign-in">Sign In</Button>
    </Grid>
  </Toolbar>
)

const Header = ({ user }) => (
  <header className="main-header">
    <AppBar position="static">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={24}
        >
          <IconButton edge="start" color="inherit" aria-label="Menu">
          </IconButton>
          <Typography variant="h3">
             MyChannel
          </Typography>
        </Grid>
      </Toolbar>

      <Toolbar className="ml-auto">
        { user && <span className="text-light pt-2 pr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Toolbar>

    </AppBar>
  </header>
)

export default Header
