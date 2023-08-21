import { homeReducers } from '../reducers/homeReducers'
import { orderReducers } from '../reducers/orderReducers'
import { queryReducers } from '../reducers/queryReducers'
import { ticketReducers } from '../reducers/ticketReducers'

export const reducersCombination =  {
  ...homeReducers,
  // order,
  // query,
  // ticket
}