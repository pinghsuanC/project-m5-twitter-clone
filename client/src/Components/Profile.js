import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import "../GlobalStyles.css";
import { COLORS, ERROR_PATH } from "../Util/constants";
import NameHandle from "../Util/NameHandle";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import ProfileHeader from "./ProfileComponents/ProfileHeader";
import ProfileTab from "./ProfileComponents/ProfileTab";
import Loading from "./Loading";

const Profile = () => {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  //const currentUserHandle = currentUser.profile.handle;
  const [refresh, setRefresh] = useState(false);
  const { profileId } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [curTab, setCurTab] = useState("tweet");
  const history = useHistory();
  //console.log(currentUser);
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((info) => info.json())
      .then((info) => setProfileInfo(info.profile))
      .catch((err) => {
        history.push(ERROR_PATH);
      });

    return () => setRefresh(false);
  }, [refresh]);

  //console.log(profileInfo);
  /*const {
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
  } = profileInfo;*/

  //"joined: "2016-10-12T12:00""
  let m = null;
  if (profileInfo) {
    m = moment(profileInfo.joined, "YYYY-MM-DDTHH:mm");
  }

  return profileInfo ? (
    <ProfileWrapper>
      <ProfileBanner src={profileInfo.bannerSrc} />
      <ProfileHeader profileInfo={profileInfo} />
      <ProfileTabSelectWrapper>
        <ProfileSelectSingle
          onClick={() => {
            setCurTab("tweet");
            setRefresh(true);
          }}
          curTab={curTab}
          tab="tweet"
        >
          Tweets
        </ProfileSelectSingle>
        <ProfileSelectSingle
          onClick={() => {
            setCurTab("media");
            setRefresh(true);
          }}
          curTab={curTab}
          tab="media"
        >
          Media
        </ProfileSelectSingle>
        <ProfileSelectSingle
          onClick={() => {
            setCurTab("likes");
            setRefresh(true);
          }}
          curTab={curTab}
          tab="likes"
        >
          Likes
        </ProfileSelectSingle>
      </ProfileTabSelectWrapper>
      <ProfileTweetsWrapper>
        {curTab && <ProfileTab type={curTab} profileHandle={profileId} />}
      </ProfileTweetsWrapper>
    </ProfileWrapper>
  ) : (
    <Loading />
  );
};

export default Profile;
const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: scroll; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
const ProfileBanner = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  overflow: hidden;
  position: absolute;
`;
const ProfileTabSelectWrapper = styled.div`
  height: 40px;
  width: 100%;
  //border: 3px solid red;
  position: absolute;

  background: white;
  top: 360px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ProfileSelectSingle = styled.button`
  width: 100%;
  height: 40px;
  background: white;

  //border: 1px solid blue;
  outline: none;
  border: none;
  border-bottom: ${(props) => {
    if (props.curTab === props.tab) {
      return `3px solid ${COLORS.primary}`;
    } else {
      return `3px solid white`;
    }
  }};

  :hover {
    background: ${COLORS.faint_gray};
    border-bottom: ${(props) => {
      if (props.curTab === props.tab) {
        return `3px solid ${COLORS.primary}`;
      } else {
        return `${COLORS.faint_gray}`;
      }
    }};
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;
const ProfileTweetsWrapper = styled.div`
  width: 120%;
  position: absolute;
  top: 400px;
  padding-bottom: 50px;
`;

const ProfileTabWrapper = styled.div``;

const ProfileMediaWrapper = styled.div``;
const ProfileLikesWrapper = styled.div``;
