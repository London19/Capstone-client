import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import apiUrl from '../apiConfig'

class ChangeVideo extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      tag: '',
      url: ''
    }
  }
handleSubmit = (event) => {
  event.preventDefault()

  axios({
    url: `${apiUrl}/videos/${this.props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    },
    data: {
      video: {
        name: this.state.name,
        tag: this.state.tag,
        url: this.state.url
      }
    }
  })
    .then(() => this.props.enqueueSnackbar(`${this.state.name} has changed!`, { variant: 'success' }))
    .then(() => this.props.history.push('/'))
    .catch(() => {
      this.props.enqueueSnackbar('Whoops! Failed to change unauthenticated video. Please try again.', { variant: 'danger' })
      this.setState({
        name: '',
        tag: '',
        url: ''
      })
    })
}
handleChange = event => this.setState({
  [event.target.name]: event.target.value
})

resetForm = () => this.setState({
  name: '',
  tag: '',
  url: ''
})
render () {
  const { name, tag, url } = this.state
  return (
    <form onSubmit={this.handleSubmit}>
      <h2>Change Video</h2>
      <TextField
        name="name"
        label="Name"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={this.handleChange}
        value={name}
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        name="tag"
        label="Tag"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={this.handleChange}
        value={tag}
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        name="url"
        label="URL"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={this.handleChange}
        value={url}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button
        variant="outlined"
        type="submit"
        className="m-1"
        color="secondary"
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        type="button"
        className="m-1"
        color="secondary"
        onClick={this.resetForm}
      >
        Reset
      </Button>
    </form>
  )
}
}

export default withSnackbar(withRouter(ChangeVideo))
