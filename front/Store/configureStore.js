// Store/configureStore.js

import { createStore,combineReducers } from 'redux'
import session from './Reducers/sessionReducer'

const makeStore = (initState) => createStore(session, initState)

export default makeStore