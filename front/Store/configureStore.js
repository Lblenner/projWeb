// Store/configureStore.js

import { createStore,combineReducers } from 'redux'
import session from './Reducers/sessionReducer'

export default createStore(combineReducers({ login: session}))
