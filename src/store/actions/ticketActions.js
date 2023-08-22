import {
  ACTION_SET_TICKETS,
  ACTION_SET_IS_SCHEDULE_VISIBLE
} from '../types/ticketTypes'

export function setTickets(tickets) {
  return {
      type: ACTION_SET_TICKETS,
      payload: tickets,
  };
}
export function setIsScheduleVisible(isScheduleVisible) {
  return {
      type: ACTION_SET_IS_SCHEDULE_VISIBLE,
      payload: isScheduleVisible,
  };
}
export function toggleIsScheduleVisible() {
  return (dispatch, getState) => {
      const { isScheduleVisible } = getState();

      dispatch(setIsScheduleVisible(!isScheduleVisible));
  };
}