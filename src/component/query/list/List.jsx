import '../list/List.css'
import { memo, useMemo } from 'react';

const List = () => {
  return (
    <div>List</div>
  )
}

const ListItem = ({
  dTime,
  aTime,
  dStation,
  aStation,
  trainNumber,
  date,
  time,
  priceMsg,
  dayAfter,
}) => {
  return (
    <li className="list-item">
      {/* <a href={url}>
        <span className="item-time">
          <em>{dTime}</em>
          <br />
          <em className="em-light">
            {aTime} <i className="time-after">{dayAfter}</i>
          </em>
        </span>
        <span className="item-stations">
          <em>
            <i className="train-station train-start">始</i>
            {dStation}
          </em>
          <br />
          <em className="em-light">
            <i className="train-station train-end">终</i>
            {aStation}
          </em>
        </span>
        <span className="item-train">
          <em>{trainNumber}</em>
          <br />
          <em className="em-light">{time}</em>
        </span>
        <span className="item-ticket">
          <em>{priceMsg}</em>
          <br />
          <em className="em-light-orange">可抢票</em>
        </span>
      </a> */}
    </li>
  );
}

export default List