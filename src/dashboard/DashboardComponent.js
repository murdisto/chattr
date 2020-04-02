import React, { Component } from 'react'
import ChatsComponent from '../chatsList/ChatsComponent';
const firebase = require('firebase');
export default class DashboardComponent extends Component {
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
      </div>
      
    )
  }
  
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
    firebase.auth().onAuthStateChanged(async _usr => {
      if(!_usr) {
        this.props.history.push('/login');
      } else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _usr.email,
              chats
            });
            console.log('onsnapshot', this.state);
            
          })
      }
    })
  }
  
}
