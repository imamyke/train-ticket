import '../nav/Nav.css'
import dayjs from 'dayjs';
import classnames from 'classnames';
import useNav from '../../common/utils/useNav';
import { useMemo, memo } from 'react';

const Nav = ({ 
  date, 
  prev, 
  next, 
  isPrevDisabled, 
  isNextDisabled 
}) => {
  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classnames('nav-prev', {'nav-disabled': isPrevDisabled})}
      >
        前一天
      </span>
      {/* <span className="nav-current">{currentString}</span> */}
      <span
        onClick={next}
        className={classnames('nav-next', {'nav-disabled': isNextDisabled})}
      >
        后一天
      </span>
  </div>
  )
}

export default Nav
