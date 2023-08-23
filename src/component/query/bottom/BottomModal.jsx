import '../bottom/Bottom.css'
import classnames from 'classnames';
import Slider from '../slider/Slider';
import { memo, useState, useMemo, useReducer } from 'react';

const checkedReducer = (state = {}, action) => {
  const { type, payload } = action
  let newState
  switch(type) {
    case 'TOGGLE':
      newState = { ...state }
      if (payload in newState) { // payload => option.value
        delete newState[payload]
      } else {
        newState[payload] = true
      }
      return newState
    case 'RESET':
      return {}
    default:
  }
}

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
  
// useReducer => const [state, dispatch] = useReducer(reducer, initialArg, init)
// 触发reducer函数，计算对应的 state

// option
  const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(checkedReducer, checkedTicketTypes, () => {
    return {
      ...checkedTicketTypes
    }
  });
  const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(checkedReducer, checkedTrainTypes, () => {
    return {
      ...checkedTrainTypes
    }
  });
  const [localCheckedDepartStations, localCheckedDepartStationsDispatch] = useReducer(checkedReducer, checkedTrainTypes, () => {
    return {
      ...checkedDepartStations
    }
  });
  const [localCheckedArriveStations, localCheckedArriveStationsDispatch] = useReducer(checkedReducer, checkedTrainTypes, () => {
    return {
      ...checkedArriveStations
    }
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
      dispatch: localCheckedTicketTypesDispatch,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: localCheckedTrainTypesDispatch,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      dispatch: localCheckedArriveStationsDispatch,
    },
  ];

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

    // 設定票根資訊
    localCheckedTicketTypesDispatch({ type: 'RESET' });
    localCheckedTrainTypesDispatch({ type: 'RESET' });
    localCheckedDepartStationsDispatch({ type: 'RESET' });
    localCheckedArriveStationsDispatch({ type: 'RESET' });
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
  dispatch 
}) => {
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
              dispatch={dispatch}
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
  dispatch
}) => {
  return (
    <li
      className={classnames({ checked })}
      onClick={() => dispatch({ payload: value, type: 'TOGGLE' })}
    >
      {name}
    </li>
  );
});

export default memo(BottomModal)
