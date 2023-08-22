import './DepartDate.css';
import { useMemo } from 'react';
import { h0 } from '../../common/utils/fp';
import dayjs from 'dayjs';

const DepartDate = ({ time, onClick }) => {
  const h0OfDepart = h0(time); // 時間戳
  const departDate = new Date(h0OfDepart); // 國際時間
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format('YYYY-MM-DD'); // 轉換 format
  }, [h0OfDepart]);

  const isToday = h0OfDepart === h0();

  const weekString =
  '周' +
  ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
  (isToday ? '(今天)' : '');

  return (
    <div 
      className="depart-date" 
      onClick={onClick}
    >
      <input 
        type="hidden" 
        name="date" 
        value={departDateString} 
      />
      {departDateString} <span className="depart-week">{weekString}</span>
    </div>
  );
}

export default DepartDate