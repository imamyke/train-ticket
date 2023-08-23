import { memo, useMemo } from 'react'
import '../passengers/Passengers.css'

const Passengers = ({
  passengers,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
}) => {
  const nameMap = useMemo(() => {
    const ret = {};

    for (const passenger of passengers) {
      ret[passenger.id] = passenger.name;
    }
    return ret;
  }, [passengers]);
  return (
    <div className="passengers">
      <ul>
        {passengers.map(passenger => {
          return (
            <Passenger
              // passenger info
              {...passenger}
              followAdultName={nameMap[passenger.followAdult]}
              // 操作
              onRemove={removePassenger}
              onUpdate={updatePassenger}
              showGenderMenu={showGenderMenu}
              showFollowAdultMenu={showFollowAdultMenu}
              showTicketTypeMenu={showTicketTypeMenu}
              key={passenger.id}
            />
          );
        })}
      </ul>
      <section className="add">
        <div className="adult" onClick={() => createAdult()}>
          添加成人
        </div>
        <div className="child" onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
    </div>
  )
}

const Passenger = memo(({
  // passenger
  id,
  name,
  ticketType,
  licenceNo,
  gender,
  birthday,
  followAdultName,
  // 操作
  onRemove,
  onUpdate,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
}) => {
  const isAdult = ticketType === 'adult';

  return (
    <li className="passenger">
      <i className="delete" onClick={() => onRemove(id)}>
        —
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={e => onUpdate(id, { name: e.target.value })}
          />
          <label
            className="ticket-type"
            onClick={() => showTicketTypeMenu(id)}
          >
            {isAdult ? '成人票' : '儿童票'}
          </label>
        </li>
        {isAdult && (
          <li className="item">
            <label className="label licenceNo">身份证</label>
            <input
              type="text"
              className="input licenceNo"
              placeholder="证件号码"
              value={licenceNo}
              onChange={e => onUpdate(id, { licenceNo: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label gender">性别</label>
            <input
              type="text"
              className="input gender"
              placeholder="请选择"
              onClick={() => showGenderMenu(id)}
              value={
                gender === 'male'
                ? '男'
                : gender === 'female'
                ? '女'
                : ''
              }
              readOnly
            />
          </li>
        )}
        {!isAdult && (
          <li className="item">
            <label className="label birthday">出生日期</label>
            <input
              type="text"
              className="input birthday"
              placeholder="如 19951015"
              value={birthday}
              onChange={e => onUpdate(id, { birthday: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label followAdult">同行成人</label>
            <input
              type="text"
              className="input followAdult"
              placeholder="请选择"
              value={followAdultName}
              onClick={() => showFollowAdultMenu(id)}
              readOnly
            />
          </li>
        )}
      </ol>
    </li>
  )
})

export default memo(Passengers)
