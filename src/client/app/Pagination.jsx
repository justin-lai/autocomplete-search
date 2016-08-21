import React, { PropTypes } from 'react';
import style from '../styles/Pagination.scss';

const Pagination = ({ numberOfPages, activePage, pageClick }) => {
  const pageButtons = [];
  const startPage = activePage - 5 < 1 ? 1 : activePage - 5;
  const endPage = startPage + 9 > numberOfPages ? numberOfPages : startPage + 9;
  let previous = null;
  let next = null;
  if (activePage - 1 > 0) {
    previous = (
      <li className="page-button previous-page">
        <a href="#" onClick={() => pageClick(activePage - 1)}>
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
    );
  }
  if (activePage + 1 <= numberOfPages) {
    next = (
      <li className="page-button next-page">
        <a href="#" onClick={() => pageClick(activePage + 1)}>
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <li className={i === activePage ? 'page-button active' : 'page-button'} key={i}>
        <a href="#" onClick={() => pageClick(i)}>{i}</a>
      </li>
    );
  }

  return (
    <ul className="pagination">
      {previous}
      {pageButtons}
      {next}
    </ul>
  );
};

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  pageClick: PropTypes.func.isRequired,
};

export default Pagination;
