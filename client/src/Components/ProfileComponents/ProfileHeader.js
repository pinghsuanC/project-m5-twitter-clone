import React from "react";
import moment, { min } from "moment";
import styled from "styled-components";
import "../../GlobalStyles.css";
import { Ava_large, COLORS, LOGOS } from "../../Util/constants";
import NameHandle from "../../Util/NameHandle";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

const ProfileHeader = ({ profileInfo }) => {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  //const currentUserHandle = currentUser.profile.handle;

  //console.log(profileInfo);
  const {
    avatarSrc,
    bannerSrc,
    bio,
    displayName,
    handle,
    isBeingFollowedByYou,
    isFollowingYou,
    joined,
    location,
    numFollowers,
    numFollowing,
    numLikes,
  } = profileInfo;

  //"joined: "2016-10-12T12:00""
  const m = moment(joined, "YYYY-MM-DDTHH:mm");

  return (
    profileInfo &&
    currentUser && (
      <ProfileHeaderWrapper>
        <ProfileHeaderInner>
          <Ava_large src={avatarSrc} />
          {currentUser.profile.handle !== profileInfo.handle && (
            <ProfileFollowingBtn>
              {isBeingFollowedByYou
                ? "Following"
                : "Click to start Meowloship!"}
            </ProfileFollowingBtn>
          )}
        </ProfileHeaderInner>
        <div>
          <ProfileDisplayName>{displayName}</ProfileDisplayName>
          <ProfileFollowingYouInfo>
            <NameHandle nameHandle={handle} />
            &nbsp;&nbsp;&nbsp;
            {currentUser.profile.handle !== profileInfo.handle &&
              isFollowingYou && (
                <ProfileFollowingYou>{"Follows you"}</ProfileFollowingYou>
              )}
          </ProfileFollowingYouInfo>
        </div>
        <ProfileBio>{bio}</ProfileBio>
        <ProfileGrayInfo>
          <LOGOS.IconLocate />
          &nbsp;
          {location}&nbsp;&nbsp;&nbsp;
          <LOGOS.IconDate />
          &nbsp;
          {`Joined ${m.format("MMMM")} ${m.format("YYYY")}`}
        </ProfileGrayInfo>
        <ProfileGrayInfo>
          <BlackInfo>{numFollowing}</BlackInfo>&nbsp;Following&nbsp;&nbsp;&nbsp;
          <BlackInfo>{numFollowers}</BlackInfo>&nbsp;Followers
        </ProfileGrayInfo>
      </ProfileHeaderWrapper>
    )
  );
};

const ProfileHeaderWrapper = styled.div`
  //border: 2px solid black;
  border-bottom: 1px solid ${COLORS.faint_gray};
  width: 90%;
  height: 290px;
  position: absolute;
  //border: 2px solid red;
  top: 70px;
  margin-left: 25px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ProfileHeaderInner = styled.div`
  //border: 2px solid blue;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;
const ProfileDisplayName = styled.div`
  font-size: 1.1em;
  font-weight: 700;
  margin-bottom: 5px;
`;
const ProfileBio = styled.div`
  font-weight: 600;
`;
const ProfileGrayInfo = styled.div`
  display: flex;
  min-height: 15px;
  align-items: center;
  color: gray;
`;
const BlackInfo = styled.span`
  color: black;
  font-weight: 700;
`;
const ProfileFollowingYouInfo = styled.div`
  //border: 1px solid gray;
  display: flex;
  align-items: center;
`;
const ProfileFollowingYou = styled.div`
  padding: 3px;
  background: ${COLORS.faint_gray};
  color: gray;
  font-size: 0.8em;
  line-height: 15px;
  border-radius: 10px;
`;
const ProfileFollowingInfo = styled.div``;
const ProfileFollowingBtn = styled.button`
  width: auto;
  min-height: 40px;
  height: auto;
  border-radius: 30px;
  background: ${COLORS.primary};
  color: white;
  font-size: 1.1em;
  border: none;
  outline: none;
  position: absolute;
  top: 85px;
  right: 0px;
  :focus {
    outline: none;
  }
`;
export default ProfileHeader;
