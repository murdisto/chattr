const styles = theme => ({

  content: {
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    padding: '25px',
    marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '50px',
    width: 'calc(100% - 300px)',
    position: 'absolute'
  },
  userSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#f50057',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },
  friendSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: 'white',
    color: 'black',
    width: '300px',
    border: 'solid 1px rgba(48, 48, 48, 0.2)',
    borderRadius: '10px'
  },
  chatHeader: {
    width: 'calc(100% - 301px)',
    height: '50px',
    backgroundColor: 'white',
    position: 'fixed',
    marginLeft: '301px',
    fontSize: '18px',
    textAlign: 'center',
    color: '#f50057',
    paddingTop: '10px',
    boxSizing: 'border-box',
    borderBottom: 'solid 1px #f50057'
  },
});

export default styles;