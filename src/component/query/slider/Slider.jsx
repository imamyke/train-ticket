import '../slider/Slider.css'
import leftPad from 'left-pad';
import useWinSize from '../../common/utils/useWinSize';
import { memo, useState, useMemo, useRef, useEffect } from 'react';

const Slider = ({
  title,
  currentStartHours,
  currentEndHours,
  onStartChanged,
  onEndChanged,
}) => {
  const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);
  
  const startPercent = useMemo(() => {
    if (start > 100) return 100
    if (start < 0) return 0;
    return start;
  }, [start]);
  const endPercent = useMemo(() => {
    if (end > 100) return 100
    if (end < 0) return 0;
    return end;
  }, [end]);

  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100);
  }, [startPercent]);
  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100);
  }, [endPercent]);

  const startText = useMemo(() => {
    return leftPad(startHours, 2, '0') + ':00';
  }, [startHours]);
  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00';
  }, [endHours]);


  // react DOM
  const startRef = useRef();
  const endRef = useRef();
  const lastStartX = useRef(); // 計算 start 最後的位置
  const lastEndX = useRef();  // 計算 end 最後的位置

  const range = useRef();
  const rangeWidth = useRef();


  // currentStartHours, currentEndHours 改變要重渲染 => props改變而重渲染
  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100);
    prevCurrentStartHours.current = currentStartHours;
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100);
    prevCurrentEndHours.current = currentEndHours;
  }
  
  const onStartTouchBegin = (e) => {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }

  const onEndTouchBegin = (e) => {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }

  const onStartTouchMove = (e) => {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX; // 更新最後滑動的位置

    setStart(start => start + (distance / rangeWidth.current) * 100);
  }

  const onEndTouchMove = (e) => {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX; // 更新最後滑動的位置
    setEnd(end => end + (distance / rangeWidth.current) * 100);
  }

  const winSize = useWinSize(); // 計算不同瀏覽器尺寸
  useEffect(() => { // 測量 slider 可滑動的距離
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize.width]);


  useEffect(() => {
    startRef.current?.addEventListener(
      'touchstart',
      onStartTouchBegin,
      false
    );
    startRef.current?.addEventListener(
      'touchmove',
      onStartTouchMove,
      false
    );
    endRef.current?.addEventListener(
      'touchstart',
      onEndTouchBegin,
      false
    );
    endRef.current?.addEventListener('touchmove', onEndTouchMove, false);

    return () => {
      startRef.current?.removeEventListener(
        'touchstart',
        onStartTouchBegin,
        false
      );
      startRef.current?.removeEventListener(
        'touchmove',
        onStartTouchMove,
        false
      );
      endRef.current?.removeEventListener(
        'touchstart',
        onEndTouchBegin,
        false
      );
      endRef.current?.removeEventListener(
        'touchmove',
        onEndTouchMove,
        false
      );
    };
  });

  useEffect(() => {
    onStartChanged(startHours); // 上拋給 Bottom 組件更新
  }, [startHours, onStartChanged]);

  useEffect(() => {
    onEndChanged(endHours); // 上拋給 Bottom 組件更新
  }, [endHours, onEndChanged]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div 
          className="slider" 
          ref={range}
        >
          <div
            className="slider-range"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%',
            }}
          ></div>
          <i
            ref={startRef}
            className="slider-handle"
            style={{ left: startPercent + '%' }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endRef}
            className="slider-handle"
            style={{ left: endPercent + '%' }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  )
}

export default memo(Slider)