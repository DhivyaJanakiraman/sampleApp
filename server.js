const express = require("express");
const twitter = require("twitter");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var client = new twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

app.get("/test", function(req, res) {
  var param1 = { q: "#dhiv_test_2", count: 100 };
  client.get("search/tweets", param1, function(error, tweets, response) {
    if (!error) {
      res.json(tweets);
    }
  });
});

app.get("/tweets/:searchVal", function(req, res) {
  console.log("searchVal server: ", encodeURIComponent(req.params.searchVal));
  //console.log(encodeURIComponent(req.params.searchVal));
  var params = {
    q: encodeURIComponent(req.params.searchVal),
    count: 100
  };
  client.get(
    "search/tweets",
    { q: "" + encodeURIComponent(req.params.searchVal), count: 100 },
    function(error, tweets, response) {
      if (error) {
        console.log(error);
      }
      res.send(tweets);
    }
  );
});

// rough idea to fetch tweets
app.get("/comments/:screen_name/:tweet_id", function(req, res) {
  var tweet_id = req.params.tweet_id;
  var screen_name = req.params.screen_name;
  //return res.json({ screen_name: screen_name, tweet_id: tweet_id });
  var params = {
    q: "to:" + screen_name,
    since_id: tweet_id,
    count: 20
  };
  client.get("search/tweets", params, function(error, tweets, response) {
    res.send(tweets);
  });
});

const port = process.env.port || 5000;
app.listen(port, () => console.log("Server listening on port " + port));
