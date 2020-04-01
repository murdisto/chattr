const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    color: '#f50057',
    // backgroundColor: 'red',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  loginLink: {
    width: '100%',
    color: '#f50057',
    fontWeight: 'bolder'
  },
  
});

export default styles;