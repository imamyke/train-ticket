import { useMemo, memo } from 'react';
import '../nav/Nav.css'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import classnames from 'classnames';

const Nav = ({ 
  date, 
  prev, 
  next, 
  isPrevDisabled, 
  isNextDisabled 
}) => {
  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format('M月D日 ') + d.locale('zh-cn').format('ddd');
  }, [date]);

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classnames('nav-prev', {'nav-disabled': isPrevDisabled})}
      >
        前一天
      </span>
      <span className="nav-current">{currentString}</span>
      <span
        onClick={next}
        className={classnames('nav-next', {'nav-disabled': isNextDisabled})}
      >
        后一天
      </span>
  </div>
  )
}

export default memo(Nav)
