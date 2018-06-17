import React, { Component } from "react";
import "./DataFetcher.css";

class DataFetcher extends Component {
  state = {};
  componentDidMount = () => {
    console.log("Data fetcher : component did mount");
  };

  getDataFromAPI = () => {
    console.log("func called");
    // console.log(encodeURIComponent(req.params.searchVal)this.props.searchData.searchVal);
    fetch("/tweets/" + encodeURIComponent(this.props.searchData.searchVal))
      .then(res => {
        return res.json();
      })
      .then(data => {
        var TweetDetails = {};
        var rawTweets = data.statuses;
        var TweetDetailsArray = [];

        TweetDetailsArray = [];
        if (rawTweets.length > 0) {
          for (let i = 0; i < rawTweets.length; i++) {
            TweetDetails[i] = {
              tweet_id: rawTweets[i].id_str,
              text: rawTweets[i].text,
              created_at: rawTweets[i].created_at,
              screen_name: rawTweets[i].user.screen_name,
              user_location: rawTweets[i].user.location,
              retweet_count: rawTweets[i].retweet_count,
              favorite_count: rawTweets[i].favorite_count,
              in_reply_to_status_id: rawTweets[i].in_reply_to_status_id_str,
              num_comments: 0
            };
            TweetDetailsArray.push(TweetDetails[i]);
          }

          //Update Num Comments Per Tweet
          for (let i = 0; i < TweetDetailsArray.length; i++) {
            fetch(
              "/comments/" +
                TweetDetailsArray[i].screen_name +
                "/" +
                TweetDetailsArray[i].tweet_id
            )
              .then(data => {
                return data.json();
              })
              .then(data => {
                let count = 0;
                var resultData = data.statuses;
                //if (resultData !== null) {
                for (let j = 0; j < resultData.length; j++) {
                  if (
                    resultData[j]["in_reply_to_status_id_str"] !== null &&
                    resultData[j]["in_reply_to_status_id_str"] ===
                      TweetDetailsArray[i].tweet_id
                  ) {
                    count++;
                  }
                }
                //}
                TweetDetailsArray[i]["num_comments"] = count;
              });
          }
        } else {
          console.log("No tweets fetched");
        }

        return this.props.rawTweetsData(TweetDetailsArray);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {!this.props.searchData.hasFetchedData &&
          this.props.searchData.searchVal !== "" &&
          this.getDataFromAPI()}
      </div>
    );
  }
}

export default DataFetcher;
