import '../query/Query.css'
import { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { h0 } from '../../component/common/utils/fp'
import { DepartDate, HighSpeed, Journey, Submit } from '../../component/query/index'
import { Header, Nav } from '../../component/common/index'
import { List, Bottom } from '../../component/query/index'
import {
  
} from '../../store/actions/queryActions'

const bottomCbs = () => {

}


const Query = () => {
  const navigate = useNavigate()
  const onBack = useCallback(() => navigate(-1), [])
  const dispatch = useDispatch()
  const {
    trainList,
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  } = useSelector(state => state)
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
      </div>
      <Nav
        date={departDate}
        // isPrevDisabled={isPrevDisabled}
        // isNextDisabled={isNextDisabled}
        // prev={prev}
        // next={next}
      />
      {/* <List list={trainList} /> */}
      {/* <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        {...bottomCbs}
      /> */}
    </div>
  )
}

export default Query