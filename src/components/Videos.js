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
              <Button variant="danger" onClick={() => this.handleDelete(video.id)}>Delete Video</Button>
              <Link to={'/videos/' + video.id + '/change-video'}>
                <Button variant="danger">Change Video</Button>
                <iframe width="560" height="315" src={ video.url.replace('watch?v=', 'embed/') } allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </Link>
            </ListGroup.Item>
          )) }
          { !user && videos.map(video => (
            <ListGroup.Item key={video.id}>
              <span className="h5 d-block">{video.name}</span>
              <span>{video.tag}</span>
              <iframe width="560" height="315" src={ video.url.replace('watch?v=', 'embed/') } allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default Videos
