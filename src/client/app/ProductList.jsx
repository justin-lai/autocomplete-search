import React, { PropTypes } from 'react';
import ProductEntry from './ProductEntry.jsx';
import Pagination from './Pagination.jsx';
import style from '../styles/ProductList.scss';

const ProductList = ({ products, entryClick, pageClick }) => (
  <div className="product-list-container">
    <ul id="product-list">
      <div id="stats" className="small">
        <h4>{`${products.nbHits} results `}<small>{`found in ${products.processingTimeMS} ms`}</small></h4>  
      </div>
      {
        products.hits.map((product, i) =>
          <ProductEntry product={product} key={i} entryClick={entryClick} />)
      }
      <div className="pagination-container">
        <Pagination
          numberOfPages={products.nbPages}
          activePage={products.page + 1}
          pageClick={pageClick}
        />
      </div>
    </ul>
  </div>
);

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  entryClick: PropTypes.func.isRequired,
  pageClick: PropTypes.func.isRequired,
};

export default ProductList;