import '../bottom/Bottom.css'
import classnames from 'classnames';
import BottomModal from './BottomModal';
import { ORDER_DEPART } from '../../../page/query/constant';

const bottom = ({
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  highSpeed,
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
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
}) => {
  
  const noChecked = () => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      departTimeStart === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24
    );
  }
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span 
          className="item" 
          onClick={toggleOrderType}
        >
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
        </span>
        <span
          className={classnames('item', { 'item-on': highSpeed })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁动车
        </span>
        <span
          className={classnames('item', { 'item-on': onlyTickets })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span
          className={classnames('item', {'item-on': isFiltersVisible || !noChecked() })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{noChecked() ? '\uf0f7' : '\uf446'}</i>
          综合筛选
        </span>
      </div>
        {isFiltersVisible && (
          <BottomModal
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
            setCheckedTicketTypes={setCheckedTicketTypes}
            setCheckedTrainTypes={setCheckedTrainTypes}
            setCheckedDepartStations={setCheckedDepartStations}
            setCheckedArriveStations={setCheckedArriveStations}
            setDepartTimeStart={setDepartTimeStart}
            setDepartTimeEnd={setDepartTimeEnd}
            setArriveTimeStart={setArriveTimeStart}
            setArriveTimeEnd={setArriveTimeEnd}
            toggleIsFiltersVisible={toggleIsFiltersVisible}
          />
        )}
    </div>
  )
}

export default bottom