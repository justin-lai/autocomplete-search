import React, { PropTypes } from 'react';
import style from '../styles/Filters.scss';

const FilterCategory = ({ categories, categoryChange, currentFilters }) => {
  // helper function that iterates over all the category checkboxes
  // and returns an array of selected category names
  function getCheckedBoxes(chkboxName) {
    const checkboxes = document.getElementsByClassName(chkboxName);
    const checkboxesChecked = [].filter.call(checkboxes, checkbox => checkbox.checked)
                                .map(checkbox => ({ name: checkbox.name, hits: checkbox.value }));
    [].forEach.call(checkboxes, checkbox => {
      checkbox.checked = false;
    });
    return checkboxesChecked;
  }

  // add current filters to updated category view
  // add additional categories from recent search up to a total max of 10
  const newCategories = {};
  const filterNames = currentFilters.map(filter => filter.name);
  currentFilters.forEach(filter => {
    newCategories[filter.name] = filter.hits;
  });

  for (const name in categories) {
    if (Object.keys(newCategories).length <= 10) {
      newCategories[name] = categories[name];
    } else {
      break;
    }
  }

  return (
    <div className="category-filter-container">
      <h4 className="category-filter-header">CATEGORY</h4>
      {
        Object.keys(newCategories)
          .sort((a, b) => newCategories[b] - newCategories[a])
          .map((category, i) => (
            <div className="checkbox small" key={i}>
              <label htmlFor={category}>
                <input
                  type="checkbox"
                  className="category-checkbox"
                  value={categories[category]}
                  name={category}
                  checked={filterNames.indexOf(category) !== -1}
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
  currentFilters: PropTypes.array.isRequired,
};

export default FilterCategory;
