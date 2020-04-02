import React, { Component } from 'react'
import ChatsComponent from '../chats/Chats';
import ChatComponent from '../chat/Chat';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
const firebase = require('firebase/app');
class DashboardComponent extends Component {
  _isMounted = false;
  constructor() {
    super();
  
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    };
  }
  
  render() {
    
    const { classes } = this.props;
    
    return (
      <div>
        <ChatsComponent 
          history={this.props.history}
          onNewChatClickFn={this.onNewChatClick}
          onSelectChatFn={this.onSelectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        ></ChatsComponent>
        <ChatComponent></ChatComponent>
        <Button className={classes.logOutBtn} onClick={this.onLogoutClick}>Log out</Button>
      </div>
      
    )
  }
  
  onLogoutClick = () => firebase.auth().signOut();
  
  onSelectChat = chatIndex => {
    console.log('onSelectChat', chatIndex);
    
  } 
  
  onNewChatClick = () => {
    console.log('onNewChatButtonClick');
    this.setState({
      newChatFormVisible: true,
      selectedChat: null,
    });
  }
  
  componentDidMount = () => {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(async _usr => {
      if(!_usr) {
        this.props.history.push('/login');
      } else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            if (this._isMounted) {
              const chats = res.docs.map(_doc => _doc.data());
              await this.setState({
                email: _usr.email,
                chats
              });
            }
            
            // console.log('onsnapshot', this.state);
            
          })
      }
    })
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
}
export default withStyles(styles)(DashboardComponent);
