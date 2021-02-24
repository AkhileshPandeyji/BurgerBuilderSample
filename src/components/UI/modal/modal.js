import React from 'react';
import classes from './modal.module.css';

const modal = (props) => {
    return (
      <div className={classes.Modal}>
        <div className={classes.Message}>
          <p>{props.msg}</p>
        </div>
        <div className={classes.MessageOptions}>
          <button onClick={props.cancel}>{props.cancelTitle}</button>
          <button onClick={props.success}>{props.successTitle}</button>
        </div>
      </div>
    );
}

export default modal;