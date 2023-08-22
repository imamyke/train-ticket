import '../slider/Slider.css'
import { memo, useState, useMemo, useRef, useEffect } from 'react';

const Slider = ({
  title,
  currentStartHours,
  currentEndHours,
  onStartChanged,
  onEndChanged,
}) => {
  return (
    <div className="option">
      <h3>{title}</h3>
      {/* <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%',
            }}
          ></div>
          <i
            ref={startHandle}
            className="slider-handle"
            style={{
              left: startPercent + '%',
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
              left: endPercent + '%',
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div> */}
    </div>
  )
}

export default Slider