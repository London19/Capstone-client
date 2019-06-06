import React from 'react'

const styles = {
  paperContainer: {
    height: 1356,
    backgroundImage: `url(${'../main.jpg'})`
  }
}

export default class Home extends React.Component {
  render () {
    return (
      <div style={styles.paperContainer}>
      </div>
    )
  }
}
