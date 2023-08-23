import '../menu/Menu.css'
import classnames from 'classnames';
import { memo } from 'react';

const Menu = ({ show, options, onPress, hideMenu }) => {
  return (
    <div>
      {show && (<div className="menu-mask" onClick={() => hideMenu()}></div>)}
      <div className={classnames('menu', { show })}>
        <div className="menu-title"></div>
        <ul>
          {options && options.map(option => 
          (
            <MenuItem
              key={option.value}
              {...option}
              onPress={onPress}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const MenuItem = memo(({ 
  onPress, 
  title, 
  value, 
  active 
}) => {
  return (
    <li
      className={classnames({ active })}
      onClick={() => { onPress(value) }}
    >
      {title}
    </li>
  );
});

export default Menu