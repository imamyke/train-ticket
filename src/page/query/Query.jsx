import '../query/Query.css'
import URI from 'urijs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useCallback, useMemo, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { h0 } from '../../component/common/utils/fp'
import { DepartDate, HighSpeed, Journey, Submit } from '../../component/query/index'
import { Header, Nav } from '../../component/common/index'
import { List, Bottom } from '../../component/query/index'
import {
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
} from '../../store/actions/queryActions'

const bottomCbs = () => {

}

const Query = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const { from, to, date, highSpeed } = URI.parseQuery(search)
  const onBack = useCallback(() => navigate(-1), [])
  const {
    departDate,
    searchParsed,
    trainList,
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

  // 解析完 URI => 請求車票資訊
  useEffect(() => {
    dispatch(setSearchParsed(true))
    if (!searchParsed) return
    const url = new URI(`/rest/query?from=${from}&to=${to}`)
        .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .setSearch('highSpeed', highSpeed)
        .setSearch('orderType', orderType)
        .setSearch('onlyTickets', onlyTickets)
        .setSearch('checkedTicketTypes',
          Object.keys(checkedTicketTypes).join())
        .setSearch('checkedTrainTypes',
          Object.keys(checkedTrainTypes).join())
        .setSearch('checkedDepartStations',
          Object.keys(checkedDepartStations).join())
        .setSearch('checkedArriveStations',
          Object.keys(checkedArriveStations).join())
        .setSearch('departTimeStart', departTimeStart)
        .setSearch('departTimeEnd', departTimeEnd)
        .setSearch('arriveTimeStart', arriveTimeStart)
        .setSearch('arriveTimeEnd', arriveTimeEnd)
        .toString();
    
    axios.get(url)
      .then(res => {return res.data})
      .then(data => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation,
              },
            },
          },
        } = data;
        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      })
  }, [
    dispatch,
    searchParsed,
    from,
    to,
    departDate,
    date,
    highSpeed, 
    orderType, 
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,departTimeEnd,
    arriveTimeStart,arriveTimeEnd
  ])
  if (!searchParsed) return null

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
      </div>
      <Nav
        // date={departDate}
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