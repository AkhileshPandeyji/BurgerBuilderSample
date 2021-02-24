import React from 'react';
import classes from './navigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
  const performAction = () => {
    if (props.decideClass === 'sidebar') {
      props.closeSidebar();
    } 
    if (props.onClick) {
      props.onClick();
    }
  };
  // console.log(props.link)
  return (
    <NavLink
      to={props.link}
      exact
      activeClassName={
        props.decideClass === 'sidebar' ? null : classes.Selected
      }
      className={
        props.decideClass === 'sidebar'
          ? classes.NavigationItemSidebar
          : classes.NavigationItem
      }
      onClick={performAction}>
      <h3>{props.navName}</h3>
    </NavLink>
  );
};

export default navigationItem;
