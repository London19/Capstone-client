import React, { Component, Fragment } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class Video extends Component {
  constructor (props) {
    super(props)

    this.state = {
      video: null,
      deleted: false
    }
  }

  // deleteVideo = () => (
  //   axios.delete(`${apiUrl}/videos/${this.props.match.params.id}`)
  //     .then(res => {
  //       this.setState({ deleted: true })
  //     })
  //     .catch(console.error)
  // )
  //
  componentDidMount () {
    axios(`${apiUrl}/videos/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ video: res.data.video })
      })
      .catch(console.error)
  }

  render () {
    const { video } = this.state

    if (!video) {
      return <p>Load...</p>
    }
    return (
      <Fragment>
        <h4>{video.name ? video.title : 'Unknown Title'}</h4>
        <p>Tag: {video.tag ? video.tag : 'Unknown'}</p>
        <p>Url: {video.url ? video.url : 'Unknown'}</p>
        <iframe width="560" height="315" src={ video.url.replace('watch?v=', 'embed/')} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Fragment>
    )
  }
}

export default Video
