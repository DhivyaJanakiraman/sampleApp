import React, { Component } from "react";

class Display extends Component {
  state = {
    arr: []
  };
  componentWillReceiveProps = nextProps => {
    console.log("Compoennt will receive props");
    var filterCategory = nextProps.sort;
    var TweetDetailsArray = nextProps.result;

    //console.log("DisplayTweets: Details:", TweetDetailsArray);
    switch (filterCategory) {
      case "favorite":
        if (TweetDetailsArray.length > 0) {
          TweetDetailsArray.sort(this.dynamicSort("favorite_count"));
        }
        break;
      case "retweet":
        if (TweetDetailsArray.length > 0) {
          TweetDetailsArray.sort(this.dynamicSort("retweet_count"));
        }
        break;
      case "comment":
        if (TweetDetailsArray.length > 0) {
          TweetDetailsArray.sort(this.dynamicSort("num_comments"));
        }
        break;
      default:
        if (TweetDetailsArray.length > 0) {
          TweetDetailsArray.sort(this.dynamicSort("favorite_count"));
        }
    }
    console.log(TweetDetailsArray);
    this.setState({ arr: TweetDetailsArray });
  };
  //Sort function to compare counts
  dynamicSort = property => {
    var sortOrder = -1;
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  displayTweets = () => {
    console.log("Inside DisplayTweets: ", this.state.arr);
  };

  render() {
    var result;
    if (this.state.arr) {
      result = this.state.arr.map(tweet => {
        return (
          <div
            key={tweet.tweet_id}
            style={{
              border: "1px solid black",
              padding: "14px",
              margin: "15px"
            }}
          >
            <p>
              {tweet.screen_name} : {tweet.text}
            </p>
            <p>{tweet.user_location}</p>
          </div>
        );
      });
    } else {
      result = "empty";
    }
    return (
      <div>
        {this.props.hasFetchedData && (
          <div>
            <h4> Tweets </h4>
            {result}
          </div>
        )}
      </div>
    );
  }
}

export default Display;
