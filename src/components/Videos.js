import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

class Videos extends Component {
  constructor () {
    super()

    this.state = {
      videos: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/videos`)
      .then(res => {
        this.setState({ videos: res.data.videos })
      })
      .catch(console.error)
  }
  handleDelete = (id) => {
    axios({
      url: `${apiUrl}/videos/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        axios(`${apiUrl}/videos`)
          .then(res => {
            this.setState({ videos: res.data.videos })
          })
          .catch(console.error)
      })
  }

  render () {
    const { user } = this.props
    const { videos } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Current Videos</h3>
          {!user && <p className="m-0">Sign in to edit videos</p>}
          {user && <Button variant="success" href="#create-video">Add A Video</Button>}
        </div>
        <ListGroup>
          { user && videos.map(video => (
            <ListGroup.Item key={video.id}>
              <span className="h5 d-block">{video.name}</span>
              <span className="d-block">{video.tag}</span>
              <a href={video.url} className="d-block">{video.name}</a>
              <Button variant="danger" onClick={() => this.handleDelete(video.id)}>Delete Video</Button>
              <Link to={'/videos/' + video.id + '/change-video'}>
                <Button variant="danger">Change Video</Button>
              </Link>
            </ListGroup.Item>
          )) }
          { !user && videos.map(video => (
            <ListGroup.Item key={video.id}>
              <span className="h5 d-block">{video.name}</span>
              <span>{video.tag}</span>
              <a href={video.url} className="d-block">{video.name}</a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default Videos
