import '../submit/Submit.css'
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'

const Submit = () => {
  const navigate = useNavigate()

  return (
    <div 
      className="submit"
      onClick={() => navigate('/query')}
    >
      <button type="submit" className="submit-button">
        {' '}
        搜索{' '}
      </button>
    </div>
);
}

export default memo(Submit)