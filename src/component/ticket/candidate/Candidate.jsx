import '../candidate/Candidate.css'
import { memo, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import URI from 'urijs';
import dayjs from 'dayjs';
import { useTrain } from '../trainContext';

const Candidate = ({ tickets }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const onToggle = useCallback(idx => {
    setExpandedIndex(idx === expandedIndex ? -1 : idx)},[expandedIndex]);
  return (
    <div className="candidate">
      <ul>
        {tickets.map((ticket, idx) => {
          return (
            <Seat
              idx={idx}
              onToggle={onToggle}
              expanded={expandedIndex === idx}
              {...ticket}
              key={ticket.type}
            />
          );
        })}
      </ul>
    </div>
  )
}

const Seat = memo(({
  type,
  priceMsg,
  ticketsLeft,
  channels,
  expanded,
  onToggle,
  idx,
}) => {
  return (
    <li>
      <div className="bar" onClick={() => onToggle(idx)}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>￥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? '预订' : '收起'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {channels.map(channel => {
          return (
            <Channel key={channel.name} {...channel} type={type} />
          );
        })}
      </div>
    </li>
  );
});

const Channel = memo(({ name, desc, type }) => {
  const { trainNumber, departStation, arriveStation, departDate } = useTrain();
  
  const src = useMemo(() => {
    return new URI('/order')
      .setSearch('trainNumber', trainNumber)
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', type)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString();
  }, [type, trainNumber, departStation, arriveStation, departDate]);

  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <Link 
        className="buy-wrapper"
        to={src}
      >
        <div className="buy">买票</div>
      </Link>
    </div>
  );
});

export default memo(Candidate)