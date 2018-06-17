import React, { Component } from "react";

class InputControl extends Component {
  handleSubmit = e => {
    e.preventDefault();
    var searchInput = {
      searchVal: this.refs.searchVal.value,
      rows: this.refs.rows.value,
      sort: this.refs.sort.value
    };
    this.props.formData(searchInput);
  };

  handleSort = e => {
    this.props.filterTweet(e.target.value);
  };

  handleRows = e => {
    this.props.filterNumTweets(e.target.value);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="searchVal"
                id="search"
                ref="searchVal"
                placeholder="Search..."
              />
            </div>
            <button type="submit"> Search </button>
            <div className="form-2">
              <div className="col-md-6 justify-content-around">
                <select
                  name="sort"
                  id="sort"
                  onChange={this.handleSort}
                  ref="sort"
                >
                  Sort
                  <option value="favorite">Favorite</option>
                  <option value="comment">Comment</option>
                  <option value="retweet">Re-Tweet</option>
                </select>
                <select
                  name="rows"
                  id="rows"
                  ref="rows"
                  onChange={this.handleRows}
                >
                  Rows
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default InputControl;
