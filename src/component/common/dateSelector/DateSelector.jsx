import './DateSelector.css'
import classnames from 'classnames';
import { h0 } from '../../common/utils/fp';
import { Header } from '../../common/index'

const DateSelector = ({ show, onSelect, onBack }) => {
  const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);
    
    const monthSequence = [now.getTime()];
    for (let month = 1; month < 13; month++) {
      now.setMonth(now.getMonth() + 1);
      monthSequence.push(now.getTime());
    }

    return (
      <div className={classnames('date-selector', { hidden: !show })}>
        <Header title="日期选择" onBack={onBack} />
        <div className="date-selector-tables">
          {monthSequence.map((month, idx) => {
            return (
              <Month
                key={idx}
                startingTimeInMonth={month}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </div>
    );
}

const Day = ({ day, onSelect }) => {
  if (!day) { // 非本月份天
    return <td className="null"></td>;
  }
  
  const classes = [];
  const now = h0();
  if (day < now) { // 日期小於今天
    classes.push('disabled');
  }
  if ([6, 0].includes(new Date(day).getDay())) { // 日期為六、日
    classes.push('weekend');
  }

  const dateString = now === day ? '今天' : new Date(day).getDate(); // 日期為今天
  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  );
}

const Week = ({ days, onSelect }) => {
  return (
    <tr className="date-table-days">
      {days.map((day, idx) => {
        return <Day key={idx} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}

const Month = ({ startingTimeInMonth, onSelect }) => {
  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];
  while (currentDay.getMonth() === startDay.getMonth()) { // 當日期不等於本月即停止循環
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // 補齊月份前面幾天的空白天數
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days);
  // 補齊月份後面幾天的空白天數
  const lastDay = new Date(days[days.length - 1]);
  days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null));

  // 將天數轉成週數
  const weeks = [];
  for (let row = 0; row < days.length / 7; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}
              月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map((week, idx) => {
          return <Week key={idx} days={week} onSelect={onSelect} />;
        })}
      </tbody>
    </table>
  );
}

export default DateSelector