import React, { Component } from 'react';

class Sort extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: 'name', 
        value: 1
      }
    }
  }

  onClick = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    });
    this.props.onSort(this.state.sort);
  }

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary"
            type="button"
            id="dropdownMenu1"
            // data-toggle="dropdown"
            // aria-haspopup="true"
            // aria-expanded="true"
            onClick={() => this.onClick('name', 1)}
          >
            Sắp xếp 
          </button>
        </div>
      </div>
    );
  }
}

export default Sort;