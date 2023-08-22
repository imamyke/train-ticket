import {
  ACTION_SET_TICKETS,
  ACTION_SET_IS_SCHEDULE_VISIBLE
} from '../types/ticketTypes'

export const ticketReducers = {
  tickets(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TICKETS:
        return payload;
      default:
    }

    return state;
  },
  isScheduleVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_SCHEDULE_VISIBLE:
        return payload;
      default:
    }

    return state;
  }
}