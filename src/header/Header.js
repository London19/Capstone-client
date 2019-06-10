import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <Button href="#change-password">Change Password</Button>
    <Button href="#sign-out">Sign Out</Button>
    <Button href="#videos">Home</Button>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Button href="#sign-up">Sign Up</Button>
    <Button href="#sign-in">Sign In</Button>
  </Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          spacing={3}
        >
          <IconButton edge="start" color="inherit" aria-label="Menu">
          </IconButton>
          <Typography variant="h3">
             MyChannel
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            { user && <span className="text-light pt-2 pr-2">Welcome, {user.email}</span>}
            { user ? authenticatedOptions : unauthenticatedOptions }
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  </header>
)

export default Header
