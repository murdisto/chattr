import React, { Component } from 'react'
import ChatsComponent from '../chats/Chats';
import ChatComponent from '../chat/Chat';
import ChatInputComponent from '../chatInput/ChatInput';
import NewChatComponent from '../newChat/NewChat';
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
        { this.state.newChatFormVisible ? null : 
          <ChatComponent 
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
          ></ChatComponent> 
        }
        {
          this.state.selectedChat !== null && !this.state.newChatFormVisible ?
          <ChatInputComponent
            chats={this.state.chats}
            onSubmitMessageFn={this.onSubmitMessage}
            messageReadFn={this.messageRead}
          ></ChatInputComponent> :
          null
        }
        {
          this.state.newChatFormVisible ?
          <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent> :
          null
        }
        <Button className={classes.logOutBtn} onClick={this.onLogoutClick}>Log out</Button>
      </div>
      
    )
  }
  
  onLogoutClick = () => firebase.auth().signOut();
  
  onSelectChat = async chatIndex => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    console.log('onSelectChat', this.state.selectedChat);
    this.messageRead();
  } 
  
  onSubmitMessage = message => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(usr => usr !== this.state.email)[0]);
    console.log(docKey);
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message,
          timestamp: Date.now()
        }),
        isRead: false
      });
  }
  
  buildDocKey = friend => [this.state.email, friend].sort().join(':')
  
  onNotificationClick = chatIndex => {
    const { chats } = this.state;
    return chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== this.state.email;
  }
  
  messageRead = () => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(usr => usr !== this.state.email)[0]);

    if (this.onNotificationClick(this.state.selectedChat)) {
      firebase.firestore().collection('chats').doc(docKey).update({ isRead: true });
    } else {
      console.log('messageRead else statement');
      
    }
  }
  
  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await 
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .set({
          messages: [{
            message: chatObj.message,
            sender: this.state.email
          }],
          users: [this.state.email, chatObj.sendTo],
          isRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.onSelectChat(this.state.chats.length - 1);
  }
  
  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':');
    const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    this.setState({ newChatFormVisible: false });
    await this.onSelectChat(this.state.chats.indexOf(chat));
    this.onSubmitMessage(msg);
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
