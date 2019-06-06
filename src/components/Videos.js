import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
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
          .catch(console.error)
      })
  }

  render () {
    const { user } = this.props
    const { videos } = this.state

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Current Videos</h3>
          {!user && <p className="m-0">Sign in to edit videos</p>}
          {user && <Button variant="contained" color="primary" href="#create-video">Add A Video</Button>}
        </div>
        <GridList cellHeight={350}>
          { user && videos.map(video => (
            <GridListTile key={video.id}>
              <IconButton aria-label={`info about ${video.name}`}>
                <Fab size="small" color="secondary" aria-label="Edit">
                  <Link to={'/videos/' + video.id + '/change-video'}>

                    <Icon>edit_icon</Icon>
                  </Link>
                </Fab>
                <DeleteIcon fontSize="large" onClick={() => this.handleDelete(video.id)}>Delete Video</DeleteIcon>
              </IconButton>
              <ul>
                <li>{<span className="h5 d-block">Name: {video.name}</span>}</li>
                <li>{<span className="d-block">Tag: {video.tag}</span>}</li>
              </ul>
              <iframe width="560" height="315" src={ video.url.replace('watch?v=', 'embed/') }
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </GridListTile>
          )) }
          { !user && videos.map(video => (
            <GridListTile key={video.id}>
              <iframe width="560" height="315" src={ video.url.replace('watch?v=', 'embed/') }
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe><GridListTileBar
                name={<span>{video.name}</span>}
                tag={<span>{video.tag}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${video.name}`}>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default Videos
