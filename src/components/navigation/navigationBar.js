import React from 'react';
import NavigationItem from './navigationItem/navigationItem';
import NavigationLogo from '../navigation/navigationLogo/navigationLogo';
import classes from './navigationBar.module.css';
import BurgerLogo from '../../assets/burgerlogo.png';
import MenuIcon from '../../assets/menuIcon.png';
import { connect } from 'react-redux';
import { logOut } from '../../redux/ducks/authenticationReducer';

const navigationBar = (props) => {
  return (
    <div className={classes.NavigationBar}>
      <div className={classes.NavigationBarBox1}>
        <button
          style={{
            opacity: '1.0',
            background: '#434883',
            border: 'none',
            marginRight: '30px',
          }}
          onClick={props.openSidebar}>
          <img
            src={MenuIcon}
            alt='menu icon'
            style={{ height: '50px', width: '50px' }}
          />
        </button>
        <NavigationLogo src={BurgerLogo} title={'Burger Munch'} />
      </div>
      <div className={classes.NavigationBarBox2}>
        <NavigationItem navName={'Burger Builder'} link={'/'} />
        {props.authToken ? (
          <NavigationItem navName={'Orders'} link={'/orders/'+props.user} />
        ) : null}
        {props.authToken ? (
          <NavigationItem
            navName={'Log Out'}
            link={'/logout'}
            onClick={props.logout}
          />
        ) : null}
        {props.authToken ? null : (
          <NavigationItem navName={'Authenticate'} link={'/authenticate'} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.token,
    user:state.auth.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigationBar);
