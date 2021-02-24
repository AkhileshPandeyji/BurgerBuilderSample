import React from 'react';
import classes from './burgerBuilderItem.module.css'

const burgerBuilderItem = (props) => {
    return (
        <div className={classes.BurgerBuilderItem}>
            <h3>{props.name}</h3>
            <button onClick={() => { props.removeIng(props.type) }}>Less</button>
            <button onClick={() => { props.addIng(props.type) }}>More</button>
        </div>
    )
}
export default burgerBuilderItem;