/* eslint no-underscore-dangle: ["error", { "allow": ["_highlightResult"] }] */

import React, { PropTypes } from 'react';
import style from '../styles/ProductEntry.scss';

const ProductEntry = ({ product, entryClick }) => (
  <li className="product-entry row" onClick={() => { entryClick(product); }} >
    <div className="entry-content-container col-xs-12 col-md-8">
      <p className="product-entry-name">
        <strong dangerouslySetInnerHTML={{ __html: product._highlightResult.name.value }} />
      </p>
      <p
        className="product-entry-description small"
        dangerouslySetInnerHTML={{ __html: product._highlightResult.description.value }}
      />
    </div>
    <div className="col-xs-12 col-md-4">
      <img alt={product.name} className="product-entry-photo" src={product.image} />
    </div>
  </li>
);

ProductEntry.propTypes = {
  product: PropTypes.object.isRequired,
  entryClick: PropTypes.func.isRequired,
};

export default ProductEntry;
