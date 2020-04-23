// Store/Reducers/sessionReducer.js

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const initialState = { token: cookies.get("logged") }


function session(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_SESSION':

      const token = action.value
      cookies.set("logged",token)

      nextState = {
        ...state,
        token: token
      }

      return nextState || state

    case 'REMOVE_SESSION':
      
      cookies.remove("logged")

      nextState = {
        ...state,
        token: null
      }

      return nextState || state
    default:
      return state
  }
}

export default session
