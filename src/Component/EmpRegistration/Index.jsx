import { combineReducers } from 'redux';
import itemReducer from '../EmpRegistration/Reducer/Reducer';

export default combineReducers({
  items: itemReducer
});
