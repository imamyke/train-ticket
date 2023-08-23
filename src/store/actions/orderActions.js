import axios from 'axios';
import { ACTION_SET_DEPART_DATE } from '../types/homeTypes';
import { ACTION_SET_SEARCH_PARSED } from '../types/queryTypes'
import { 
  ACTION_SET_SEAT_TYPE,
  ACTION_SET_PRICE,
  ACTION_SET_PASSENGERS,
  ACTION_SET_MENU,
  ACTION_SET_IS_MENU_VISIBLE
} from '../types/orderTypes'

import {
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr
} from '../actions/ticketActions'

export function setSeatType(seatType) {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType,
  };
}

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}

export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price,
  };
}

export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers,
  };
}

export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu,
  };
}

export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible,
  };
}

export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}

export function fetchInitial(url) {
  return (dispatch, getState) => {
    axios.get(url)
      .then(res => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price,
        } = res.data;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}

// 添加成人
let passengerIdSeed = 0;

export const createAdult = () => {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) return // 訊息為空 => 不可加入
      }
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          ticketType: 'adult',
          licenceNo: '',
          seat: 'Z',
        },
      ])
    );
  };
}

export const createChild = () => {
  return (dispatch, getState) => {
    const { passengers } = getState();

    let adultFound = null;

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) return // 訊息為空 => 不可加入
      }

      if (passenger.ticketType === 'adult') {
        adultFound = passenger.id;
      }
    }

    if (!adultFound) {
      alert('请至少正确添加一个同行成人');
      return;
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          gender: 'none',
          birthday: '',
          followAdult: adultFound,
          ticketType: 'child',
          seat: 'Z',
        },
      ])
    );
  };
}

export const removePassenger = (id) => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newPassengers = passengers.filter(passenger => {
      return passenger.id !== id && passenger.followAdult !== id;
    });
    dispatch(setPassengers(newPassengers));
  };
}

export const updatePassenger = (id, data, keysToBeRemoved = []) => {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);
        for (let key of keysToBeRemoved) {
          delete newPassengers[i][key];
        }

        dispatch(setPassengers(newPassengers));

        break;
      }
    }
  };
}

export const showMenu = (menu) => {
  return dispatch => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
  };
}

export const showGenderMenu = (id) => {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) return

    dispatch(
      showMenu({
        onPress(gender) {
          dispatch(updatePassenger(id, { gender }));
          dispatch(hideMenu());
        },
        options: [
          {
            title: '男',
            value: 'male',
            active: 'male' === passenger.gender,
          },
          {
            title: '女',
            value: 'female',
            active: 'female' === passenger.gender,
          },
        ],
      })
    );
  };
}

export const showFollowAdultMenu = (id) => {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) return

    dispatch(
      showMenu({
        onPress(followAdult) {
          dispatch(updatePassenger(id, { followAdult }));
          dispatch(hideMenu());
        },
        options: passengers
          .filter(passenger => passenger.ticketType === 'adult')
          .map(adult => {
            return {
              title: adult.name,
              value: adult.id,
              active: adult.id === passenger.followAdult,
            };
          }),
      })
    );
  };
}

export const showTicketTypeMenu = (id) => {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) return

    dispatch(
      showMenu({
        onPress(ticketType) {
          if ('adult' === ticketType) {
            dispatch(
              updatePassenger(
                id,
                {
                  ticketType,
                  licenceNo: '',
                },
                ['gender', 'followAdult', 'birthday']
              )
            );
          } else {
            const adult = passengers.find(passenger =>
              passenger.id === id && passenger.ticketType === 'adult'
            );

              if (adult) {
                dispatch(
                  updatePassenger(
                    id,
                    {
                      ticketType,
                      gender: '',
                      followAdult: adult.id,
                      birthday: '',
                    },
                    ['licenceNo']
                  )
                );
              } else {
                alert('没有其他成人乘客');
              }
          }

          dispatch(hideMenu());
        },
        options: [
          {
            title: '成人票',
            value: 'adult',
            active: 'adult' === passenger.ticketType,
          },
          {
            title: '儿童票',
            value: 'child',
            active: 'child' === passenger.ticketType,
          },
        ],
      })
    );
  };
}

export const hideMenu = () => {
  return setIsMenuVisible(false);
}
