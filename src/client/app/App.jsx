/* global autocomplete */
/* eslint no-underscore-dangle: ["error", { "allow": ["_highlightResult"] }] */

import React from 'react';
import bindAll from 'lodash.bindall';
import style from '../styles/App.scss';
import index from '../config/config.js';
import SearchBox from './SearchBox.jsx';
import ProductList from './ProductList.jsx';
import FilterCategory from './FilterCategory.jsx';
import FilterBrand from './FilterBrand.jsx';
import FilterType from './FilterType.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      page: 1,
      categoryFilter: [],
      brandFilter: [],
      typeFilter: '',
      facets: [],
    };
    bindAll(this,
      'instantSearch',
      'pageClick',
      'categoryChange',
      'brandChange',
      'typeToggle'
    );
  }

  componentDidMount() {
    autocomplete('#search-input', { hint: false }, [
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'name',
        templates: {
          suggestion: suggestion => suggestion._highlightResult.name.value,
        },
      },
    ]).on('autocomplete:selected', (event, suggestion, dataset) => {
      console.log(suggestion, dataset);
    });
  }

  instantSearch(query, callback) {
    const filters = [];
    if (this.state.categoryFilter.length > 0) {
      filters.push(this.state.categoryFilter
                    .map(category => `categories:\"${category.name}\"`)
                    .join(' OR '));
    }
    if (this.state.brandFilter.length > 0) {
      filters.push(this.state.brandFilter
                    .map(brand => `brand:\"${brand.name}\"`)
                    .join(' OR '));
    }
    if (this.state.typeFilter) {
      filters.push(`type:\"${this.state.typeFilter}\"`);
    }
    const filterString = filters.length > 0 ? filters.join(' AND ') : '';

    const options = {
      page: this.state.page - 1,
      facets: '*',
      filters: filterString,
    };

    if (callback) {
      index.search(query, options, callback);
    } else {
      // default callback if not provided (occurs when typing through searchbox)
      index.search(query, options, (err, content) => {
        console.log(content);
        this.setState({
          query,
          results: content,
          page: 1,
          facets: content.facets,
          categoryFilter: [],
          brandFilter: [],
          typeFilter: '',
        });
      });
    }
  }

  pageClick(page) {
    this.setState({ page }, () => {
      this.instantSearch(this.state.query, (err, content) => {
        this.setState({
          results: content,
          page: 1, // reset page for next search
        });
      });
    });
  }

  categoryChange(checkedBoxes) {
    this.setState({ categoryFilter: checkedBoxes }, () => {
      this.instantSearch(this.state.query, (err, content) => {
        this.setState({
          results: content,
        });
      });
    });
  }

  brandChange(checkedBoxes) {
    this.setState({ brandFilter: checkedBoxes }, () => {
      this.instantSearch(this.state.query, (err, content) => {
        this.setState({
          results: content,
        });
      });
    });
  }

  typeToggle(type) {
    const typeFilter = this.state.typeFilter ? '' : type;

    this.setState({ typeFilter }, () => {
      this.instantSearch(this.state.query, (err, content) => {
        this.setState({
          results: content,
          facets: content.facets,
          page: 1,
          categoryFilter: [],
          brandFilter: [],
        });
      });
    });
  }

  render() {
    let content;
    let filters;
    if (this.state.results.nbHits > 0 && this.state.query !== '') {
      content = (
        <ProductList
          products={this.state.results}
          pageClick={this.pageClick}
        />
      );
      filters = (
        <div className="filter-container">
          <FilterType
            types={this.state.facets.type}
            typeToggle={this.typeToggle}
            currentType={this.state.typeFilter}
          />
          <FilterCategory
            categories={this.state.facets.categories}
            categoryChange={this.categoryChange}
            currentFilters={this.state.categoryFilter}
          />
          <FilterBrand
            brands={this.state.facets.brand}
            brandChange={this.brandChange}
            currentFilters={this.state.brandFilter}
          />
        </div>
      );
    } else if (this.state.query !== '') {
      content = <p>No results found</p>;
    }

    return (
      <section className="container">
        <div className="row">
          <div id="search-fields" className="col-xs-4 col-md-4">
            <h1 id="search-header">ALGOLIA SEARCH</h1>
            <SearchBox instantSearch={this.instantSearch} />
            { filters }
          </div>
          <div id="search-results" className="col-xs-8 col-md-8">
            { content }
          </div>
        </div>
      </section>
    );
  }
}

export default App;
