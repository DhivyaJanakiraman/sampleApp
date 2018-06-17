import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import InputControl from "./containers/InputControl/InputControl";
import DataFetcher from "./containers/DataFetcher/DataFetcher";
import Display from "./components/Display/Display";
import "./App.css";

class App extends Component {
  state = {
    searchVal: "",
    sort: "",
    rows: 15,
    result: [],
    hasFetchedData: false
  };

  handleFormData = data => {
    console.log("coming to form data submit in parent");
    this.setState(
      {
        searchVal: data.searchVal,
        sort: data.sort,
        rows: data.rows,
        hasFetchedData: false
      },
      () => {
        console.log("HandleFormData: ", this.state);
      }
    );
  };

  handleFetchedTweets = data => {
    var newArr = this.state.result;
    newArr = [];
    newArr = data;
    this.setState({ result: newArr, hasFetchedData: true }, () => {
      console.log("HandleFetchedTweets: ", this.state);
    });
  };

  handleFilterTweet = data => {
    this.setState({ sort: data }, () => {
      console.log(this.state);
    });
  };

  handleFilterNumTweets = data => {
    this.setState({ rows: data }, () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <InputControl
          formData={this.handleFormData}
          filterTweet={this.handleFilterTweet}
          filterNumTweets={this.handleFilterNumTweets}
        />
        <DataFetcher
          searchData={this.state}
          searchResult={this.updateResult}
          rawTweetsData={this.handleFetchedTweets}
        />
        <Display
          sort={this.state.sort}
          rows={this.state.rows}
          result={this.state.result}
          hasFetchedData={this.state.hasFetchedData}
        />
      </div>
    );
  }
}

export default App;
