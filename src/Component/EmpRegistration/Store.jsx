import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../EmpRegistration/Reducer/Reducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
