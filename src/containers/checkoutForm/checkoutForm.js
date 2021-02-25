import React from 'react';
import classes from './checkoutForm.module.css';
import { connect } from 'react-redux';
import Burger from '../../components/burger/burger';
import axios from '../../utility/axios/ordersAxios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CheckoutForm = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(8, 'Customer Full Name must be minimum 8 chars Long')
      .required('Customer Full Name is Required'),
    address: Yup.string().required('Customer Address is Required'),
    contact: Yup.string()
      .length(10, 'Contact must be exactly 10 digits')
      .required('Customer Contact is Required'),
    payment: Yup.string().default('cod'),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      address: '',
      contact: '',
      payment: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
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
        customerName: values.name,
        customerAddress: values.address,
        customerContact: values.contact,
        customerPayment: values.payment,
      };
      axios.post('/orders.json', order).then(
        (response) => {
          props.history.push('/orders/' + user);
        },
        (error) => {
          console.log(error);
        }
      );
      setSubmitting(false);
    },
  });

  return (
    <div className={classes.checkoutForm}>
      <div className={classes.OrderDetail}>
        <Burger ingredients={props.ingredients} decideClass={'checkout'} />
      </div>
      <div className={classes.ContactForm}>
        <form onSubmit={handleSubmit}>
          <h2> Contact Details</h2>
          <div className={classes.ErrorBox}>
            {errors.name && touched.name ? <h3>{'* ' + errors.name}</h3> : null}
            {errors.address && touched.address ? (
              <h3>{'* ' + errors.address}</h3>
            ) : null}
            {errors.contact && touched.contact ? (
              <h3>{'* ' + errors.contact}</h3>
            ) : null}
            {errors.payment && touched.payment ? (
              <h3>{'* ' + errors.payment}</h3>
            ) : null}
          </div>
          <div>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              placeholder='Customer Name'
              value={values.name}
            />
          </div>
          <div>
            <input
              type='text'
              name='address'
              onChange={handleChange}
              placeholder='Address'
              value={values.address}
            />
          </div>
          <div>
            <input
              type='text'
              name='contact'
              onChange={handleChange}
              placeholder='Contact Number'
              value={values.contact}
            />
          </div>
          <div>
            <select
              name='payment'
              onChange={handleChange}
              value={values.payment}>
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
