import React from 'react';
import classes from './burger.module.css';

import Salad from './Salad';
import Bacon from './Bacon';
import Cheese from './Cheese';
import ChickenPatty from './ChickenPatty';

const getComp = (compName, id) => {
  switch (compName) {
    case 'Salad':
      return <Salad key={id} />;
    case 'Bacon':
      return <Bacon key={id} />;
    case 'Cheese':
      return <Cheese key={id} />;
    case 'ChickenPatty':
      return <ChickenPatty key={id} />;
    default:
      return null;
  }
};

const Burger = (props) => {
  const ings = {
    Salad: [],
    Bacon: [],
    Cheese: [],
    ChickenPatty: [],
  };
  Object.keys(props.ingredients).map((param) => {
    for (let i = 0; i < props.ingredients[param]; i++) {
      ings[param].push(getComp(param, i));
    }
  });

  return (
    <div
      className={
        props.decideClass === 'checkout'
          ? classes.BurgerCheckout
          : classes.Burger
      }>
      <div className={classes.BurgerTop}></div>
      {Object.keys(ings).map((param) => {
        return ings[param];
      })}
      <div className={classes.BurgerBottom}></div>
    </div>
  );
};

export default React.memo(Burger);
