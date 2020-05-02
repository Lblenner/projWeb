// Store/Reducers/sessionReducer.js
import Cookies from 'universal-cookie';

const cookies = new Cookies();

//On initilaise le token dans _app coté server
const initialState = { token: null, username: null }


function session(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_SESSION':

      const token = action.value
    
      cookies.set("logged",token)
      cookies.set("username",action.username)

      nextState = {
        ...state,
        token: token,
        username: action.username
      }

      return nextState || state

    case 'REMOVE_SESSION':
      
      cookies.remove("logged")
      cookies.remove("username")

      nextState = {
        ...state,
        token: null,
        username: null
      }

      return nextState || state
    default:
      return state
  }
}

export default session
