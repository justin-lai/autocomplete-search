import React, { PropTypes } from 'react';
import ProductEntry from './ProductEntry.jsx';

const ProductList = ({ products, handleClickEntry }) => (
  <ul id="product-list">
    {
      products.map((product, i) =>
        <ProductEntry product={product} key={i} handleClickEntry={handleClickEntry} />)
    }
  </ul>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  handleClickEntry: PropTypes.func.isRequired,
};

export default ProductList;