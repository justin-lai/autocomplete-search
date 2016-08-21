import React, { PropTypes } from 'react';

const ProductEntry = (props) => {
  const product = props.product;

  return (
    <li className="product-entry row" onClick={() => { props.handleClickEntry(props.product); }} >
      <div className="entry-content-container col-xs-12 col-md-8">
        <p className="product-entry-name"><strong>{ product.name }</strong></p>
        <p className="product-entry-description small">{ product.description }</p>
      </div>
      <div className="col-xs-12 col-md-4">
        <img alt={product.name} className="product-entry-photo" src={product.image} />
      </div>
    </li>
  );
};

ProductEntry.propTypes = {
  product: PropTypes.object.isRequired,
  handleClickEntry: PropTypes.func.isRequired,
};

export default ProductEntry;
