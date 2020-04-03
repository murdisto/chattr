import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { TextField } from '@material-ui/core'
import { Send } from '@material-ui/icons'

class ChatInputComponent extends Component {
  constructor() {
    super();
    this.state = {
      chatText: ''
    }
  }
  
  render() {
    
    
    console.log(this.props);
    
    const { classes } = this.props;
    
    return (
      <div className={classes.chatInputContainer}>
        <TextField
          placeholder={'Message ' + this.props.chats[0].users.filter(user => user !== this.props.userEmail)[0]}
          onKeyUp={event => this.userTyping(event)}
          className={classes.chatInput}
          id='inputbox'
        ></TextField>
        <Send
          onClick={this.submitMessage}
          className={classes.sendBtn}
        ></Send>
      </div>
    )
  }
  
  userTyping = event => {
    event.key === 'Enter' ? this.submitMessage() : this.setState({ chatText: event.target.value})
    console.log('User Typing', this.state.chatText);
    console.log('Event.Keycode', event.key);
  }
  
  messageValid = txt => txt && txt.replace(/\s/g, '').length
  
  submitMessage = () => {
    console.log('submit clicked');
    if (this.messageValid(this.state.chatText)) {
      this.props.onSubmitMessageFn(this.state.chatText)
      document.querySelector('#inputbox').value = '';
    }
    
  }
}

export default withStyles(styles)(ChatInputComponent);