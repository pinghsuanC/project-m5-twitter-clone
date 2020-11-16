import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../Util/constants";
import "../GlobalStyles.css";
import BigTweet from "./TweetSubComponents/BigTweet/BigTweet";
import SmallTweet from "./TweetSubComponents/SmallTweet/SmallTweet";

// Component to display a single Tweet

const Tweet = ({ input, type }) => {
  const { tweetId } = useParams(); // get the id

  if (type === "small") {
    return (
      <WrapperTweet>
        <SmallTweet input={input} />
      </WrapperTweet>
    );
  } else {
    return (
      <WrapperTweet>
        <BigTweet tweetId={tweetId} />
      </WrapperTweet>
    );
  }
};

export default Tweet;
const WrapperTweet = styled.div`
  border-top: 1px solid ${COLORS.faint_gray};
  min-width: 80%;
  width: 80%;
  margin-left: 10%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
  overflow-y: scroll;
  -ms-overflow-style: scroll; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
