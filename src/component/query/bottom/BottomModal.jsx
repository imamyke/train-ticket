import '../bottom/Bottom.css'
import classnames from 'classnames';
import Slider from '../slider/Slider';
import { memo, useState, useMemo, useReducer, useCallback } from 'react';

const BottomModal = ({
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
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
  toggleIsFiltersVisible,
}) => {
  
// option
  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState({
    ...checkedTicketTypes 
  });
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState({
    ...checkedTrainTypes 
  });
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState({
    ...checkedDepartStations 
  });
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState({
    ...checkedArriveStations 
  });
  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const optionGroup = [
    {
        title: '坐席类型',
        options: ticketTypes,
        checkedMap: localCheckedTicketTypes,
        update: setLocalCheckedTicketTypes
        // dispatch: localCheckedTicketTypesDispatch,
    },
    {
        title: '车次类型',
        options: trainTypes,
        checkedMap: localCheckedTrainTypes,
        update: setLocalCheckedTrainTypes
        // dispatch: localCheckedTrainTypesDispatch,
    },
    {
        title: '出发车站',
        options: departStations,
        checkedMap: localCheckedDepartStations,
        update: setLocalCheckedDepartStations
        // dispatch: localCheckedDepartStationsDispatch,
    },
    {
        title: '到达车站',
        options: arriveStations,
        checkedMap: localCheckedArriveStations,
        update: setLocalCheckedArriveStations
        // dispatch: localCheckedArriveStationsDispatch,
    },
  ];
  // option
// const optionGroup = [
//   {
//     title: '坐席类型',
//     options: ticketTypes,
//     checkedMap: localCheckedTicketTypes,
//     dispatch: localCheckedTicketTypesDispatch,
//   },
//   {
//     title: '车次类型',
//     options: trainTypes,
//     checkedMap: localCheckedTrainTypes,
//     dispatch: localCheckedTrainTypesDispatch,
//   },
//   {
//     title: '出发车站',
//     options: departStations,
//     checkedMap: localCheckedDepartStations,
//     dispatch: localCheckedDepartStationsDispatch,
//   },
//   {
//     title: '到达车站',
//     options: arriveStations,
//     checkedMap: localCheckedArriveStations,
//     dispatch: localCheckedArriveStationsDispatch,
//   },
// ];


const isResetDisabled = useMemo(() => {
  return (
    Object.keys(localCheckedTicketTypes).length === 0 &&
    Object.keys(localCheckedTrainTypes).length === 0 &&
    Object.keys(localCheckedDepartStations).length === 0 &&
    Object.keys(localCheckedArriveStations).length === 0 &&
    localDepartTimeStart === 0 &&
    localDepartTimeEnd === 24 &&
    localArriveTimeStart === 0 &&
    localArriveTimeEnd === 24
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd,
  ]);
  
  const sure = () => {
    // 設定票根資訊
    setCheckedTicketTypes(localCheckedTicketTypes)
    setCheckedTrainTypes(localCheckedTrainTypes)
    setCheckedDepartStations(localCheckedDepartStations)
    setCheckedArriveStations(localCheckedArriveStations)
    // 設定時間
    setDepartTimeStart(localDepartTimeStart)
    setDepartTimeEnd(localDepartTimeEnd)
    setArriveTimeStart(localArriveTimeStart)
    setArriveTimeEnd(localArriveTimeEnd)
    // 確定完關閉
    toggleIsFiltersVisible();
  }
  const reset = () => {
    if (isResetDisabled) return // 讓按鈕不可點擊

    // localCheckedTicketTypesDispatch({ type: 'reset' });
    // localCheckedTrainTypesDispatch({ type: 'reset' });
    // localCheckedDepartStationsDispatch({ type: 'reset' });
    // localCheckedArriveStationsDispatch({ type: 'reset' });
    // setLocalDepartTimeStart(0);
    // setLocalDepartTimeEnd(24);
    // setLocalArriveTimeStart(0);
    // setLocalArriveTimeEnd(24);
    // 設定票根資訊
    setLocalCheckedTicketTypes({})
    setLocalCheckedTrainTypes({})
    setLocalCheckedDepartStations({})
    setLocalCheckedArriveStations({})
    // 設定時間
    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  }

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classnames('reset', { disabled: isResetDisabled })}
              onClick={reset}
            >
              重置
            </span>
            <span 
              className="ok" 
              onClick={sure}
            >
              确定
            </span>
          </div>
          <div className="options">
            {optionGroup.map(group => (
              <Option {...group} key={group.title} />
            ))}
            <Slider
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Option = memo(({ 
  title, 
  options, 
  checkedMap, 
  update
  // dispatch 
}) => {
  const toggle = useCallback((value) => {
    const newCheckedMap = { ...checkedMap }
    if (value in checkedMap) {
      delete newCheckedMap[value]
    } else {
      newCheckedMap[value] = true
    }

    update(newCheckedMap)
  }, [checkedMap, update])

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              key={option.value}
              {...option}
              checked={option.value in checkedMap}
              toggle={toggle}
              // dispatch={dispatch}
            />
          );
        })}
      </ul>
    </div>
  );
});

const Filter = memo(({ 
  name, 
  checked, 
  value, 
  toggle
  // dispatch
}) => {

  return (
    <li
      className={classnames({ checked })}
      // onClick={() => dispatch({ payload: value, type: 'toggle' })}
      onClick={() => toggle(value)}
    >
      {name}
    </li>
  );
});

export default memo(BottomModal)
