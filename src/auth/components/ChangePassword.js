import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, user } = this.props

    changePassword(this.state, user)
      .then(() => enqueueSnackbar(messages.changePasswordSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        enqueueSnackbar(messages.changePasswordFailure, { variant: 'danger' })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form onSubmit={this.onChangePassword}>
        <h3>ChangePassword</h3>
        <TextField
          name="oldPassword"
          label="Old Password"
          type="oldPassword"
          required
          fullWidth
          margin="dense"
          variant="outlined"
          onChange={this.handleChange}
          value={oldPassword}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          name="newPassword"
          label="New Password"
          type="newPassword"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={newPassword}
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
          Change Password
        </Button>
      </form>
    )
  }
}

export default withSnackbar(withRouter(ChangePassword))
