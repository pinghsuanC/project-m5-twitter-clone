import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import "../GlobalStyles.css";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import Tweet from "./Tweet";
import TweetInput from "./InputComponents/TweetInput";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import { ERROR_PATH } from "../Util/constants";

const HomeFeed = () => {
  const history = useHistory();
  const { currentUser, status } = useContext(CurrentUserContext);
  const [homeTweets, setHomeTweets] = useState(null);
  const [homeTweetsId, setHomeTweetsId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let id_to = setTimeout(() => {
      fetch("/api/me/home-feed")
        .then((info) => info.json())
        .then((info) => {
          //console.log(info);
          setHomeTweets(info.tweetsById);
          setHomeTweetsId(info.tweetIds);
        })
        .catch((err) => {
          history.push(ERROR_PATH);
        });
    }, 1500);
    return () => {
      clearTimeout(id_to);
      setRefresh(false);
    };
  }, [refresh]);

  //console.log(status);
  return (
    <HomeFeed_Wrapper>
      {status === "idle" ? (
        <HomeFeed_input>
          <TweetInput refresh={setRefresh} />
        </HomeFeed_input>
      ) : (
        <HomeFeed_input>
          <Loading />
        </HomeFeed_input>
      )}
      <HomeFeed_tweets>
        {homeTweets === null ? (
          <>
            <Loading />
          </>
        ) : (
          Object.values(homeTweets).map((ele) => {
            return <Tweet key={`tweet-${ele.id}`} input={ele} type="small" />;
          })
        )}
      </HomeFeed_tweets>
    </HomeFeed_Wrapper>
  );
};

export default HomeFeed;
const HomeFeed_Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 201px;
  padding-bottom: 200px;
  // setup scroll and hide the scroll bar!
  overflow-y: scroll;
  -ms-overflow-style: scroll; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
const HomeFeed_input = styled.div`
  width: 55%;
  left: 30.5%;
  position: fixed;
  top: 5px;
  display: flex;
`;
const HomeFeed_tweets = styled.div``;
