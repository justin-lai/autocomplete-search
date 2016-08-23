import React, { PropTypes } from 'react';

require('../styles/Filters.scss');

const FilterBrand = ({ brands, onBrandChange, currentBrand }) => {
  // helper function that iterates over all the brand checkboxes
  // and returns an array of selected brand names
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

  // add current filters to updated brand view
  // add additional brands from recent search up to a total max of 10
  const newBrands = {};
  const filterNames = currentBrand.map(filter => filter.name);
  currentBrand.forEach(filter => {
    newBrands[filter.name] = filter.hits;
  });

  for (const name in brands) {
    if (Object.keys(newBrands).length <= 10) {
      newBrands[name] = brands[name];
    } else {
      break;
    }
  }

  return (
    <div className="filter-container">
      <h4 className="filter-header">BRAND</h4>
      {
        Object.keys(newBrands)
          .sort((a, b) => newBrands[b] - newBrands[a])
          .map((brand, i) => (
            <div className="checkbox-row row small" key={i}>
              <label htmlFor={brand} className="col-xs-14 col-md-10">
                <input
                  type="checkbox"
                  className="brand-checkbox"
                  value={brands[brand]}
                  name={brand}
                  id={brand}
                  checked={filterNames.indexOf(brand) !== -1}
                  onChange={() => {
                    onBrandChange(getCheckedBoxes('brand-checkbox'));
                  }}
                />
                { brand }
              </label>
              <span className="numHits col-xs-4 col-md-2">{brands[brand]}</span>
            </div>
          ))
      }
    </div>
  );
};

FilterBrand.propTypes = {
  brands: PropTypes.object.isRequired,
  onBrandChange: PropTypes.func.isRequired,
  currentBrand: PropTypes.array.isRequired,
};

export default FilterBrand;
