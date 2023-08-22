import { homeReducers } from '../reducers/homeReducers'
import { queryReducers } from '../reducers/queryReducers'
import { orderReducers } from '../reducers/orderReducers'
import { ticketReducers } from '../reducers/ticketReducers'

export const reducersCombination =  {
  ...homeReducers,
  ...queryReducers,
  ...orderReducers,
  ...ticketReducers
}