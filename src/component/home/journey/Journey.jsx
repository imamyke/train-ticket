import './Journey.css'
import switchImg from '../../../assets/images/switch.svg'

const Journey = ({ 
  from, 
  to, 
  exchangeFromTo, 
  showCitySelector 
}) => {
  return (
    <div className="journey">
      <div
        className="journey-station"
        onClick={() => showCitySelector(true)}
      >
        <input
          className="journey-input journey-from"
          name="from"
          value={from}
          readOnly
        />
      </div>
      <div 
        className="journey-switch" 
        onClick={() => exchangeFromTo()}
      >
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div
        className="journey-station"
        onClick={() => showCitySelector(false)}
      >
        <input
          className="journey-input journey-to"
          name="to"
          value={to}
          readOnly
        />
      </div>
    </div>
  )
}

export default Journey