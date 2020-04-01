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

class SignupComponent extends Component {
  
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: '',
    }
  }
  
  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5'> 
            Sign Up!
          </Typography>
          <form onSubmit={event => this.submitSignup(event)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-email-input' color='secondary'>Email</InputLabel>
              <Input autoComplete='email' onChange={event => this.userTyping('email', event)} autoFocus id='signup-email-input' color='secondary' ></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-input' color='secondary'>Password</InputLabel>
              <Input type='password' onChange={event => this.userTyping('password', event)} id='signup-password-input' color='secondary'></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-confirm-input' color='secondary'>Confirm Password</InputLabel>
              <Input type='password' onChange={event => this.userTyping('passwordConfirmation', event)} id='signup-password-confirm-input' color='secondary'></Input>
            </FormControl>
            <Button type='submit' fullWidth variant='contained' color='secondary' className={classes.submit}>Submit</Button>
          </form>
          {
            this.state.signupError ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>{this.state.signupError}</Typography>:
            null
          }
          <Typography component='h5' variant='h6' className={classes.loginLinkHeader}>
            Already have an account? <Link className={classes.loginLink} to='/login'>Login!</Link>
          </Typography>
          
        </Paper>
      </main>
    )
  }
  
  formIsValid = () => this.state.password === this.state.passwordConfirmation;
  
  userTyping = (type, event) => {
    switch (type) {
      case 'email':
        this.setState({ email: event.target.value })
        break;
        
      case 'password':
        this.setState({ password: event.target.value })
        break;
        
      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: event.target.value })
        break;
    
      default:
        break;
    }
    
  }
  
  submitSignup = event => {
    event.preventDefault();
    if (!this.formIsValid) {
      this.setState({ signupError: 'Passwords do not match.'});
      return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(authRes => {
      const userObj = {
        email: authRes.user.email
      }
      
      firebase.firestore().collection('users').doc(this.state.email).set(userObj)
      .then(() => {
        this.props.history.push('/dashboard')
      }, dbError => {
        console.log({dbError});
        this.setState({ signupError: 'Failed to add user'});
      });
    }, authError => {
      console.log({authError});
      this.setState({ signupError: 'Failed to create user'});
    });
    console.log('submitting', this.state)
  };
  
}

export default withStyles(styles)(SignupComponent);