import React from 'react';
import classes from './sidebar.module.css';
import NavigationItem from '../../navigation/navigationItem/navigationItem';
import { connect } from 'react-redux';
import { logOut } from '../../../redux/ducks/authenticationReducer';

const sidebar = (props) => {
  return (
    <div className={classes.Sidebar}>
      <NavigationItem
        decideClass={'sidebar'}
        navName={'Burger Builder'}
        link={'/'}
        closeSidebar={props.closeSidebar}
      />
      {props.authToken ? (
        <NavigationItem
          decideClass={'sidebar'}
          navName={'Orders'}
          link={'/orders/'+props.user}
          closeSidebar={props.closeSidebar}
        />
      ) : null}
      {props.authToken ? (
        <NavigationItem
          decideClass={'sidebar'}
          navName={'Log Out'}
          link={'/logout'}
          closeSidebar={props.closeSidebar}
          onClick={props.onClick}
        />
      ) : null}
      {props.authToken ? null : (
        <NavigationItem
          decideClass={'sidebar'}
          navName={'Authenticate'}
          link={'/authenticate'}
          closeSidebar={props.closeSidebar}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.token,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sidebar);
