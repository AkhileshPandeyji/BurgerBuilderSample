import React from 'react';
import classes from './checkoutForm.module.css';
import { connect } from 'react-redux';
import Burger from '../../components/burger/burger';
import axios from '../../utility/axios/ordersAxios';
import { useState } from 'react';
// import { withFormik,Formik } from 'formik';

const CheckoutForm = (props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [payment, setPayment] = useState('cod');

  const handleSubmit = (event) => {
    event.preventDefault();
    let ingredients = props.ingredients;
    let user = props.userid;
    let date = new Date();
    let dateString =
      '' +
      date.getDate() +
      '-' +
      date.getMonth() +
      '-' +
      date.getFullYear() +
      '  ' +
      date.getHours() +
      ':' +
      date.getMinutes();

    let order = {
      ingredients,
      user,
      date: dateString,
      customerName: name,
      customerAddress: address,
      customerContact: contact,
      customerPayment: payment,
    };
    axios.post('/orders.json', order).then(
      (response) => {
        props.history.push('/orders/' + user);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const handleChange = (event) => {
    let target = event.target;
    let name = target.name;
    if (name === 'name') {
      setName(target.value);
    } else if (name === 'address') {
      setAddress(target.value);
    } else if (name === 'contact') {
      setContact(target.value);
    } else {
      setPayment(target.value);
    }
  };
  return (
    <div className={classes.checkoutForm}>
      <div className={classes.OrderDetail}>
        <Burger ingredients={props.ingredients} decideClass={'checkout'} />
      </div>
      <div className={classes.ContactForm}>
        <form onSubmit={handleSubmit}>
          <h2> Contact Details</h2>
          <div>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              placeholder='Customer Name'
              value={name}
            />
          </div>
          <div>
            <input
              type='text'
              name='address'
              onChange={handleChange}
              placeholder='Address'
              value={address}
            />
          </div>
          <div>
            <input
              type='text'
              name='contact'
              onChange={handleChange}
              placeholder='Contact Number'
              value={contact}
            />
          </div>
          <div>
            <select name='payment' onChange={handleChange} value={payment}>
              <option value='cod'>Cash On Delivery</option>
              <option value='online'>Credit/Debit Card</option>
              <option value='upi'>UPI</option>
            </select>
          </div>
          <button>Checkout</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ing,
    userid: state.auth.user,
  };
};

export default connect(mapStateToProps)(CheckoutForm);
