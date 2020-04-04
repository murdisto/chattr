import React, { Component } from 'react'
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { ListItemIcon } from '@material-ui/core';
import { NotificationImportant } from '@material-ui/icons';

class ChatsComponent extends Component {
  
  
  
  render() {
    const { classes } = this.props;
    console.log(classes);
    
    if (this.props.chats.length > 0) {
      console.log('pos');
      
      return (
        <main className={classes.root}>
          <Button
            variant='contained'
            fullWidth
            color='secondary'
            className={classes.newChatBtn}
            onClick={this.newChat}
          >New Message</Button>
          <List>
            {
              this.props.chats.map((_chat, _index) => {
                return(
                  <div key={_index}>
                    <ListItem 
                      onClick={() => this.selectChat(_index)}
                      className={classes.listItem}
                      selected={this.props.selectedChatIndex === _index}
                      alignItems='flex-start' 
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                        secondary={
                          <React.Fragment>
                            <Typography component='span' color='textPrimary'>
                              {
                                _chat.messages[_chat.messages.length - 1].message.substring(0, 45).length > 44 ?
                                _chat.messages[_chat.messages.length - 1].message.substring(0, 45) + '...' :
                                _chat.messages[_chat.messages.length - 1].message.substring(0, 45)
                              }
                            </Typography>
                          </React.Fragment>
                        }
                      >
                      </ListItemText>
                      {
                        _chat.isRead === false && !this.userIsSender(_chat) ?
                        <ListItemIcon><NotificationImportant className={classes.unreadMessage}></NotificationImportant></ListItemIcon> :
                        null
                      }
                    </ListItem>
                    <Divider></Divider>
                  </div>
                )
              })
            }
          </List>
        </main>
      )
    } else {
      return(
        <div className={classes.root}>
          <Button 
            variant="contained" 
            fullWidth 
            color='secondary' 
            onClick={this.newChat} 
            className={classes.newChatBtn}
          >New Message
          </Button>
          <List></List>
        </div>
      );
    }
    
  }
  
  newChat = () => {
    console.log('New Chat button clicked');
    this.props.onNewChatClickFn();
  }
  
  selectChat = index => {
    console.log('selectChat', index);
    this.props.onSelectChatFn(index);
  }
  
  userIsSender = chat => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  
  
}

export default withStyles(styles)(ChatsComponent);