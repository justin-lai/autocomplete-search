import React, { PropTypes } from 'react';
import Slider from 'rc-slider';

require('../styles/rc-slider-default.css');
require('../styles/Filters.scss');

const PriceSlider = ({ min, max, currentPriceRange, onPriceChange }) => {
  const marks = {};
  marks[min] = {
    style: { color: '#777' },
    label: `$${min.toFixed(2)}`,
  };
  marks[max] = {
    style: { color: '#777' },
    label: `$${max.toFixed(2)}`,
  };
  const defaults = [Math.max(currentPriceRange[0], min), Math.min(currentPriceRange[1], max)];

  console.log(min, defaults[0], defaults[1], max);


  return (
    <div className="filter-container">
      <h4 className="filter-header">
        PRICE
        <small className="filter-subheader">
          {`show results for $${defaults[0]} - $${defaults[1]}`}
        </small>
      </h4>
      <div>
        <Slider
          className="price-slider"
          range
          defaultValue={defaults}
          min={min}
          max={max}
          marks={marks}
          onChange={onPriceChange}
          pushable={1}
        />
      </div>
    </div>
  );
};

PriceSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  currentPriceRange: PropTypes.array.isRequired,
  onPriceChange: PropTypes.func.isRequired,
};

export default PriceSlider;
