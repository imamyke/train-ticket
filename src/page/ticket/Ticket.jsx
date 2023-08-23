import './Ticket.css'
import axios from 'axios';
import { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../../component/common/utils/fp';
import { useNavEffect } from '../../component/common/utils/useNavEffect';
import { Header, Detail, Nav } from '../../component/common/index';
import { Candidate } from '../../component/ticket/index';
import {
  setDepartDate,
} from '../../store/actions/homeActions'
import {
  nextDate,
  prevDate,
  setSearchParsed
} from '../../store/actions/queryActions'
import {
  setTrainNumber,
  setArriveStation,
  setDepartStation,
  setTickets,
  setArriveDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setDurationStr,
  toggleIsScheduleVisible
} from '../../store/actions/ticketActions'
import { TrainProvider } from '../../component/ticket/trainContext';

const Schedule = lazy(() => import('../../component/ticket/schedule/Schedule'));

const Ticket = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
  } = useSelector(state => state)
  const { search } = useLocation()
  const onBack = useCallback(() => navigate(-1), [navigate])
  const { 
    isPrevDisabled, 
    isNextDisabled, 
    prev, 
    next 
  } = useNavEffect(departDate, dispatch, prevDate, nextDate)
  const detailCbs = useMemo(() => {
    return bindActionCreators({toggleIsScheduleVisible}, dispatch)
  }, [dispatch]);
  
  // 解析 URI
  useEffect(() => {
    const { aStation, dStation, trainNumber, date } = URI.parseQuery(search)

    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setSearchParsed(true));
  }, [dispatch, search]);

  // 解析完 URI => 請求車票資訊
  useEffect(() => {
    if (!searchParsed) return
    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString();
    
    axios.get(url)
    .then(res => {return res.data})
    .then(data => {
      const { detail, candidates } = data;
      const {
        departTimeStr,
        arriveTimeStr,
        arriveDate,
        durationStr,
      } = detail;

      dispatch(setDepartTimeStr(departTimeStr));
      dispatch(setArriveTimeStr(arriveTimeStr));
      dispatch(setArriveDate(arriveDate));
      dispatch(setDurationStr(durationStr));
      dispatch(setTickets(candidates));
    })
  }, [
    departDate,
    trainNumber,
    dispatch,
    searchParsed
  ])

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);
  if (!searchParsed) return null

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
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
          <span className="left"></span>
          <span
            className="schedule"
            onClick={() => detailCbs.toggleIsScheduleVisible()}
          >
            时刻表
          </span>
          <span className="right"></span>
        </Detail>
      </div>
      <TrainProvider
        trainNumber={trainNumber}
        departStation={departStation}
        arriveStation={arriveStation}
        departDate={departDate}
      >
        <Candidate tickets={tickets} />
      </TrainProvider>
      {isScheduleVisible && (
        <div
          className="mask"
          onClick={() => dispatch(toggleIsScheduleVisible())}
        >
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default Ticket