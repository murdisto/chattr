import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class ChatComponent extends Component {
  render() {
  const { classes } = this.props;
      
    return (
      <div className={classes.content}>
        Hello from Chat component!
      </div>
    )
  }
}

export default withStyles(styles)(ChatComponent);
