const styles = theme => ({

  sendBtn: {
    color: '#f50057',
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    },
    transform: 'rotate(-90deg)',
  },

  chatInputContainer: {
    position: 'absolute',
    bottom: '15px',
    left: '315px',
    boxSizing: 'border-box',
    overflow: 'auto',
    width: 'calc(100% - 300px - 50px)'
  },

  chatInput: {
    width: 'calc(100% - 25px)'
  }

});

export default styles;