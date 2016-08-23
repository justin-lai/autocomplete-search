import React, { PropTypes } from 'react';

require('../styles/Pagination.scss');

const Pagination = ({ numberOfPages, activePage, onPageClick }) => {
  const pageButtons = [];
  const startPage = activePage - 3 < 1 ? 1 : activePage - 3;
  const endPage = startPage + 6 > numberOfPages ? numberOfPages : startPage + 6;
  let [first, previous, next, last] = [null, null, null, null];

  if (activePage - 1 > 0) {
    first = (
      <li className="page-button first-page">
        <a href="#" onClick={() => onPageClick(1)}>
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">First</span>
        </a>
      </li>
    );
    previous = (
      <li className="page-button previous-page">
        <a href="#" onClick={() => onPageClick(activePage - 1)}>
          <span aria-hidden="true">&lsaquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
    );
  }
  if (activePage + 1 <= numberOfPages) {
    next = (
      <li className="page-button next-page">
        <a href="#" onClick={() => onPageClick(activePage + 1)}>
          <span aria-hidden="true">&rsaquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    );
    last = (
      <li className="page-button last-page">
        <a href="#" onClick={() => onPageClick(numberOfPages)}>
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Last</span>
        </a>
      </li>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <li className={i === activePage ? 'page-button active' : 'page-button'} key={i}>
        <a href="#" onClick={() => onPageClick(i)}>{i}</a>
      </li>
    );
  }

  return (
    <ul className="pagination">
      {first}
      {previous}
      {pageButtons}
      {next}
      {last}
    </ul>
  );
};

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

export default Pagination;
