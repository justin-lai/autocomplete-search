import React, { PropTypes } from 'react';
import ProductEntry from './ProductEntry.jsx';
import Pagination from './Pagination.jsx';
import style from '../styles/ProductList.scss';

const ProductList = ({ products, entryClick, pageClick }) => (
  <div className="product-list-container">
    <div id="results">
      <strong>{`${products.nbHits} results `}</strong>{`found in ${products.processingTimeMS} ms`}  
    </div>
    <Pagination
      numberOfPages={products.nbPages}
      activePage={products.page + 1}
      pageClick={pageClick}
    />
    <ul id="product-list">
      {
        products.hits.map((product, i) =>
          <ProductEntry product={product} key={i} entryClick={entryClick} />)
      }
    </ul>
  </div>
);

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  entryClick: PropTypes.func.isRequired,
  pageClick: PropTypes.func.isRequired,
};

export default ProductList;