import React, { PropTypes } from 'react';

require('../styles/Filters.scss');

const FilterType = ({ types, typeToggle, currentType }) => {
  let content;
  if (!currentType) {
    content = Object.keys(types)
                .map((type, i) => (
                  <li className="type-list-item" key={i} onClick={() => { typeToggle(type); }}>
                    { type }
                    <span className="numHits">{types[type]}</span>
                  </li>
                ));
  } else {
    content = (
      <li className="type-list-item" onClick={() => { typeToggle(currentType); }}>
        { currentType }
        <span className="numHits">{types[currentType]}</span>
      </li>

    );
  }

  return (
    <div className="filter-container">
      <h4 className="filter-header">TYPE</h4>
      <ul className="type-filter-list">
        { content }
      </ul>
    </div>
  );
};

FilterType.propTypes = {
  types: PropTypes.object.isRequired,
  typeToggle: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
};

export default FilterType;
