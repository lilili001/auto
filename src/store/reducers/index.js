import { combineReducers } from "redux"

import tweetsReducer from "./tweetsReducer"
import userReducer from "./userReducer"
import autoReducer from './autoReducer'

export default combineReducers({
   /* tweetsReducer,
    userReducer,*/
    autoReducer
})
