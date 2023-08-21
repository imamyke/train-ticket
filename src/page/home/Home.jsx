import './Home.css'
import { useCallback, useMemo, memo } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DepartDate, HighSpeed, Journey, Submit } from '../../component/home/index'
import { Header, CitySelector } from '../../component/common/index'
import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  getCityData,
  setSelectedCity
} from '../../store/actions/homeActions'


const Home = () => {
  const navigate = useNavigate()
  const onBack = useCallback(() => navigate(-1), [])
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
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}  />
      </div>
      <form action="./query.html" className="form">
        <Journey 
          from={from} 
          to={to} 
          {...journeyCbs}
        />
        {/* <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit /> */}
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      {/* <DateSelector
          show={isDateSelectorVisible}
          {...dateSelectorCbs}
          onSelect={onSelectDate}
      /> */}
    </div>
  )
}

export default Home