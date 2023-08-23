import { 
  ACTION_SET_SEAT_TYPE,
  ACTION_SET_PRICE,
  ACTION_SET_PASSENGERS,
  ACTION_SET_MENU,
  ACTION_SET_IS_MENU_VISIBLE
} from '../types/orderTypes'

export const orderReducers = {
  seatType: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_SEAT_TYPE:
        return payload;
      default:
    }

    return state;
  },
  price: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_PRICE:
        return payload;
      default:
    }

    return state;
  },
  passengers: (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_PASSENGERS:
        return payload;
      default:
    }

    return state;
  },
  menu: (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_MENU:
        return payload;
      default:
    }

    return state;
  },
  isMenuVisible: (state = false, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_MENU_VISIBLE:
        return payload;
      default:
    }

    return state;
  },
}