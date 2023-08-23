import './Order.css'
import URI from 'urijs';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';
import { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import { Detail, Header } from '../../component/common/index'
import { Account, Choose, Menu, Passengers, Ticket } from '../../component/order/index'
import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
} from '../../store/actions/ticketActions'
import {
  setSearchParsed,
} from '../../store/actions/queryActions'
import {
  setSeatType,
  setDepartDate,
  fetchInitial,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
} from '../../store/actions/orderActions'


const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const onBack = useCallback(() => navigate(-1), [navigate])
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed
  } = useSelector(state => state)

  // 解析 URI
  useEffect(() => {
    const { trainNumber, dStation, aStation, type, date } = URI.parseQuery(search);

    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));
    dispatch(setSearchParsed(true));
  }, [dispatch, search]);

  useEffect(() => {
    if (!searchParsed) return

    const url = new URI('/rest/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
    dispatch(fetchInitial(url))
  }, [dispatch, searchParsed, departStation, arriveStation, seatType, departDate])

  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        removePassenger,
        updatePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
      }, dispatch);
  }, [dispatch]);
  const menuCbs = useMemo(() => {
    return bindActionCreators(
      { hideMenu }, dispatch);
  }, [dispatch]);

  const chooseCbs = useMemo(() => {
    return bindActionCreators(
      { updatePassenger }, dispatch);
  }, [dispatch]);

  if (!searchParsed) return null;

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
        <span
          className="train-icon"
          style={{ display: 'block' }}
        ></span>
      </Detail>
      </div>
      <Ticket price={price} type={seatType} />
      <Passengers passengers={passengers} {...passengersCbs} />
      {passengers.length > 0 && (
        <Choose passengers={passengers} {...chooseCbs} />
      )}
      <Account length={passengers.length} price={price} />
      <Menu show={isMenuVisible} {...menu} {...menuCbs} />
    </div>
  )
}

export default Order