import React from 'react';
import BurgerBuilderItem from '../../components/burgerBuilderItem/burgerBuilderItem';
import classes from './burgerBuilder.module.css';

const burgerBuilder = (props) => {
  return (
    <div className={classes.BurgerBuilder}>
      <BurgerBuilderItem
        name={'Salad'}
        type={'Salad'}
        addIng={props.addIng}
        removeIng={props.removeIng}
      />
      <BurgerBuilderItem
        name={'Bacon'}
        type={'Bacon'}
        addIng={props.addIng}
        removeIng={props.removeIng}
      />
      <BurgerBuilderItem
        name={'Cheese'}
        type={'Cheese'}
        addIng={props.addIng}
        removeIng={props.removeIng}
      />
      <BurgerBuilderItem
        name={'Chicken Patty'}
        type={'ChickenPatty'}
        addIng={props.addIng}
        removeIng={props.removeIng}
      />
    </div>
  );
};

export default burgerBuilder;