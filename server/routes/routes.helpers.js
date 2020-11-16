const data = require("../data");

// HARDCODED CURRENT USER.
const CURRENT_USER_HANDLE = "treasurymog";

const MAX_DELAY = 2000;
const FAILURE_ODDS = 0.005; //0.05;

// Our server is very lean and quick, given that it doens't actually connect
// to a database or deal with any sort of scale!
// We want to provide a more realistic experience, so we'll do 2 things for
// all responses:
// - Add an arbitrary delay of 0-2 seconds
// - Add a 5% chance of a 500 error
const simulateProblems = (res, data) => {
  const delay = Math.random() * MAX_DELAY;

  setTimeout(() => {
    const shouldError = Math.random() <= FAILURE_ODDS;

    if (shouldError) {
      res.sendStatus(500);
      return;
    }

    res.json(data);
  }, delay);
};

const getUser = (handle) => {
  return data.users[handle.toLowerCase()];
};

const getUserProfile = (handle) => {
  const user = getUser(handle);

  if (!user) {
    throw new Error("user-not-found");
  }

  const currentUser = data.users[CURRENT_USER_HANDLE];

  const mutableUser = { ...user };

  delete mutableUser.followingIds;
  delete mutableUser.followerIds;
  delete mutableUser.likeIds;

  mutableUser.numFollowing = user.followingIds.length;
  mutableUser.numFollowers = user.followerIds.length;
  mutableUser.numLikes = user.likeIds.length;
  mutableUser.isFollowingYou = user.followingIds.includes(currentUser.handle);
  mutableUser.isBeingFollowedByYou = currentUser.followingIds.includes(
    user.handle
  );

  return mutableUser;
};

const resolveRetweet = (tweet) => {
  if (!tweet.retweetOf) {
    return tweet;
  }

  const originalTweet = data.tweets[tweet.retweetOf];
  return {
    ...originalTweet,
    id: tweet.id,

    retweetOf: originalTweet.id,
    retweetFrom: getUserProfile(tweet.authorHandle),
    sortedTimestamp: tweet.timestamp,
    likedBy: tweet.likedBy,
    // modified: save the original id and the retweetFrom in the retweeted by
    // then what's displayed on screen will be the total retweet amount
    // which fits the pattern of the real twitter

    //retweetedBy: tweet.retweetedBy,
  };
};

const denormalizeTweet = (tweet) => {
  const tweetCopy = { ...tweet };

  delete tweetCopy.authorHandle;

  tweetCopy.author = getUserProfile(tweet.authorHandle);

  delete tweetCopy.likedBy;
  delete tweetCopy.retweetedBy;

  tweetCopy.isLiked = tweet.likedBy.includes(CURRENT_USER_HANDLE);
  tweetCopy.isRetweeted = tweet.retweetedBy.includes(CURRENT_USER_HANDLE);
  tweetCopy.numLikes = tweet.likedBy.length;
  tweetCopy.numRetweets = tweet.retweetedBy.length;
  //console.log(tweet);
  return tweetCopy;
};

const duplicateTweetReducer = (acc, tweet, index, allTweets) => {
  // If the user is following Profile A and Profile B, and Profile B
  // retweets the tweet of Profile A, we only want to show whichever
  // copy is newest, not both.

  for (let i = 0; i < index; i++) {
    // this is assuming that which ever comes first is the newest
    // but it's not the case...
    let iteratedTweet = allTweets[i];

    if (
      iteratedTweet.id === tweet.retweetOf ||
      tweet.id === iteratedTweet.retweetOf || // added logic: to remove extra retweet
      (tweet.retweetOf && tweet.retweetOf === iteratedTweet.retweetOf)
    ) {
      return acc;
    }
  }

  return [...acc, tweet];
};

const getTweetsFromUser = (userId) => {
  let arr = Object.values(data.tweets);
  // sort the array by date
  arr.sort((a, b) => {
    return a.sortedTimestamp > b.sortedTimestamp ? -1 : 1;
  });
  return arr
    .filter(
      (tweet) => tweet.authorHandle.toLowerCase() === userId.toLowerCase()
    )
    .map(resolveRetweet)
    .map(denormalizeTweet);
};

const getTweetsForUser = (userId) => {
  const user = data.users[userId];
  //console.log(user);
  //console.log(Object.values(data.tweets));
  let arr = Object.values(data.tweets);
  // sort the array by date
  arr.sort((a, b) => {
    return a.sortedTimestamp > b.sortedTimestamp ? -1 : 1;
  });
  return arr
    .filter(
      (tweet) =>
        user.followingIds.includes(tweet.authorHandle.toLowerCase()) ||
        tweet.authorHandle.toLowerCase() === CURRENT_USER_HANDLE.toLowerCase()
    )
    .reduce(duplicateTweetReducer, [])
    .map(resolveRetweet)
    .map(denormalizeTweet);
};

module.exports = {
  CURRENT_USER_HANDLE,
  simulateProblems,
  getUser,
  getUserProfile,
  resolveRetweet,
  denormalizeTweet,
  getTweetsFromUser,
  getTweetsForUser,
};
