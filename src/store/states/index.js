import { homeStates } from './homeStates'
import { queryStates } from './queryStates'
import { orderStates } from './orderStates'
import { ticketStates } from './ticketStates'

export const statesCombination =  {
  ...homeStates,
  ...queryStates,
  ...orderStates,
  ...ticketStates
}