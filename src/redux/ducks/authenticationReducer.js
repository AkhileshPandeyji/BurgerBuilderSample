import axios from '../../utility/axios/firebaseAxios';

export const AUTH_START = 'BurgerBuilder/authentication/AUTH_START';
export const AUTH_STORE = 'BurgerBuilder/authentication/AUTH_STORE';
export const AUTH_FAIL = 'BurgerBuilder/authentication/AUTH_FAIL';
export const LOGOUT = 'BurgerBuilder/authenticate/LOGOUT';
export const AUTO_AUTH = 'BurgerBuilder/authentication/AUTO_AUTH';

export const authStart = (email, password, url,startLoading,stopLoading) => {
  let firebaseObj = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return (dispatch) => {
    // async code
    startLoading();
    axios.post(url, firebaseObj).then(
      (response) => {
        // console.log(response.data.localId + ' : ' + response.data.idToken);
        localStorage.setItem('TOKEN', response.data.idToken);
        localStorage.setItem('USER_ID', response.data.localId);
        localStorage.setItem('EXPIRES', response.data.expiresIn);
        stopLoading();
        setTimeout(() => {
          dispatch(logOut());
        }, (Number(response.data.expiresIn)*1000));
        dispatch(
          authStore(
            response.data.idToken,
            response.data.localId,
            response.data.expiresIn
          )
        );
      },
      (error) => {
        // console.log(error.message);
        dispatch(authFail(error.message));
        stopLoading();
      }
    );
  };
};

export const authStore = (token, user, expiry) => {
  return {
    type: AUTH_STORE,
    token: token,
    user: user,
    expiry: expiry,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem('TOKEN');
  localStorage.removeItem('USER_ID');
  localStorage.removeItem('EXPIRES');
  return {
    type: LOGOUT,
  };
};

export const autoAuth = () => {
  let token = null,
    user = null,
    expiry = null;
  if (localStorage.getItem('TOKEN')) {
    token = localStorage.getItem('TOKEN');
    user = localStorage.getItem('USER_ID');
    expiry = localStorage.getItem('EXPIRES');
  }
  return {
    type: AUTO_AUTH,
    token,
    user,
    expiry,
  };
};

const initialState = {
  token: null,
  user: null,
  error: null,
  expiresIn: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STORE:
      return {
        ...state,
        token: action.token,
        user: action.user,
        expiresIn: action.expiry,
      };
    case AUTH_FAIL:
      return { ...state, error: action.error };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        error: null,
        expiresIn: null,
      };
    case AUTO_AUTH:
      return {
        ...state,
        token: action.token,
        user: action.user,
        expiresIn: action.expires,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
