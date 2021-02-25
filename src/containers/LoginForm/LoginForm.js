import React from 'react';
import classes from './LoginForm.module.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { authStart } from '../../redux/ducks/authenticationReducer';
import { startLoad, stopLoad } from '../../redux/ducks/overallUIReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = (props) => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email id is required'),
    password: Yup.string()
      .min(8, 'Password must be atleast 8 chars long')
      .max(32, 'Password must not be greater than 32 chars long')
      .required('Password is Required'),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (toggleLogin) {
        props.authenticate(
          values.email,
          values.password,
          '/accounts:signUp?key=AIzaSyD4naqiChzIbvP5XpvHq_cEoA0TzTgpScc',
          props.startLoading,
          props.stopLoading
        );
        resetForm();
        if (props.auth.error === null) props.history.push('/');
      } else {
        props.authenticate(
          values.email,
          values.password,
          '/accounts:signInWithPassword?key=AIzaSyD4naqiChzIbvP5XpvHq_cEoA0TzTgpScc',
          props.startLoading,
          props.stopLoading
        );
        resetForm();
        if (props.auth.error === null) props.history.push('/');
      }
      setSubmitting(false);
    },
  });

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
      <div className={classes.ErrorBox}>
        {errors.email && touched.email ? <h3>{'* ' + errors.email}</h3> : null}
        {errors.password && touched.password ? (
          <h3>{'* ' + errors.password}</h3>
        ) : null}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={values.password}
            onChange={handleChange}
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
