import React, { PropTypes } from 'react';

require('../styles/Filters.scss');

const FilterCategory = ({ categories, onCategoryChange, currentCategories }) => {
  // helper function that iterates over all the category checkboxes
  // and returns an array of selected category names
  // also clears checkboxes so they can be correctly checked again later
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
  const filterNames = currentCategories.map(filter => filter.name);
  currentCategories.forEach(filter => {
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
    <div className="filter-container">
      <h4 className="filter-header">CATEGORY</h4>
      {
        Object.keys(newCategories)
          .sort((a, b) => newCategories[b] - newCategories[a])
          .map((category, i) => (
            <div className="checkbox-row row small" key={i}>
              <label htmlFor={category} className="col-xs-14 col-md-10">
                <input
                  type="checkbox"
                  className="category-checkbox"
                  value={categories[category]}
                  name={category}
                  id={category}
                  checked={filterNames.indexOf(category) !== -1}
                  onChange={() => {
                    onCategoryChange(getCheckedBoxes('category-checkbox'));
                  }}
                />
                { category }
              </label>
              <span className="numHits col-xs-4 col-md-2">{categories[category]}</span>
            </div>
          ))
      }
    </div>
  );
};

FilterCategory.propTypes = {
  categories: PropTypes.object.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  currentCategories: PropTypes.array.isRequired,
};

export default FilterCategory;
