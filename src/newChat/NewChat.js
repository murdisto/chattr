import React, { Component } from 'react'
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class NewChatComponent extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      message: null
    };
  }
  
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography color='secondary' component="h1" variant="h5" >Send a Message</Typography>
          <form className={classes.form} onSubmit={event => this.submitNewChat(event)}>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-username" color='secondary'>
                Enter your friend's email
              </InputLabel>
              <Input 
                required
                color='secondary' 
                className={classes.input} 
                autoFocus
                onChange={event => this.userTyping('username', event)}
                id='new-chat-username'
              ></Input>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message' color='secondary'>
                  Enter Your Message
              </InputLabel>
              <Input 
                required 
                color='secondary'
                className={classes.input}
                onChange={event => this.userTyping('message', event)} 
                id='new-chat-message'>
              </Input>
            </FormControl>
            <Button fullWidth variant='contained' color='secondary' className={classes.submit} type='submit'>Send</Button>

          </form>
        </Paper>
        
      </main>
    )
  }
  
  userTyping = (inputType, event) => {
    switch (inputType) {
      case 'username':
        this.setState({ username: event.target.value });
        break;
      
      case 'message':
        this.setState({ message: event.target.value });
        break;

      default:
        break;
    }
  }
  
  buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');
  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  }

  goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);
  
  submitNewChat = async event => {
    event.preventDefault();
    const userExists = await this.userExists();
    if(userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  }
  
  userExists = async () => {
    const usersSnapshot = await 
    firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot
      .docs
        .map(_doc => _doc.data().email)
        .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  }
  
  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await 
      firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
    console.log(chat.exists);
    return chat.exists;
  }


}

export default  withStyles(styles)(NewChatComponent);