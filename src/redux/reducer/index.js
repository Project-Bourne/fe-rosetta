import { combineReducers } from "@reduxjs/toolkit";
import TranslateSlice from './translateSlice';

const rootReducer = combineReducers({ 
    translate: TranslateSlice
});

export default rootReducer;
