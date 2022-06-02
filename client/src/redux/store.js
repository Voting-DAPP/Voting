import { createStore  } from 'redux'
import reducer from './reducer/VoteReducer'

let store = createStore(reducer)


export default store;