import { combineReducers } from "redux"
import loginReducer from './login_reducer'
import showDetailReducer from './show_detail_reducer'





export default combineReducers({
    loginReducer,
    showDetailReducer
})