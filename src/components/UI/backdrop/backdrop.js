import React from 'react';
import classes from './backdrop.module.css';

const backdrop = (props) => {
  return <div className={props.decideClass ? classes.FullBackdrop : classes.HalfBackdrop} onClick={props.onClick}></div>;
};

export default backdrop;
