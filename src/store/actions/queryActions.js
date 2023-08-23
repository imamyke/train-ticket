import {
  ACTION_SET_TRAIN_LIST,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKED_TICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_SEARCH_PARSED
} from '../types/queryTypes';
import { ORDER_DURATION, ORDER_DEPART } from '../../page/query/constant';
import { h0 } from '../../component/common/utils/fp';
import { setDepartDate } from '../actions/homeActions'

export const setTrainList = (trainList) => {
  return {
    type: ACTION_SET_TRAIN_LIST,
    payload: trainList,
  };
}
export const toggleOrderType = () => {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        payload: ORDER_DURATION,
      });
    } else {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        payload: ORDER_DEPART,
      });
    }
  };
}
export const toggleOnlyTickets = () => {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();

    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      payload: !onlyTickets,
    });
  };
}
export const setTicketTypes = (ticketTypes) => {
  return {
    type: ACTION_SET_TICKET_TYPES,
    payload: ticketTypes,
  };
}
export const setCheckedTicketTypes = (checkedTicketTypes) => {
  return {
    type: ACTION_SET_CHECKED_TICKET_TYPES,
    payload: checkedTicketTypes,
  };
}
export const setTrainTypes = (trainTypes) => {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    payload: trainTypes,
  };
}
export const setCheckedTrainTypes = (checkedTrainTypes) => {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPES,
    payload: checkedTrainTypes,
  };
}
export const setDepartStations = (departStations) => {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    payload: departStations,
  };
}
export const setCheckedDepartStations = (checkedDepartStations) => {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    payload: checkedDepartStations,
  };
}
export const setArriveStations = (arriveStations) => {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    payload: arriveStations,
  };
}
export const setCheckedArriveStations = (checkedArriveStations) => {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    payload: checkedArriveStations,
  };
}
export const setDepartTimeStart = (departTimeStart) => {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    payload: departTimeStart,
  };
}
export const setDepartTimeEnd = (departTimeEnd) => {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    payload: departTimeEnd,
  };
}
export const setArriveTimeStart = (arriveTimeStart) => {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    payload: arriveTimeStart,
  };
}
export const setArriveTimeEnd = (arriveTimeEnd) => {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    payload: arriveTimeEnd,
  };
}
export const toggleIsFiltersVisible = () => {
  return (dispatch, getState) => {
    const { isFiltersVisible } = getState();

    dispatch({
      type: ACTION_SET_IS_FILTERS_VISIBLE,
      payload: !isFiltersVisible,
    });
  };
}
export const setSearchParsed = (searchParsed) => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}

export const nextDate = () => {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
  };
}
export const prevDate = () => {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
}

