import { combineReducers } from 'redux';
import ingredientsReducer from './ducks/ingredientsReducer';
import authenticationReducer from './ducks/authenticationReducer';
import overallUIReducer from './ducks/overallUIReducer';

const rootReducer = combineReducers({
  ing: ingredientsReducer,
  auth: authenticationReducer,
  overallui: overallUIReducer,
});

export default rootReducer;
