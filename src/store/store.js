import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index' 

const initialState = {
  
}

const store = createStore(
  combineReducers(reducers), 
  initialState, 
  applyMiddleware(thunk)
)

export default store
