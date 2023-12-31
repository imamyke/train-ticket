import {
  ACTION_SET_TRAIN_NUMBER,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_DEPART_STATION, 
  ACTION_SET_TICKETS,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_IS_SCHEDULE_VISIBLE
} from '../types/ticketTypes'

export const ticketReducers = {
  trainNumber: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TRAIN_NUMBER:
        return payload;
      default:
    }

    return state;
  },
  tickets: (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TICKETS:
        return payload;
      default:
    }

    return state;
  },
  isScheduleVisible: (state = false, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_SCHEDULE_VISIBLE:
        return payload;
      default:
    }

    return state;
  },
  departStation: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPART_STATION:
        return payload;
      default:
    }

    return state;
  },
  arriveStation: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_STATION:
        return payload;
      default:
    }

    return state;
  },
  arriveDate(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_DATE:
        return payload;
      default:
    }

    return state;
  },
  departTimeStr: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPART_TIME_STR:
        return payload;
      default:
    }

    return state;
  },
  arriveTimeStr: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_STR:
        return payload;
      default:
    }

    return state;
  },
  durationStr: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DURATION_STR:
        return payload;
      default:
    }

    return state;
  },
}