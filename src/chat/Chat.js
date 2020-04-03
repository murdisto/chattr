import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class ChatComponent extends Component {
  componentDidUpdate = () => {
    console.log('componentDidUpdate');
    const container = document.getElementById('chat-container')
    if (container) {
      console.log('compDidUpdate if statement');
      container.scrollTo(0, container.scrollHeight);
    }
  }
  
  render() {
    const { classes, chat, user } = this.props;
      
    if (chat === undefined) {
      return(<main id='chat-container' className={classes.content}></main>);
    } else {
      return(
        <div>
          <div className={classes.chatHeader}> 
            Your conversation with {chat.users.filter(usr => usr !== user)[0]}
          </div>
          <main id='chat-container' className={classes.content}>
            {
              chat.messages.map((msg, index) => {
                return(
                  <div key={index} className={msg.sender === user ? classes.userSent : classes.friendSent}>
                    {msg.message}
                  </div>
                )
              })
            }
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatComponent);
