import React, { Component } from 'react'
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Link } from 'react-router-dom';
const firebase = require('firebase');

class LoginComponent extends Component {
  
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: '',
    };
  }
  
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'> 
            Log In
        </Typography>
        <form onSubmit={event => this.submitLogin(event)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-email-input' color='secondary'>Email</InputLabel>
              <Input autoComplete='email' onChange={event => this.userTyping('email', event)} autoFocus id='login-email-input' color='secondary' ></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-password-input' color='secondary'>Password</InputLabel>
              <Input type='password' onChange={event => this.userTyping('password', event)} id='login-password-input' color='secondary'></Input>
            </FormControl>
            <Button type='submit' fullWidth variant='contained' color='secondary' className={classes.submit}>Login</Button>
          </form>
          {
            this.state.loginError ?
            <Typography component='h5' variant='h6' className={classes.signupError}>
              Incorrect Login Information
            </Typography> :
            null
          }
          <Typography component='h5' variant='h6' className={classes.loginLinkHeader}>
            Don't have an account? <Link className={classes.loginLink} to='/signup'>Sign Up!</Link>
          </Typography>
        </Paper>
      </main>
    )
  }
  
  userTyping = (type, event) => {
    console.log({ type, event });
    
    switch (type) {
      case 'email':
        this.setState({ email: event.target.value })
        break;
        
      case 'password':
        this.setState({ password: event.target.value })
        break;
    
      default:
        break;
    }
    
  }
  
  submitLogin = event => {
    event.preventDefault();
    console.log('submitting', event);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/dashboard');
      }, error => {
        this.setState({ loginError:'Server Error' });
        console.log(error);
      });
  }
  
}
export default withStyles(styles)(LoginComponent);