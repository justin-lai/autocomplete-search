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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      page: 1,
      categoryFilter: [],
      brandFilter: [],
    };
    bindAll(this,
      'instantSearch',
      'entryClick',
      'pageClick',
      'categoryChange',
      'brandChange'
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

  instantSearch(query) {
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
    const filterString = filters.length > 0 ? filters.join(' AND ') : '';
    
    const options = {
      page: this.state.page - 1,
      facets: '*',
      filters: filterString,
      // attributesToSnippet: ['name:5', 'description:15'],
    };

    index.search(query, options, (err, content) => {
      console.log(content);
      this.setState({
        query,
        results: content,
        page: 1,
      });
    });
  }

  entryClick(product) {
    console.log(product);
  }

  pageClick(page) {
    this.setState({ page }, () => {
      this.instantSearch(this.state.query);
    });
  }

  categoryChange(checkedBoxes) {
    this.setState({ categoryFilter: checkedBoxes }, () => {
      this.instantSearch(this.state.query);
    });
  }

  brandChange(checkedBoxes) {
    this.setState({ brandFilter: checkedBoxes }, () => {
      this.instantSearch(this.state.query);
    });
  }

  render() {
    let content;
    let filters;
    if (this.state.results.nbHits > 0 && this.state.query !== '') {
      content = (
        <ProductList
          products={this.state.results}
          entryClick={this.entryClick}
          pageClick={this.pageClick}
        />
      );
      filters = (
        <div className="filter-container">
          <FilterCategory
            categories={this.state.results.facets.categories}
            categoryChange={this.categoryChange}
            currentFilters={this.state.categoryFilter}
          />
          <FilterBrand
            brands={this.state.results.facets.brand}
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
