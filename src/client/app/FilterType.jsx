import React, { PropTypes } from 'react';

require('../styles/Filters.scss');

const FilterType = ({ types, onTypeToggle, currentType }) => {
  let content;
  if (!currentType) {
    content = Object.keys(types)
                .map((type, i) => (
                  <div key={i}>
                    <li
                      className="type-list-item col-xs-14 col-md-10"
                      onClick={() => { onTypeToggle(type); }}
                    >
                      { type }
                    </li>
                    <span className="numHits small col-xs-4 col-md-2">{types[type]}</span>
                  </div>
                ));
  } else {
    content = (
      <div>
        <li
          className="type-list-item strikeout col-xs-14 col-md-10"
          onClick={() => { onTypeToggle(currentType); }}
        >
          { currentType }
        </li>
        <span className="numHits small col-xs-4 col-md-2">{types[currentType]}</span>
      </div>
    );
  }

  return (
    <div className="filter-container">
      <h4 className="filter-header">TYPE</h4>
      <ul className="type-filter-list row">
        { content }
      </ul>
    </div>
  );
};

FilterType.propTypes = {
  types: PropTypes.object.isRequired,
  onTypeToggle: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
};

export default FilterType;
