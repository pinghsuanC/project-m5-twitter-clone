import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "../../../GlobalStyles.css";
import moment from "moment";
import { COLORS, LOGOS, Ava } from "../../../Util/constants";
import NameHandle from "../../../Util/NameHandle.js";

// TweetDetails contains the functionalities at the bottom banner
/*author:{
    "handle",
    "displayName",
    "location",
    "avatarSrc",
  }*/
// component called by feet with input elements (reduce time calling the server)
const TweetContentSmall = ({ input }) => {
  const history = useHistory();
  // type = "big" or "small"
  const { id, timestamp, status, media, author, retweetFrom } = input;
  const { handle, displayName, location, avatarSrc } = author;
  const m = moment(timestamp, "YYYY-MM-DDTHH:mm:ss");
  return (
    <TweetContentWrapper>
      {retweetFrom && (
        <RetweetByDiv>
          <NameHandleDiv>
            <LOGOS.IconRetweet />
            &nbsp;&nbsp;Retweeted by&nbsp;
            <NameHandle nameHandle={retweetFrom.handle} />
          </NameHandleDiv>
        </RetweetByDiv>
      )}
      <TweetContentInnerWrapper
        onClick={() => {
          history.push(`/tweet/${id}`, { from: "/" }); // push to big tweet
        }}
      >
        <Ava src={avatarSrc} />
        <SmallHeaderDiv>
          <NameAreaDiv>
            <NameDisplayDiv>{displayName}</NameDisplayDiv>
            <NameHandleDiv>
              <NameHandle nameHandle={handle} />
            </NameHandleDiv>
            <TimeStampDiv>{`[ ${m.format("YYYY")} ${m.format("MMM")} ${m.format(
              "Do"
            )} ]`}</TimeStampDiv>
          </NameAreaDiv>
          <StatusDiv>{status}</StatusDiv>
          {media && media.length > 0 && <MediaImg src={media[0].url} />}
        </SmallHeaderDiv>
      </TweetContentInnerWrapper>
    </TweetContentWrapper>
  );
};

//

export default TweetContentSmall;

const TweetContentWrapper = styled.div`
  margin-top: 10px;
`;
const TweetContentInnerWrapper = styled.div`
  width: 100%;
  //border-top: 1px solid ${COLORS.faint_gray};
  height: auto;
  display: flex;
  flex-direction: "row";
  align-items: flex-start;
  margin: 0px;
  margin-top: 10px;
`;
const RetweetByDiv = styled.div`
  color: gray;
`;
/*const Ava = styled.img`
  min-width: 60px;
  min-height: 60px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
`;*/
const StatusDiv = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;
const TimeStampDiv = styled.div`
  margin-left: 10px;
  color: gray;
  font-size: 0.8em;
`;
const HeaderDiv = styled.div`
  height: 70px;
  margin-top: 10px;
  margin: 0;
  display: flex;
  flex-direction: "row";
  align-items: center;
`;
const SmallHeaderDiv = styled.div`
  width: 100%;
  height: auto;
  margin-left: 10px;
  margin-right: 10px;
`;
const NameAreaDiv = styled.div`
  height: 100%;
  margin-left: 0px;
  display: flex;
  flex-direction: "row";
  justify-content: flex-start;
  align-items: baseline;
`;
const NameDisplayDiv = styled.div`
  font-weight: 750;
`;
const NameHandleDiv = styled.div`
  margin-left: 5px;
  margin-top: 5px;
  color: gray;
  display: flex;
  align-items: center;
`;
const MediaImg = styled.img`
  min-width: 400px;
  width: 300px;
  height: 300px;
  margin-bottom: 10px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 20px;
  :hover {
    cursor: pointer;
  }
`;
