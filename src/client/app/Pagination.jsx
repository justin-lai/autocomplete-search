import React, { PropTypes } from 'react';

const Pagination = ({ numberOfPages, activePage, pageClick }) => {
  const pageButtons = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageButtons.push(
      <li className={i === activePage ? 'active' : null} key={i}>
        <a href="#" onClick={() => pageClick(i)}>{i}</a>
      </li>
    );
  }

  return (
    <ul className="pagination">
      {pageButtons}
    </ul>
  );
};

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  pageClick: PropTypes.func.isRequired,
};

export default Pagination;
