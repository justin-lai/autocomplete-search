import React from 'react';
import bindAll from 'lodash.bindall';
import s from '../styles/App.scss';
import index from '../config/config.js';
import SearchBox from './SearchBox.jsx';
import ProductList from './ProductList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      page: 1,
    };
    bindAll(this,
      'instantSearch',
      'entryClick',
      'pageClick'
    );
  }

  componentDidMount() {
  }

  instantSearch(query) {
    const options = {
      page: this.state.page - 1,
    };
    console.log('SEARCHING FOR', options.page);

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
    console.log('CLICKED', page);
    this.setState({ page }, () => {
      this.instantSearch(this.state.query);
    });
  }

  render() {
    let content;
    if (this.state.results.nbHits > 0 && this.state.query !== '') {
      content = (
        <ProductList
          products={this.state.results}
          entryClick={this.entryClick}
          pageClick={this.pageClick}
        />
      );
    } else if (this.state.query !== '') {
      content = <p>No results found</p>;
    }

    return (
      <div className="container">
        <h1>ALGOLIA SEARCH</h1>
        <SearchBox instantSearch={this.instantSearch} />
        { content }
      </div>
    );
  }
}

export default App;
