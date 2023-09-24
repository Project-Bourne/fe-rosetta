import { combineReducers } from "@reduxjs/toolkit";
import TranslateSlice from './translateSlice';
import TabSlice from './tabSlice'

const rootReducer = combineReducers({ 
    translate: TranslateSlice,
    tab: TabSlice
});
                            
export default rootReducer;
