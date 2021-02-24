import React, { useState } from 'react';
import classes from './orders.module.css';
import OrderItem from './orderItem/orderItem';
import { useEffect } from 'react';
import axios from '../../utility/axios/ordersAxios';
import { useDispatch, useSelector } from 'react-redux';
import { startLoad, stopLoad } from '../../redux/ducks/overallUIReducer';
import Spinner from '../UI/spinner/spinner';
import prices from '../../utility/prices/prices';

const calculatePrice = (ingredients) => {
  let price = 20;
  Object.keys(ingredients).map((ingredient) => {
    price += ingredients[ingredient] * prices[ingredient];
  });
  // console.log(price);
  return price;
};

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.overallui.isLoading);

  useEffect(() => {
    let ordersObj = [];
    dispatch(startLoad());
    axios
      .get(
        '/orders.json?orderBy="user"&equalTo="' + props.match.params.user + '"'
      )
      .then(
        (response) => {
          Object.keys(response.data).map((orderId) => {
            let order = {
              ...response.data[orderId],
              price: calculatePrice(response.data[orderId].ingredients),
            };
            ordersObj.push(order);
          });
          dispatch(stopLoad());
          ordersObj = ordersObj.reverse();
          setOrders(ordersObj);
        },
        (error) => {
          console.log(error);
          dispatch(stopLoad());
        }
      );
  }, []);

  return (
    <div className={classes.Orders}>
      <div className={classes.OrdersTitle}>
        <h1> Orders </h1>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        orders.map((orderObj, idx) => {
          return (
            <OrderItem
              ingredients={orderObj.ingredients}
              price={orderObj.price}
              date={orderObj.date}
              key={idx}
              order={idx}
            />
          );
        })
      )}
    </div>
  );
};

export default React.memo(Orders);
