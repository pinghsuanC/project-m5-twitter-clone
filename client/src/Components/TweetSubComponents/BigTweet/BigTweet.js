import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import "../../../GlobalStyles.css";
import TweetActions from "../TweetActions/TweetActions";
import TweetContentBig from "./TweetContentBig.js";
import { ERROR_PATH, LOGOS } from "../../../Util/constants";
const icon_size = "20px";
const BigTweet = ({ tweetId }) => {
  const history = useHistory();
  //console.log(tweetId);
  // need to re-fetch again since the user may send the link with the id to other people
  // If reuse the data from previous redirect, you can't access with single link
  const [tweetInfo, setTweetInfo] = useState(null);
  // preparing for the going back
  const back_route = history.location.state.from;
  //const { tweetId } = useParams(); // get the id
  // fetch tweeter details form databse
  useEffect(() => {
    if (tweetId) {
      fetch(`/api/tweet/${tweetId}`)
        .then((info) => info.json())
        .then((info) => {
          //console.log(info);
          setTweetInfo(info.tweet);
        })
        .catch((err) => {
          history.push(ERROR_PATH);
        });
    }
  }, []);
  //const id = props.match.params.tweetId;

  return (
    tweetInfo != null && (
      <>
        <BigTweetWrapper>
          <BackWrapper
            onClick={() => {
              history.push(back_route);
            }}
          >
            <BackButton>
              <LOGOS.IconBack size={icon_size} />
            </BackButton>
            <BackMsgDiv>Beok</BackMsgDiv>
          </BackWrapper>
          <BigTweetInnerWrapper>
            <TweetContentBig input={tweetInfo} />
            <TweetActions input={tweetInfo} />
          </BigTweetInnerWrapper>
        </BigTweetWrapper>
      </>
    )
  );
};

export default BigTweet;

const BackWrapper = styled.div`
  width: 80%;
  height: ${icon_size};
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${icon_size};
  line-height: ${icon_size};
  border-bottom: 1px solid gray;
  :hover {
    cursor: pointer;
  }
`;
const BackButton = styled.button`
  width: 40px;
  height: ${icon_size};
  background: none;
  border: none;
  outline: none;

  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;
const BackMsgDiv = styled.div``;
const BigTweetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BigTweetInnerWrapper = styled.div`
  width: 90%;
  // setup scroll and hide the scroll bar!
  overflow-y: scroll;
  -ms-overflow-style: scroll; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  padding-bottom: 50px;
`;
