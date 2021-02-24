import React from 'react';
import classes from './navigationLogo.module.css';

const burgerLogo = (props) => {
  return (
    <div className={classes.NavigationLogo}>
          <img src={props.src} alt="Nav Logo" />
          <h3>{props.title}</h3>
    </div>
  );
};

export default burgerLogo;
