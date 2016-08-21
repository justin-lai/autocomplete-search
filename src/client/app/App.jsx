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
      results: [],
    };
    bindAll(this,
      'instantSearch',
      'handleClickEntry'
    );
  }

  componentDidMount() {
  }

  instantSearch(query) {
    index.search(query, (err, content) => {
      console.log(content);
      this.setState({
        results: content.hits,
      });
    });
  }

  handleClickEntry(product) {
    console.log(product);
  }

  render() {
    return (
      <div className="container">
        <h1>ALGOLIA SEARCH</h1>
        <SearchBox instantSearch={this.instantSearch} />
        <ProductList products={this.state.results} handleClickEntry={this.handleClickEntry} />
      </div>
    );
  }
}

export default App;
