import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';

require('../styles/SearchBox.scss');

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
    this.setState({ query: e.target.value }, this.props.instantSearch(e.target.value, null, true));
  }

  render() {
    return (
      <div className="form-group has-feedback" id="primary-search">
        <input
          id="search-input"
          className="form-control"
          type="text"
          onChange={this.handleInputChange}
          placeholder="Search for products..."
        />
        <i className="glyphicon glyphicon-search form-control-feedback" />
      </div>
    );
  }
}

SearchBox.propTypes = {
  instantSearch: PropTypes.func.isRequired,
};

export default SearchBox;
