import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../GlobalStyles.css";
import { Ava_large, COLORS, LOGOS } from "../../Util/constants";
import NameHandle from "../../Util/NameHandle";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import ProfileTabTweet from "./ProfileTabComponents/ProfileTabTweet";

const ProfileTab = ({ type, profileHandle }) => {
  const [TweetsInfo, setTweetInfo] = useState(null);
  //const [MediaInfo, setMediaInfo] = useState(null);
  //const [LikesInfo, setLikeInfo] = useState(null);

  //console.log(type);
  useEffect(() => {
    switch (type) {
      case "tweet":
        fetch(`/api/${profileHandle}/feed`)
          .then((data) => data.json())
          .then((data) => {
            setTweetInfo(Object.values(data.tweetsById));
            //console.log(data);
          });
        return;
      default:
        console.log("unknown type");
        return;
    }
  }, []);

  return (
    TweetsInfo && (
      <ProfileTabWrapper>
        <ProfileTweetWrapper>
          <ProfileTabTweet input={TweetsInfo} type={type} />
        </ProfileTweetWrapper>
      </ProfileTabWrapper>
    )
  );
};

const ProfileTabWrapper = styled.div`
  width: 100%;
`;

const ProfileTweetWrapper = styled.div`
  position: relative;
`;

export default ProfileTab;
