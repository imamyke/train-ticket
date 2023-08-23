import '../schedule/Schedule.css'
import axios from 'axios';
import classnames from 'classnames';
import URI from 'urijs';
import dayjs from 'dayjs';
import leftPad from 'left-pad';
import { memo, useState, useEffect } from 'react';

const Schedule = ({ 
  date, 
  trainNumber, 
  departStation, 
  arriveStation 
}) => {
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const url = new URI('/rest/schedule')
      .setSearch('trainNumber', trainNumber)
      .setSearch('departStation', departStation)
      .setSearch('arriveStation', arriveStation)
      .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
      .toString()
    axios.get(url)
      .then(res => {return res.data})
      .then(data => {
        let departRow; // 出發站
        let arriveRow; // 到達站

        for (let i = 0; i < data.length; ++i) {
          if (!departRow) {
            if (data[i].station === departStation) { // 是否為發車站
              departRow = Object.assign(data[i], {
                beforeDepartStation: false, // 發車前車站
                isDepartStation: true, // 發車站
                afterArriveStation: false, // 發車候車站
                isArriveStation: false, // 終到站
              });
            } else {
              Object.assign(data[i], { 
                beforeDepartStation: true,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              });
            }
          } else if (!arriveRow) { // 是否為終到站
            if (data[i].station === arriveStation) {
              arriveRow = Object.assign(data[i], {
              beforeDepartStation: false,
              isDepartStation: false,
              afterArriveStation: false,
              isArriveStation: true,
            })} else {
              Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
            })}} else {
              Object.assign(data[i], { // 發車後車站
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: true,
                isArriveStation: false,
              })
            }
          Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
          });
        }
      setScheduleList(data)
      })
  }, [date, trainNumber, departStation, arriveStation])

  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return (
              <ScheduleRow
                key={schedule.station}
                index={index + 1}
                {...schedule}
              />
            );
          })}
        </ul>
      </div>
    </div>
  )
}

const ScheduleRow = memo(({
  index,
  station, // 車站名稱
  arriveTime, // 到達時間
  departTime, // 發車時間
  stay,
  isStartStation, // 始發站
  isEndStation, // 終到站
  isDepartStation, // 狀態: 始發站
  isArriveStation, // 狀態: 終到站
  beforeDepartStation, // 狀態: 發車前車站
  afterArriveStation, // 狀態: 到達後車站
}) => {
  return (
    <li>
      <div className={classnames('icon', {'icon-red': isDepartStation || isArriveStation})}>
        {isDepartStation
          ? '出'
          : isArriveStation
          ? '到'
          : leftPad(index, 2, 0)}
      </div>
      <div className={classnames('row', {grey: beforeDepartStation || afterArriveStation})}>
        <span className={classnames('station', {red: isArriveStation || isDepartStation})}>
          {station}
        </span>
        <span className={classnames('arrtime', {red: isArriveStation,})}>
          {isStartStation ? '始发站' : arriveTime}
        </span>
        <span className={classnames('deptime', {red: isDepartStation,})}>
          {isEndStation ? '终到站' : departTime}
        </span>
        <span className="stoptime">
          {isStartStation || isEndStation ? '-' : stay + '分'}
        </span>
      </div>
    </li>
  );
});

export default Schedule