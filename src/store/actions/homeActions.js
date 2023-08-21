import axios from 'axios';
import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_HIGH_SPEED,
} from '../types/homeTypes';

export const setFrom = (from) => {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}

export const setTo = (to) => {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

export const setIsLoadingCityData = (isLoadingCityData) => {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  }
}

export const setCityData = (cityData) => {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  }
}

export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}

export const showCitySelector = (currentSelectingLeftCity) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    })
  }
}

export const hideCitySelector = () => {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}

export const setSelectedCity = (city) => {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState()
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city))
    } else {
      dispatch(setTo(city))
    }
    dispatch(hideCitySelector())
  }
}

export const showDateSelector = () => {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  }
}

export const hideDateSelector = () => {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    const { from, to } = getState()
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}

export const getCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState()
    if (isLoadingCityData) return

    const cache = JSON.parse(localStorage.getItem('city_data') || '{}')
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data))
      return
    }
    // 獲取 city data 並存入
    dispatch(setIsLoadingCityData(true))
    axios.get('/rest/cities?_' + Date.now())
      .then(res => {
        dispatch(setCityData(res.data))
        localStorage.setItem('city_data', JSON.stringify({
          expires: Date.now() + 60 * 1000,
          data: res.data
        }))
        dispatch(setIsLoadingCityData(false))
      })
      .catch(() => dispatch(setIsLoadingCityData(false)))
  }
}