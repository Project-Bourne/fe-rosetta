import { combineReducers } from "@reduxjs/toolkit";
import TranslateSlice from './translateSlice';
import TabSlice from './tabSlice'
import authSlice from './authReducer'

const rootReducer = combineReducers({ 
    translate: TranslateSlice,
    tab: TabSlice,
    auth: authSlice
});
                            
export default rootReducer;
