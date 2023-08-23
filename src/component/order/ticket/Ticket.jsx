import { memo } from 'react'
import '../ticket/Ticket.css'

const Ticket = ({ price, type }) => {
  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{type}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  )
}

export default memo(Ticket)