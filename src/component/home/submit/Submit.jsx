import '../submit/Submit.css'
import dayjs from 'dayjs';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'

const Submit = ({ from, to, time, highSpeed }) => {
  const navigate = useNavigate()
  const date = dayjs(time).format('YYYY-MM-DD')
  return (
    <div 
      className="submit"
      onClick={() => navigate(`/query?from=${from}&to=${to}&date=${date}&highSpeed=${highSpeed}`)}
    >
      <button type="submit" className="submit-button">
        {' '}
        搜索{' '}
      </button>
    </div>
);
}

export default memo(Submit)