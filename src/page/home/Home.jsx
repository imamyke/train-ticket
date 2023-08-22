import './Home.css'
import { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { h0 } from '../../component/common/utils/fp'
import { DepartDate, HighSpeed, Journey, Submit } from '../../component/home/index'
import { Header, CitySelector, DateSelector } from '../../component/common/index'
import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  getCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from '../../store/actions/homeActions'


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    from, 
    to,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isLoadingCityData,
    highSpeed,
    departDate,
  } = useSelector(state => state)
  const onBack = useCallback(() => navigate(-1), [])
  const journeyCbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [])
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({ 
      onBack: hideCitySelector,
      getCityData,
      onSelect: setSelectedCity
    }, dispatch)
  }, [])
  const departDateCbs = useMemo(() => {
    return bindActionCreators({ 
      onClick: showDateSelector
    }, dispatch)
  }, [])
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({ 
      onBack: hideDateSelector
    }, dispatch)
  }, [])
  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({ 
      toggle: toggleHighSpeed
    }, dispatch)
  }, [])
  const onSelectDate = useCallback((day) => {
    if (!day || day < h0()) return
    dispatch(setDepartDate(day)) 
    dispatch(hideDateSelector())
  }, [])
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}  />
      </div>
      <form className="form">
        <Journey 
          from={from} 
          to={to} 
          {...journeyCbs}
        />
        <DepartDate 
          time={departDate} 
          {...departDateCbs} 
        />
        <HighSpeed 
          highSpeed={highSpeed} 
          {...highSpeedCbs} 
        />
        <Submit from={from} to={to} time={departDate} highSpeed={highSpeed} />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        onSelect={onSelectDate}
        {...dateSelectorCbs}
      />
    </div>
  )
}

export default Home