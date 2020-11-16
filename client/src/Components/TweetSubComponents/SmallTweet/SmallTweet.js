import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../../Util/constants";
import "../../../GlobalStyles.css";
import TweetContentSmall from "./TweetContentSmall.js";
import TweetActions from "../TweetActions/TweetActions.js";

// Component to display a single Tweet
const SmallTweet = ({ input }) => {
  const history = useHistory();
  // type: expect to be "big" or "small"
  // need: authorHandle, displayName, time, content, likedBy retweetedBy
  const { id } = input;

  return (
    <WrapperTweet>
      <TweetRedirectDiv>
        <TweetContentSmall input={input} />
      </TweetRedirectDiv>
      <TweetActions // extract for each specific element
        input={input}
      />
    </WrapperTweet>
  );
};

export default SmallTweet;
const WrapperTweet = styled.div`
  border-top: 1px solid ${COLORS.faint_gray};
  min-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //padding-left: 10px;
`;
const TweetRedirectDiv = styled.div`
  width: 100%;
  font-size: 1em;
  outline: none;
  text-decoration: none;
  color: black;
  background: none;
  border: none;
  text-align: left;

  :hover {
    cursor: pointer;
  }
`;
