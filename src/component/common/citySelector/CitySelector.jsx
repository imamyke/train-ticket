import '../citySelector/CitySelector.css'
import axios from 'axios'
import classnames from 'classnames'
import { useCallback, useMemo, useState, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CityItem = memo(({ name, onSelect }) => {
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
})
const CitySection = memo(({title, cities = [], onSelect}) => {
  return (
    <ul className="city-ul" data-cate={title}>
      <li className="city-li" key="title">
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem
            key={city.name}
            name={city.name}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
})

const AlphaIndex = ({ alpha, onClick }) => {
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
}

const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

const CityList = memo(({ sections, onSelect, toAlpha }) => {
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
          return (
            <AlphaIndex
              key={alpha}
              alpha={alpha}
              onClick={toAlpha}
            />
          );
        })}
      </div>
    </div>
  );
})

const SuggestItem = memo(({ name, onClick }) => {
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
})

const Suggest = memo(function Suggest({ keyword, onSelect }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('/rest/search?key=' + encodeURIComponent(keyword))
      .then(res => {
        const { result, searchKey: sKey } = res.data;
        sKey === keyword && setResult(result)
      });
  }, [keyword]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ display: keyword }];
    }
    return result;
  }, [result, keyword]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
});


const outputCitySections = (isLoading, cityData, onSelect, toAlpha) => {
  if (isLoading) {
    return <div>loading</div>;
  }
  if (cityData) {
    return (
      <CityList
        sections={cityData.cityList}
        onSelect={onSelect}
        toAlpha={toAlpha}
      />
    );
  }
  return <div>error</div>;
};

const CitySelector = ({
  show,
  cityData,
  isLoading,
  onBack,
  getCityData,
  onSelect,
}) => {
  const [keyword, setKeyword] = useState('')
  const searchKeyword = useMemo(() => keyword.trim(), [keyword])
  const toAlpha = useCallback((alpha) => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
}, [])
  useEffect(() => {
    if (!show || cityData || isLoading) return
    getCityData()
  }, [show, cityData, isLoading, getCityData])
  
  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={keyword}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setKeyword(e.target.value)}
          />
        </div>
        <i
          onClick={() => setKeyword('')}
          className={classnames('search-clean', {
            hidden: searchKeyword.length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(keyword) && (
        <Suggest keyword={keyword} onSelect={key => onSelect(key)} />
      )}
      {outputCitySections(isLoading, cityData, onSelect, toAlpha )}
    </div>
  )
}

export default memo(CitySelector)