import React, { useState } from 'react';

import Burger from '../../components/burger/burger';
import Auxiliary from '../../utility/hoc/Auxiliary';
import BurgerBuilder from '../../containers/BurgerBuilder/burgerBuilder';
import NavigationBar from '../../components/navigation/navigationBar';
import Backdrop from '../../components/UI/backdrop/backdrop';
import Modal from '../../components/UI/modal/modal';
import Orders from '../../components/orders/orders';

import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
} from '../../redux/ducks/ingredientsReducer';
import classes from './App.module.css';
import LoginForm from '../LoginForm/LoginForm';
import Sidebar from '../../components/UI/sidebar/sidebar';
import { useEffect } from 'react';
import { autoAuth, logOut } from '../../redux/ducks/authenticationReducer';
import Spinner from '../../components/UI/spinner/spinner';
import CheckoutForm from '../checkoutForm/checkoutForm';

const App = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const auto_auth = props.autoAuth;

  useEffect(() => {
    auto_auth();
  }, [auto_auth]);

  const openModal = () => {
    if (!props.auth.token) {
      props.history.push('/authenticate');
      return;
    }
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const openSidebar = () => {
    // console.log(isSidebarVisible);
    setSidebarVisible((prevState) => {
      return !prevState;
    });
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const putOrder = () => {
    props.history.push('/checkout');
    closeModal();
  };

  return (
    <div>
      {isModalVisible || isSidebarVisible ? (
        <Backdrop
          onClick={isModalVisible ? closeModal : closeSidebar}
          decideClass={isModalVisible}
        />
      ) : null}
      {isModalVisible ? (
        <Modal
          msg={'Want to Checkout'}
          cancelTitle={'Cancel'}
          successTitle={'Checkout'}
          cancel={closeModal}
          success={putOrder}
        />
      ) : null}
      {isSidebarVisible ? (
        <Sidebar closeSidebar={closeSidebar} onClick={props.logout} />
      ) : null}
      <NavigationBar openSidebar={openSidebar} />
      <Switch>
        <Route
          path='/'
          exact
          render={() => {
            if (props.isLoading) {
              return <Spinner />;
            } else {
              return (
                <Auxiliary>
                  <Burger ingredients={props.ingredients} />
                  <BurgerBuilder
                    addIng={props.addIng}
                    removeIng={props.removeIng}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <button className={classes.OrderBtn} onClick={openModal}>
                      Order Now
                    </button>
                  </div>
                </Auxiliary>
              );
            }
          }}
        />
        <Route path='/orders/:user' exact component={Orders} />
        <Route path='/authenticate' exact component={LoginForm} />
        <Route path='/checkout' exact component={CheckoutForm} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ing,
    auth: state.auth,
    isLoading: state.overallui.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIng: (ingType) => {
      dispatch(addIngredient(ingType));
    },
    removeIng: (ingType) => {
      dispatch(removeIngredient(ingType));
    },
    autoAuth: () => {
      dispatch(autoAuth());
    },
    logout: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
