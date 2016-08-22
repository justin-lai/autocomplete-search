import React, { PropTypes } from 'react';
import style from '../styles/Filters.scss';

const FilterCategory = ({ categories, categoryChange, currentFilters }) => {
  // helper function that iterates over all the category checkboxes to see which ones are selected
  function getCheckedBoxes(chkboxName) {
    const checkboxes = document.getElementsByClassName(chkboxName);
    const checkboxesChecked = {};
    [].filter.call(checkboxes, checkbox => checkbox.checked)
              .forEach(checked => {
                checkboxesChecked[checked.name] = `categories:\"${checked.name}\"`;
              });
    return Object.keys(checkboxesChecked).length > 0 ? checkboxesChecked : null;
  }

  return (
    <div className="category-filter-container">
      <h4 className="category-filter-header">CATEGORY</h4>
      {
        Object.keys(categories).map((category, i) => (
          <div className="checkbox small" key={i}>
            <label htmlFor={category}>
              <input
                type="checkbox"
                className="category-checkbox"
                value=""
                name={category}
                onChange={() => {
                  categoryChange(getCheckedBoxes('category-checkbox'));
                }}
              />
              { category }
            </label>
            <span className="numHits">{categories[category]}</span>
          </div>
        ))
      }
    </div>
  );
};

FilterCategory.propTypes = {
  categories: PropTypes.object.isRequired,
  categoryChange: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired,
};

export default FilterCategory;
