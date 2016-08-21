import React, { PropTypes } from 'react';
import bindAll from 'lodash.bindall';
import style from '../styles/SearchBox.scss';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    bindAll(this,
      'handleInputChange'
    );
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value }, this.props.instantSearch(e.target.value));
  }

  render() {
    return (
      <form>
        <div className="input-group input-group-sm">
          <span className="input-group-addon" id="primary-search">Search</span>
          <input
            id="search-input"
            className="form-control"
            type="text"
            onChange={this.handleInputChange}
            placeholder="Search for products..."
          />
        </div>
      </form>
    );
  }
}

SearchBox.propTypes = {
  instantSearch: PropTypes.func.isRequired,
};

export default SearchBox;
