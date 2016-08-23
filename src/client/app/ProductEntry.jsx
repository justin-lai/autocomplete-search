/* eslint no-underscore-dangle: ["error", { "allow": ["_highlightResult"] }] */

import React, { PropTypes } from 'react';

require('../styles/ProductEntry.scss');

const ProductEntry = ({ product }) => (
  <li className="product-entry row">
    <div className="col-xs-6 col-md-4">
      <img alt={product.name} className="product-entry-photo" src={product.image} />
    </div>
    <div className="entry-content-container col-xs-9 col-md-6">
      <p className="product-entry-name">
        <strong dangerouslySetInnerHTML={{ __html: product._highlightResult.name.value }} />
      </p>
      <p
        className="product-entry-description small"
        dangerouslySetInnerHTML={{ __html: product._highlightResult.description.value }}
      />
    </div>
    <div className="col-xs-3 col-md-2">
      <p className="product-entry-price">{`$${product.price.toFixed(2)}`}</p>
    </div>
  </li>
);

ProductEntry.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductEntry;
