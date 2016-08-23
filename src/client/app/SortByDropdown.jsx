import React, { PropTypes } from 'react';
import { INDEX_RELEVANCE, INDEX_PRICE_ASC, INDEX_PRICE_DESC } from '../config/config.js';

require('../styles/SortByDropdown.scss');

const SortByDropdown = ({ onSortByChange }) => {
  function handleChange(e) {
    const sortBy = e.target.value;
    if (sortBy === 'relevance') {
      onSortByChange(INDEX_RELEVANCE);
    } else if (sortBy === 'price(asc)') {
      onSortByChange(INDEX_PRICE_ASC);
    } else if (sortBy === 'price(desc)') {
      onSortByChange(INDEX_PRICE_DESC);
    }
  }

  return (
    <div className="sortby-container form-group">
      <select className="sortby-dropdown form-control" onChange={handleChange}>
        <option value="relevance">Relevance</option>
        <option value="price(asc)">Lowest Price</option>
        <option value="price(desc)">Highest Price</option>
      </select>
    </div>
  );
};

SortByDropdown.propTypes = {
  onSortByChange: PropTypes.func.isRequired,
};

export default SortByDropdown;
