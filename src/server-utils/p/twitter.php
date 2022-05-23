<?php
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "1072286355785420801-RrwHJW60enOLckjqS7JjZNbGl5WP1o",
    'oauth_access_token_secret' => "PFYEfAWgX89uIjCHbLyAIbIrbG6Zk3VrQNqjYaOajh4tn",
    'consumer_key' => "RP8HTVKjh1XP0vZbn2YeLuq6U",
    'consumer_secret' => "6vsujYN1daEsyOgBF15m3ShsEaEzaC4nJqBW4sM9mYchCoD0Lk"
);

$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";

$requestMethod = "GET";

$getfield = '?screen_name=josh_hoegen&count=10&tweet_mode=extended&exclude_replies=true';

$twitter = new TwitterAPIExchange($settings);

// echo $url;

echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
