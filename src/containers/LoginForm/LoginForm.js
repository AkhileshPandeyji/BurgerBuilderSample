import React from 'react';
import classes from './LoginForm.module.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { authStart } from '../../redux/ducks/authenticationReducer';
import { startLoad, stopLoad } from '../../redux/ducks/overallUIReducer';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleLogin, setToggleLogin] = useState(false);

  const changeValue = (event) => {
    let value = event.target.value;
    if (event.target.name === 'email') setEmail(value);
    else setPassword(value);
  };

  const clearAll = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (toggleLogin) {
      props.authenticate(
        email,
        password,
        '/accounts:signUp?key=AIzaSyD4naqiChzIbvP5XpvHq_cEoA0TzTgpScc',
        props.startLoading,
        props.stopLoading
      );
      clearAll();
      if (props.auth.error === null) props.history.push('/');
    } else {
      props.authenticate(
        email,
        password,
        '/accounts:signInWithPassword?key=AIzaSyD4naqiChzIbvP5XpvHq_cEoA0TzTgpScc',
        props.startLoading,
        props.stopLoading
      );
      clearAll();
      if (props.auth.error === null) props.history.push('/');
    }
  };
  const toggleLoginBtn = () => {
    setToggleLogin((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.LoginForm}>
      <div style={{ textAlign: 'center' }}>
        <h4>Burger Munch</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={changeValue}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={changeValue}
          />
        </div>
        <div className={classes.ButtonDiv}>
          <button>{toggleLogin ? 'Sign Up' : 'Login'}</button>
          <p onClick={toggleLoginBtn}>
            {toggleLogin ? 'Login' : 'Create Account'}
          </p>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password, url, startL, stopL) =>
      dispatch(authStart(email, password, url, startL, stopL)),
    startLoading: () => {
      dispatch(startLoad());
    },
    stopLoading: () => {
      dispatch(stopLoad());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
