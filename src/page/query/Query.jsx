import '../query/Query.css'
import URI from 'urijs';
import dayjs from 'dayjs';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Header, Nav } from '../../component/common/index'
import { List, Bottom } from '../../component/query/index'
import { useNavEffect } from '../../component/common/utils/useNavEffect'
import { toggleHighSpeed } from '../../store/actions/homeActions'
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

const Query = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const onBack = useCallback(() => navigate(-1), [navigate])
  const {
    from,
    to,
    highSpeed,
    departDate,
    searchParsed,
    trainList,
    orderType,
    onlyTickets,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    isFiltersVisible,
    // optionGroup
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
  } = useSelector(state => state)
  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } = useNavEffect(departDate, dispatch, prevDate, nextDate)

  // 解析完 URI => 請求車票資訊
  useEffect(() => {
    const { from, to, date, highSpeed } = URI.parseQuery(search)
    dispatch(setSearchParsed(true))
    if (!searchParsed) return
    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
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
        dispatch(setTrainList(trains)); // 火車車次列表
        dispatch(setTicketTypes(ticketType)); // 坐席類型
        dispatch(setTrainTypes(trainType)); // 車次類型
        dispatch(setDepartStations(depStation)); // 出發車站
        dispatch(setArriveStations(arrStation)); // 到達車站
      })
  }, [
    search,
    dispatch,
    searchParsed,
    departDate,
    highSpeed, 
    orderType, 
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ])

  const bottomCbs = useMemo(() => {
    return bindActionCreators({
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
    }, dispatch)
  }, [dispatch])
  
  if (!searchParsed) return null

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
      </div>
      <Nav
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      />
      <List list={trainList} />
      <Bottom
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
      />
    </div>
  )
}

export default Query