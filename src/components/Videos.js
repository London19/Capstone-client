import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import apiUrl from '../apiConfig'
import Button from '@material-ui/core/Button'
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
          .catch(() => {
            this.props.enqueueSnackbar('Whoops! You can only delete your own videos. Please try again.', { variant: 'danger' })
          })
      })
  }

  render () {
    const { user } = this.props
    const { videos } = this.state

    return (
      <Grid container spacing={3} style={{ padding: '2rem' }}>
        <Grid item xs={6}>
          <h3>Current Videos</h3>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          {!user && <p>Sign in to edit videos</p>}
          {user && <Button variant="contained" color="primary" href="#create-video">Add A Video</Button>}
        </Grid>
        { user && videos.map(video => (
          <Grid item xs={12} md={6} key={video.id}>
            <Fab size="small" color="secondary" aria-label="Edit">
              <Link to={'/videos/' + video.id + '/change-video'}>
                <Icon>edit_icon</Icon>
              </Link>
            </Fab>
            <Fab size="small" color="secondary" aria-label="Edit" onClick={() => this.handleDelete(video.id)}>
              <Icon>delete_icon</Icon>
            </Fab>
            <ul>
              <li>{<span className="h5 d-block">Name: {video.name}</span>}</li>
              <li>{<span className="d-block">Tag: {video.tag}</span>}</li>
            </ul>
            <div className="video-container">
              <div className="video">
                <iframe
                  src={ video.url.replace('watch?v=', 'embed/') }
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </Grid>
        )) }
        { !user && videos.map(video => (
          <Grid item xs={12} md={6} key={video.id}>
            <div className="video-container">
              <div className="video">
                <iframe
                  src={ video.url.replace('watch?v=', 'embed/') }
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
            <Grid item xs={12}>
              <Paper style={{ padding: '1rem' }}>
                <h4>{video.name}</h4>
                <Chip size="small" label={video.tag} />
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Videos
