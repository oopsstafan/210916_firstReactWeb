import {createStore, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allReducers from './reducers/index'





export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))