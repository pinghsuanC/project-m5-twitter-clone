import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../../GlobalStyles.css";
import {
  COLORS,
  LOGOS,
  tweetAction_iconSize,
  ERROR_PATH,
} from "../../../Util/constants";
import LikeButton from "./TweetActionLikeComponents/LikeButton";
import RetweetButton from "./TweetActionRetweetComponents/RetweetButton";
import { useHistory } from "react-router-dom";

// TweetDetails contains the functionalities at the bottom banner
const TweetActions = ({ input }) => {
  const id = input.id;

  return (
    input && (
      <TweetActionsWrapper>
        <TweetActionInnerWrapper>
          <TweetActionBtn key={`retweet-${id}`}>
            <RetweetButton
              id={id}
              isRetweeted={input.isRetweeted}
              numRetweets={input.numRetweets}
            />
          </TweetActionBtn>
          {/*Like button*/}
          <TweetActionBtn>
            <LikeButton
              size={tweetAction_iconSize}
              isLiked={input.isLiked}
              numLiked={input.numLikes}
              id={id}
            />
          </TweetActionBtn>

          <TweetActionBtn>
            <LOGOS.IconComment size={tweetAction_iconSize} />
          </TweetActionBtn>
          <TweetActionBtn>
            <LOGOS.IconShare size={tweetAction_iconSize} />
          </TweetActionBtn>
        </TweetActionInnerWrapper>
      </TweetActionsWrapper>
    )
  );
};

const TweetActionsWrapper = styled.div`
  width: 80%;
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  //border-top: 1px solid ${COLORS.faint_gray};
  //border-bottom: 1px solid ${COLORS.faint_gray};
  height: auto;
  align-self: center;
`;
const TweetActionInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const TweetActionBtn = styled.button`
  width: 70px;
  display: flex;
  align-items: center;

  border: none;
  background: none;
  :hover {
    cursor: pointer;
    outline: none;
  }
  :focus {
    outline: none;
  }
`;
const TweetActionBtn_rwt = styled.button`
  width: 70px;
  display: flex;
  align-items: center;

  border: none;
  background: none;
  :hover {
    cursor: pointer;
    outline: none;
  }
  :focus {
    outline: none;
  }
`;
export default TweetActions;
