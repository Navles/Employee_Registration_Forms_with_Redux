// reducer.js
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER,
} from "../Type/Type";

const initialState = {
  users: [],
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload, // Update the user state with the updated user data
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
