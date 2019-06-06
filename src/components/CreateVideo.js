import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import apiUrl from '../apiConfig'
import TextField from '@material-ui/core/TextField'

class CreateVideo extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      tag: '',
      url: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/videos`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        video: {
          name: this.state.name,
          tag: this.state.tag,
          url: this.state.url,
          user_id: this.props.user.id
        }
      }
    })
      .then(() => this.props.enqueueSnackbar(`${this.state.name} has been added to the video!`, { variant: 'success' }))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.enqueueSnackbar('Whoops! Failed to add your video. Please try again.', { variant: 'error' })
        this.setState({
          name: '',
          tag: '',
          url: '',
          user_id: ''
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
        <h2>Create Video</h2>
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

export default withSnackbar(withRouter(CreateVideo))
