import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signInSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        enqueueSnackbar(messages.signInFailure, { variant: 'error' })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <form onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={email}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          fullWidth
          margin="dense"
          variant="outlined"
          onChange={this.handleChange}
          value={password}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    )
  }
}

export default withSnackbar(withRouter(SignIn))
