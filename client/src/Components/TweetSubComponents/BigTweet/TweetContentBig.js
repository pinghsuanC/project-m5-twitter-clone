import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../../GlobalStyles.css";
import moment from "moment";
import { COLORS, Ava } from "../../../Util/constants";
import NameHandle from "../../../Util/NameHandle.js";

const TweetContentBig = ({ input }) => {
  const { timestamp, status, media, author } = input;
  const { handle, displayName, avatarSrc } = author;
  const m = moment(timestamp, "YYYY-MM-DDTHH:mm:ss");

  return (
    <TweetContentWrapper>
      <TweetContentInnerWrapper>
        <HeaderDiv>
          <Ava src={avatarSrc} />
          <NameAreaDiv>
            <NameDisplayDiv>{displayName}</NameDisplayDiv>
            <NameHandle nameHandle={handle} />
          </NameAreaDiv>
        </HeaderDiv>
        <StatusDiv>{status}</StatusDiv>
        {media && media.length > 0 && <MediaImg src={media[0].url} />}
        <TimeStampDiv>{`${m.format("hh:mm A")} ${m.format("MMM")} ${m.format(
          "DD"
        )} ${m.format("YYYY")} Critter web app`}</TimeStampDiv>
      </TweetContentInnerWrapper>
    </TweetContentWrapper>
  );
};

export default TweetContentBig;
const TweetContentWrapper = styled.div`
  margin-top: 10px;
`;
const TweetContentInnerWrapper = styled.div`
  width: 90%;
  //border-top: 1px solid ${COLORS.faint_gray};
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px;
  margin-top: 0px;
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
  margin-left: 0px;
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
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
`;
const NameDisplayDiv = styled.div`
  font-weight: 750;
`;

const MediaImg = styled.img`
  min-width: 400px;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 20px;
  :hover {
    cursor: pointer;
  }
`;
