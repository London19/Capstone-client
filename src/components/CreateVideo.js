import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateVideo extends Component {
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
    const { user } = this.props
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
          url: 'https://www.youtube.com/embed/mDitt0MNVC0',
          user_id: user.id
        }
      }
    })
      .then(() => this.props.alert(`${this.state.name} has been added to the video!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your video. Please try again.', 'danger')
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
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Video</h2>
        <Form.Group controlId="videoName">
          <Form.Label>Video Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            name="name"
            required
            onChange={this.handleChange}
            placeholder="Enter the video name"
          />
        </Form.Group>

        <Form.Group controlId="videoTag">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            value={tag}
            name="tag"
            required
            placeholder="Enter the Tag"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="videoUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            required
            placeholder="Enter the Url"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

export default withRouter(CreateVideo)
