import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'

import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signUpSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        enqueueSnackbar(messages.signUpFailure, { variant: 'error' })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <form onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>

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
        <TextField
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={passwordConfirmation}
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
          Sign Up
        </Button>
      </form>
    )
  }
}

export default withSnackbar(withRouter(SignUp))
