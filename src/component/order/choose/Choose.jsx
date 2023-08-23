import '../choose/Choose.css'
import classnames from 'classnames';
import { memo } from 'react'

const Choose = ({ passengers, updatePassenger }) => {
  const createSeat = (seatType) => {
    return (
      <div>
        {passengers.map(passenger => (
          <p
          key={passenger.id}
          className={classnames('seat', { active: passenger.seat === seatType })}
          data-text={seatType}
          onClick={() => updatePassenger(passenger.id, { seat: seatType })}
          >
            &#xe02d;</p>
        ))}
      </div>
    );
  }
  return (
    <div className="choose">
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {createSeat('C')}
          <div>过道</div>
          {createSeat('D')}
          {createSeat('F')}
          <div>窗</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Choose)