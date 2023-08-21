import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducersCombination } from './reducers/index' 
import { statesCombination } from './states' 


const reducers = { ...reducersCombination }
const initialState = { ...statesCombination }
const store = createStore(
  combineReducers(reducers), 
  initialState, 
  applyMiddleware(thunk)
)

export default store
