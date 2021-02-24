import React from 'react';
import classes from './orderItem.module.css';

const getOrderMsg = (ingredients) => {
  let orderMsg = '';
  Object.keys(ingredients).map((key) => {
    orderMsg += key + ' x ' + ingredients[key] + ' ';
  });
  return orderMsg;
};

const orderItem = (props) => {
  const msg = getOrderMsg(props.ingredients);
  return (
    <div className={classes.OrderItem}>
      <div className={classes.NewItem}>
        <h3>{props.date}</h3>
        {props.order === 0 ? (
          <h3 style={{ color: 'red', fontWeight: 'bold' }}>New</h3>
        ) : null}
      </div>
      <div className={classes.OrderBox}>
        <p>{msg}</p>
        <h3>Rs.{props.price}</h3>
      </div>
    </div>
  );
};

export default orderItem;
