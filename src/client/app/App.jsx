/* global autocomplete, Hogan */
/* eslint no-underscore-dangle: ["error", { "allow": ["_highlightResult"] }] */

import React from 'react';
import { bindAll, debounce } from 'lodash';
import { INDEX_RELEVANCE } from '../config/config.js';
import SearchBox from './SearchBox.jsx';
import ProductList from './ProductList.jsx';
import FilterCategory from './FilterCategory.jsx';
import FilterBrand from './FilterBrand.jsx';
import FilterType from './FilterType.jsx';
import PriceSlider from './PriceSlider.jsx';


require('../styles/App.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: INDEX_RELEVANCE,
      query: '',
      results: [],
      page: 1,
      categoryFilter: [],
      brandFilter: [],
      typeFilter: '',
      priceFilter: [0, 5000],
      facets: {},
    };

    this.onPageClick = this.onFilterChange('page');
    this.onSortByChange = this.onFilterChange('index');
    this.onCategoryChange = this.onFilterChange('categoryFilter');
    this.onBrandChange = this.onFilterChange('brandFilter');

    bindAll(this,
      'instantSearch',
      'onPageClick',
      'onCategoryChange',
      'onBrandChange',
      'onTypeToggle',
      'onPriceChange',
      'clearFilters'
    );
  }

  componentDidMount() {
    this.didMount = true;

    autocomplete('#search-input', { hint: false }, [
      {
        source: autocomplete.sources.hits(this.state.index, { hitsPerPage: 5 }),
        displayKey: 'name',
        templates: {
          suggestion: suggestion => suggestion._highlightResult.name.value,
        },
      },
    ]).on('autocomplete:selected', (event, suggestion) => {
      // remove this and manually change state!!!!!
      this.instantSearch(suggestion.name, null, true);
    });

    this.instantSearch('');
  }

  onFilterChange(filterKey) {
    return (newFilter) => {
      this.setState({ [filterKey]: newFilter }, () => {
        this.instantSearch(this.state.query, (err, content) => {
          this.setState({
            results: content,
          });
          if (content.nbHits === 0) this.clearFilters();
        });
      });
    };
  }

  onTypeToggle(type) {
    const typeFilter = this.state.typeFilter ? '' : type;

    this.setState({
      typeFilter,
      page: 1,
      categoryFilter: [],
      brandFilter: [],
      priceFilter: [0, 5000],
    }, () => {
      this.instantSearch(this.state.query, (err, content) => {
        const facets = content.facets;
        facets.price_min = content.facets_stats ? content.facets_stats.price.min : 0;
        facets.price_max = content.facets_stats ? content.facets_stats.price.max : 5000;
        this.setState({
          results: content,
          facets,
        });
        if (content.nbHits === 0) this.clearFilters();
      });
    });
  }

  onPriceChange(priceRange) {
    if (priceRange[0] !== priceRange[1]) {
      this.setState({ priceFilter: priceRange }, () => {
        this.instantSearch(this.state.query, (err, content) => {
          const facets = content.facets;
          facets.price_min = this.state.facets.price_min || 0;
          facets.price_max = this.state.facets.price_max || 5000;
          this.setState({
            results: content,
            facets,
          });
          if (content.nbHits === 0) this.clearFilters();
        });
      });
    }
  }

  buildQueryString() {
    const filtersOR = [];
    const filtersAND = [];
    if (this.state.categoryFilter.length > 0) {
      filtersOR.push(this.state.categoryFilter
                    .map(category => `categories:\"${category.name}\"`)
                    .join(' OR '));
    }
    if (this.state.brandFilter.length > 0) {
      filtersOR.push(this.state.brandFilter
                    .map(brand => `brand:\"${brand.name}\"`)
                    .join(' OR '));
    }
    if (filtersOR.length > 0) filtersAND.push(filtersOR.join(' OR '));

    if (this.state.typeFilter) {
      filtersAND.push(`type:\"${this.state.typeFilter}\"`);
    }
    if (this.state.priceFilter) {
      filtersAND.push(
        `price>=${this.state.priceFilter[0]} AND price<=${this.state.priceFilter[1]}`
      );
    }
    return filtersAND.length > 0 ? filtersAND.join(' AND ') : '';
  }

  instantSearch(query, callback, unfilteredSearch) {
    const options = {
      page: this.state.page - 1,
      facets: '*',
    };

    if (!unfilteredSearch) options.filters = this.buildQueryString();

    if (callback) {
      this.state.index.search(query, options, callback);
    } else {
      // default callback if not provided (occurs when typing through searchbox)
      this.state.index.search(query, options, (err, content) => {
        const facets = content.facets;
        facets.price_min = content.facets_stats ? content.facets_stats.price.min : 0;
        facets.price_max = content.facets_stats ? content.facets_stats.price.max : 5000;
        this.setState({
          query,
          facets,
          results: content,
          page: 1,
          categoryFilter: [],
          brandFilter: [],
          typeFilter: '',
          priceFilter: [0, 5000],
        });
      });
    }
  }

  clearFilters() {
    this.setState({
      page: 1,
      categoryFilter: [],
      brandFilter: [],
      typeFilter: '',
      priceFilter: [0, 5000],
    });
  }

  render() {
    let content;
    let filters;
    if (this.state.results.nbHits > 0) {
      content = (
        <ProductList
          products={this.state.results}
          onPageClick={this.onPageClick}
          onSortByChange={this.onSortByChange}
        />
      );
      filters = (
        <div className="filter-container">
          <FilterCategory
            categories={this.state.facets.categories}
            currentCategories={this.state.categoryFilter}
            onCategoryChange={this.onCategoryChange}
          />
          <FilterBrand
            brands={this.state.facets.brand}
            currentBrand={this.state.brandFilter}
            onBrandChange={this.onBrandChange}
          />
          <PriceSlider
            min={Math.floor(this.state.facets.price_min) || 0}
            max={Math.ceil(this.state.facets.price_max) || 5000}
            currentPriceRange={this.state.priceFilter}
            onPriceChange={debounce((priceRange) => { this.onPriceChange(priceRange); }, 100)}
          />
          <FilterType
            types={this.state.facets.type}
            currentType={this.state.typeFilter}
            onTypeToggle={this.onTypeToggle}
          />
        </div>
      );
    } else if (this.didMount) {
      content = (
        <div id="no-results-message">
          <p>We didn't find any results for the search <em>"{this.state.query}"</em>.</p>
        </div>
      );
    }

    return (
      <section className="container">
        <div className="row">
          <div id="search-fields" className="col-xs-4 col-md-4">
            <h1 id="search-header">a search demo<small>powered by </small></h1>
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
