const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  listItem: {
    cursor: 'pointer'
  },
  newChatBtn: {
    borderRadius: '0px'
  },
  unreadMessage: {
    color: 'lime',
    position: 'absolute',
    top: '0',
    right: '5px'
  }
});

export default styles;