import React, { PropTypes } from 'react';
import ProductEntry from './ProductEntry.jsx';
import Pagination from './Pagination.jsx';
import SortByDropdown from './SortByDropdown.jsx';

require('../styles/ProductList.scss');

const ProductList = ({ products, onPageClick, onSortByChange }) => (
  <div className="product-list-container">
    <ul id="product-list">
      <div className="product-list-header row">
        <div id="stats" className="small col-xs-12 col-md-8">
          <h4>{`${products.nbHits} results `}
            <small>{`found in ${products.processingTimeMS} ms`}</small>
          </h4>
        </div>
        <div className="col-xs-6 col-md-4">
          <SortByDropdown onSortByChange={onSortByChange} />
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          numberOfPages={products.nbPages}
          activePage={products.page + 1}
          onPageClick={onPageClick}
        />
      </div>
      {
        products.hits.map((product, i) =>
          <ProductEntry product={product} key={i} />)
      }
      <div className="pagination-container">
        <Pagination
          numberOfPages={products.nbPages}
          activePage={products.page + 1}
          onPageClick={onPageClick}
        />
      </div>
    </ul>
  </div>
);

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onSortByChange: PropTypes.func.isRequired,
};

export default ProductList;
